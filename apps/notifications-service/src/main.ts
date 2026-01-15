import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { startRabbitConsumer } from './rabbit/rabbit.consumer';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ✅ Arranca el consumer RabbitMQ
  await startRabbitConsumer();

  await app.listen(3004);
}
bootstrap();
