import amqp from 'amqplib';

let channel: amqp.Channel;

export async function initRabbitProducer() {
  const connection = await amqp.connect('amqp://rabbitmq');
  channel = await connection.createChannel();
  await channel.assertQueue('notifications', { durable: true });
  console.log('[RabbitMQ] Producer connected');
}

export function enqueueNotification(payload: any) {
  channel.sendToQueue(
    'notifications',
    Buffer.from(JSON.stringify(payload)),
    { persistent: true },
  );
}
