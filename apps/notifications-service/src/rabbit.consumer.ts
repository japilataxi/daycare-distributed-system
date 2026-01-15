import amqp, { Connection, Channel } from 'amqplib';

const RABBIT_URL = process.env.RABBIT_URL ?? 'amqp://rabbitmq:5672';
const QUEUE = process.env.RABBIT_QUEUE ?? 'notifications';

async function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

async function connectWithRetry(maxRetries = 20): Promise<{ connection: Connection; channel: Channel }> {
  let lastErr: unknown;

  for (let i = 1; i <= maxRetries; i++) {
    try {
      const connection = await amqp.connect(RABBIT_URL);
      connection.on('error', (err) => {
        console.error('[Notifications] RabbitMQ connection error:', err);
      });
      connection.on('close', () => {
        console.warn('[Notifications] RabbitMQ connection closed');
      });

      const channel = await connection.createChannel();
      return { connection, channel };
    } catch (err) {
      lastErr = err;
      const wait = Math.min(2000 * i, 15000); // backoff hasta 15s
      console.warn(`[Notifications] RabbitMQ not ready (try ${i}/${maxRetries}). Retrying in ${wait}ms...`);
      await sleep(wait);
    }
  }

  throw lastErr;
}

export async function startRabbitConsumer() {
  const { channel } = await connectWithRetry(25);

  await channel.assertQueue(QUEUE, { durable: true });
  console.log(`[Notifications] Waiting for messages on queue "${QUEUE}"...`);

  channel.consume(QUEUE, (msg) => {
    if (!msg) return;

    try {
      const payload = JSON.parse(msg.content.toString());
      console.log('[Notifications] Sending notification:', payload);
      channel.ack(msg);
    } catch (e) {
      console.error('[Notifications] Bad message, sending to reject:', e);
      // si quieres requeue: true (pero ojo con loops)
      channel.nack(msg, false, false);
    }
  });
}
