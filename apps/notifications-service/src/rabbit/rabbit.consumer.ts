import amqp from 'amqplib';

export async function startRabbitConsumer() {
  const connection = await amqp.connect('amqp://rabbitmq');
  const channel = await connection.createChannel();

  const queue = 'notifications';

  await channel.assertQueue(queue, { durable: true });

  console.log('[RabbitMQ] Waiting for messages in queue:', queue);

  channel.consume(queue, (msg) => {
    if (!msg) return;

    const payload = JSON.parse(msg.content.toString());
    console.log('[Notification] Sending notification:', payload);

    // Here you could call email / whatsapp / webhook
    channel.ack(msg);
  });
}
