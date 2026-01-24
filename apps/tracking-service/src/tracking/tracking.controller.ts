import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TrackingService } from './tracking.service';
import { UpdateStatusDto } from './dto/update-status.dto';

@ApiTags('tracking')
@Controller('tracking')
export class TrackingController {
  constructor(private readonly service: TrackingService) {}

  @Get('health')
  health() {
    return { status: 'ok' };
  }

  @Get('children/:childId/status')
  getStatus(@Param('childId') childId: string) {
    return this.service.getStatus(childId);
  }

  @Post('children/:childId/status')
  updateStatus(@Param('childId') childId: string, @Body() dto: UpdateStatusDto) {
    return this.service.updateStatus(childId, dto);
  }
}
