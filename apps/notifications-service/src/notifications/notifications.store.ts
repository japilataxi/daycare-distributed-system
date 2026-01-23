import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';

export type NotificationItem = {
  id: string;
  message: string;
  source?: string;
  childId?: string;
  createdAt: string;
  raw: unknown;
};

@Injectable()
export class NotificationsStore {
  private readonly items: NotificationItem[] = [];
  private readonly max = 200; // evita crecer infinito

  add(raw: any) {
    const item: NotificationItem = {
      id: randomUUID(),
      message: raw?.message ?? 'Notification received',
      source: raw?.source,
      childId: raw?.childId,
      createdAt: new Date().toISOString(),
      raw,
    };

    this.items.unshift(item);
    if (this.items.length > this.max) this.items.pop();
    return item;
  }

  findAll() {
    return this.items;
  }

  clear() {
    this.items.splice(0, this.items.length);
  }
}
