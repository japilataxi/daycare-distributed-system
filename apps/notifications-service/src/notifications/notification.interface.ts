// notifications/notification.interface.ts
export interface Notification {
  id: string;
  message: string;
  source: string;
  createdAt: Date;
}
