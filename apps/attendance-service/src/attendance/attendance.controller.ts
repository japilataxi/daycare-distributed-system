import { Body, Controller, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AttendanceService } from './attendance.service';
import { CheckInDto } from './dto/checkin.dto';
import { CheckOutDto } from './dto/checkout.dto';

@ApiTags('attendance')
@Controller('attendance')
export class AttendanceController {
  constructor(private readonly service: AttendanceService) {}

  @Post('check-in')
  checkIn(@Body() dto: CheckInDto) {
    return this.service.checkIn(dto);
  }

  @Post(':id/check-out')
  checkOut(
    @Param('id') id: string,
    @Body() dto: CheckOutDto,
  ) {
    return this.service.checkOut(id, dto);
  }
}
