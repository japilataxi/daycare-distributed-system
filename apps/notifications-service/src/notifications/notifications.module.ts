import { Module } from '@nestjs/common';
import { NotificationsStore } from './notifications.store';
import { NotificationsController } from './notifications.controller';
import { RabbitConsumerService } from './rabbit.consumer.service';

@Module({
  controllers: [NotificationsController],
  providers: [NotificationsStore, RabbitConsumerService],
})
export class NotificationsModule {}
