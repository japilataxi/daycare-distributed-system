import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RedisService } from '../redis/redis.service';
import { ChildStatus } from './child-status.entity';
import { UpdateStatusDto } from './dto/update-status.dto';

@Injectable()
export class TrackingService {
  private ttlSeconds(): number {
    return Number(process.env.REDIS_TTL_SECONDS || 300);
  }

  private cacheKey(childId: string) {
    return `child:${childId}:status`;
  }

  constructor(
    @InjectRepository(ChildStatus)
    private readonly repo: Repository<ChildStatus>,
    private readonly redis: RedisService,
  ) {}

  async getStatus(childId: string) {
    const key = this.cacheKey(childId);

    const cached = await this.redis.get(key);
    if (cached) {
      return JSON.parse(cached);
    }

    const entity = await this.repo.findOne({ where: { childId } });
    const result = entity ?? { childId, status: 'UNKNOWN', source: 'db-miss' };

    await this.redis.set(key, JSON.stringify(result), this.ttlSeconds());
    return result;
  }

  async updateStatus(childId: string, dto: UpdateStatusDto) {
    let entity = await this.repo.findOne({ where: { childId } });

    if (!entity) {
      entity = this.repo.create({ childId });
    }

    entity.status = dto.status;
    entity.lastUpdatedAt = new Date();
    entity.lastUpdatedBy = dto.updatedBy ?? 'system';

    const saved = await this.repo.save(entity);

    const key = this.cacheKey(childId);
    await this.redis.set(key, JSON.stringify(saved), this.ttlSeconds());

    return saved;
  }
}
