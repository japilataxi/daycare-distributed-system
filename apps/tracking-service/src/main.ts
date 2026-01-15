import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { startKafkaConsumer } from './kafka/kafka.consumer';
import { TrackingService } from './tracking/tracking.service';
import { initRabbitProducer } from './rabbit/rabbit.producer';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({ origin: true, credentials: true });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Tracking Service')
    .setDescription('Read model for child current status with Redis cache')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  // ✅ Inicializa Rabbit Producer
  await initRabbitProducer();

  // ✅ Arranca Kafka Consumer
  const trackingService = app.get(TrackingService);
  startKafkaConsumer(trackingService);

  await app.listen(process.env.PORT || 3003);
}

bootstrap();
