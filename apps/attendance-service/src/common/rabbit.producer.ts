import * as amqp from 'amqplib';

const RABBIT_URL = process.env.RABBIT_URL ?? 'amqp://rabbitmq:5672';
const QUEUE = process.env.RABBIT_QUEUE ?? 'notifications';

let channel: amqp.Channel;

export async function initRabbitProducer() {
  const connection = await amqp.connect(RABBIT_URL);
  channel = await connection.createChannel();
  await channel.assertQueue(QUEUE, { durable: true });
}

export function emitNotification(payload: any) {
  if (!channel) return;
  channel.sendToQueue(
    QUEUE,
    Buffer.from(JSON.stringify(payload)),
    { persistent: true },
  );
}
