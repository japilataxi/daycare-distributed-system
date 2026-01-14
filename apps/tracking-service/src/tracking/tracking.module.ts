import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RedisModule } from '../redis/redis.module';
import { ChildStatus } from './child-status.entity';
import { TrackingController } from './tracking.controller';
import { TrackingService } from './tracking.service';

@Module({
  imports: [TypeOrmModule.forFeature([ChildStatus]), RedisModule],
  providers: [TrackingService],
  controllers: [TrackingController],
})
export class TrackingModule {}
