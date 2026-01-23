// notifications/notifications.service.ts
import { Injectable } from '@nestjs/common';
import { Notification } from './notification.interface';
import { randomUUID } from 'crypto';

@Injectable()
export class NotificationsService {
  private notifications: Notification[] = [];

  addNotification(message: string, source: string) {
    const notification: Notification = {
      id: randomUUID(),
      message,
      source,
      createdAt: new Date(),
    };

    this.notifications.push(notification);
    console.log('📩 New notification:', notification);
  }

  findAll(): Notification[] {
    return this.notifications;
  }
}
