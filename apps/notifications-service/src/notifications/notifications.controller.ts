import { Controller, Delete, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { NotificationsStore } from './notifications.store';

@ApiTags('notifications')
@Controller('notifications')
export class NotificationsController {
  constructor(private readonly store: NotificationsStore) {}

  @Get()
  getAll() {
    return this.store.findAll();
  }

  @Delete()
  clear() {
    this.store.clear();
    return { ok: true };
  }
}
