import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Child } from './child.entity';
import { CreateChildDto } from './dto/create-child.dto';

@Injectable()
export class ChildrenService {
  constructor(
    @InjectRepository(Child)
    private readonly repo: Repository<Child>,
  ) {}

  create(dto: CreateChildDto) {
    return this.repo.save(dto);
  }

  findAll() {
    return this.repo.find();
  }

  findOne(id: string) {
    return this.repo.findOneBy({ id });
  }

  deactivate(id: string) {
    return this.repo.update(id, { active: false });
  }

  findByTutor(tutorId: string) {
    return this.repo.find({
      where: { tutorId },
    });
  }
}
