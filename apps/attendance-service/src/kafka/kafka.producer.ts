import { Kafka, Producer } from 'kafkajs';

let producer: Producer;

export async function initKafkaProducer() {
  const kafka = new Kafka({
    clientId: 'attendance-service',
    brokers: (process.env.KAFKA_BROKERS ?? 'kafka:29092').split(','),
    retry: {
      retries: 10,
    },
  });

  producer = kafka.producer();

  try {
    await producer.connect();
    console.log('[Kafka] Producer connected');
  } catch (err) {
    console.log('[Kafka] still unavailable, attendance will keep running');
  }
}

export async function publishChildEvent(event: any) {
  if (!producer) {
    console.log('[Kafka] producer not ready, event skipped');
    return;
  }

  const topic = process.env.KAFKA_TOPIC ?? 'child-events';
  await producer.send({
    topic,
    messages: [{ value: JSON.stringify(event) }],
  });
}
