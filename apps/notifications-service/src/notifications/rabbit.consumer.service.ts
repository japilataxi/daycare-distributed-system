import { Injectable, OnModuleInit } from '@nestjs/common';
import { startRabbitConsumer } from '../rabbit.consumer';
import { NotificationsStore } from './notifications.store';

@Injectable()
export class RabbitConsumerService implements OnModuleInit {
  constructor(private readonly store: NotificationsStore) {}

  async onModuleInit() {
    await startRabbitConsumer((payload) => {
      this.store.add(payload);
    });
  }
}
