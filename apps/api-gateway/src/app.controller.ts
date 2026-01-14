import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('gateway')
@Controller()
export class AppController {
  @Get('health')
  health() {
    return { status: 'ok' };
  }

  @Get()
  info() {
    return {
      name: 'daycare-distributed-system-api-gateway',
      version: '1.0',
      env: process.env.NODE_ENV ?? 'qa',
    };
  }
}
