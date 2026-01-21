import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tutor } from './tutor.entity';
import { CreateTutorDto } from './dto/create-tutor.dto';

@Injectable()
export class TutorsService {
  constructor(
    @InjectRepository(Tutor)
    private readonly repo: Repository<Tutor>,
  ) {}

  create(dto: CreateTutorDto) {
    return this.repo.save(dto);
  }

  findAll() {
    return this.repo.find();
  }

  findOne(id: string) {
    return this.repo.findOneBy({ id });
  }
}
