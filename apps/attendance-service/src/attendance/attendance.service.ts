import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Attendance } from './attendance.entity';
import { CheckInDto } from './dto/checkin.dto';
import { CheckOutDto } from './dto/checkout.dto';

@Injectable()
export class AttendanceService {
  constructor(
    @InjectRepository(Attendance)
    private readonly repo: Repository<Attendance>,
  ) {}

  async checkIn(dto: CheckInDto) {
    const record = this.repo.create({
      childId: dto.childId,
      checkedInBy: dto.checkedInBy,
      checkInAt: new Date(),
    });

    return this.repo.save(record);
  }

  async checkOut(id: string, dto: CheckOutDto) {
    const record = await this.repo.findOne({ where: { id } });
    if (!record) throw new NotFoundException('Attendance record not found');

    record.checkedOutBy = dto.checkedOutBy;
    record.checkOutAt = new Date();

    return this.repo.save(record);
  }
}
