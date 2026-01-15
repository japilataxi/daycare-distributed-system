import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { startRabbitConsumer } from './rabbit.consumer';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  await startRabbitConsumer();

  const config = new DocumentBuilder()
    .setTitle('Notifications Service')
    .setDescription('Notification service for daycare system')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  

  await app.listen(3004);
}
bootstrap();
