import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Attendance } from './attendance.entity';
import { CheckInDto } from './dto/checkin.dto';
import { CheckOutDto } from './dto/checkout.dto';
import { initRabbitProducer, emitNotification } from '../common/rabbit.producer';

@Injectable()
export class AttendanceService implements OnModuleInit {

  constructor(
    @InjectRepository(Attendance)
    private readonly repo: Repository<Attendance>,
  ) {}

  async onModuleInit() {
    await initRabbitProducer();
  }

  async checkIn(dto: CheckInDto) {
    const record = this.repo.create({
      childId: dto.childId,
      checkedInBy: dto.checkedInBy,
      checkInAt: new Date(),
    });

    const saved = await this.repo.save(record);

    emitNotification({
      message: 'Child checked in',
      source: 'attendance-service',
      childId: dto.childId,
    });

    return saved;
  }

  async checkOut(id: string, dto: CheckOutDto) {
    const record = await this.repo.findOne({ where: { id } });
    if (!record) {
      throw new NotFoundException('Attendance record not found');
    }

    record.checkedOutBy = dto.checkedOutBy;
    record.checkOutAt = new Date();

    const saved = await this.repo.save(record);

    emitNotification({
      message: 'Child checked out',
      source: 'attendance-service',
      childId: record.childId,
    });

    return saved;
  }
}
