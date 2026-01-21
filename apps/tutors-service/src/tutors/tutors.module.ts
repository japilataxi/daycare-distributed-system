import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TutorsController } from './tutors.controller';
import { TutorsService } from './tutors.service';
import { Tutor } from './tutor.entity'; // o ./entities/tutor.entity

@Module({
  imports: [
    TypeOrmModule.forFeature([Tutor]), // 👈 CLAVE
  ],
  controllers: [TutorsController],
  providers: [TutorsService],
})
export class TutorsModule {}
