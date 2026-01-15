import { Kafka } from 'kafkajs';
import { TrackingService } from '../tracking/tracking.service';
import { enqueueNotification } from '../rabbit/rabbit.producer';

export async function startKafkaConsumer(trackingService: TrackingService) {
  const kafka = new Kafka({
    clientId: 'tracking-service',
    brokers: (process.env.KAFKA_BROKERS ?? 'kafka:29092').split(','),
    retry: {
      retries: 10,
    },
  });

  const consumer = kafka.consumer({ groupId: 'tracking-group' });

  try {
    await consumer.connect();
    await consumer.subscribe({
      topic: process.env.KAFKA_TOPIC ?? 'child-events',
    });

    console.log('[Kafka] Consumer started (tracking-group)');
  } catch (err) {
    console.log('[Kafka] still unavailable, service will keep running');
    return;
  }

  await consumer.run({
    eachMessage: async ({ message }) => {
      if (!message.value) return;
      const event = JSON.parse(message.value.toString());

      if (event.type === 'ChildCheckedIn') {
        await trackingService.updateStatus(event.childId, {
          status: 'IN_DAYCARE',
          updatedBy: 'kafka-event',
        });

        // ✅ ENCOLA NOTIFICACIÓN
        enqueueNotification({
          childId: event.childId,
          message: 'Your child has checked in',
          occurredAt: event.occurredAt,
        });

        console.log('[Tracking] Updated IN_DAYCARE for', event.childId);
      }

      if (event.type === 'ChildCheckedOut') {
        await trackingService.updateStatus(event.childId, {
          status: 'CHECKED_OUT',
          updatedBy: 'kafka-event',
        });

        // ✅ ENCOLA NOTIFICACIÓN
        enqueueNotification({
          childId: event.childId,
          message: 'Your child has checked out',
          occurredAt: event.occurredAt,
        });

        console.log('[Tracking] Updated CHECKED_OUT for', event.childId);
      }
    },
  });
}
