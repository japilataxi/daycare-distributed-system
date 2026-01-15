import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Attendance } from './attendance.entity';
import { CheckInDto } from './dto/checkin.dto';
import { CheckOutDto } from './dto/checkout.dto';
import { publishChildEvent } from '../kafka/kafka.producer';

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

    const savedRecord = await this.repo.save(record);

    // ✅ Kafka event
    await publishChildEvent({
      type: 'ChildCheckedIn',
      childId: dto.childId,
      occurredAt: new Date().toISOString(),
    });

    return savedRecord;
  }

  async checkOut(id: string, dto: CheckOutDto) {
    const record = await this.repo.findOne({ where: { id } });
    if (!record) throw new NotFoundException('Attendance record not found');

    record.checkedOutBy = dto.checkedOutBy;
    record.checkOutAt = new Date();

    const savedRecord = await this.repo.save(record);

    // ✅ Kafka event
    await publishChildEvent({
      type: 'ChildCheckedOut',
      childId: record.childId,
      occurredAt: new Date().toISOString(),
    });

    return savedRecord;
  }
}
