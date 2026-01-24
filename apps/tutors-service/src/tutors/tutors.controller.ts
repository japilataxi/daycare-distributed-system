import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { TutorsService } from './tutors.service';
import { CreateTutorDto } from './dto/create-tutor.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('tutors')
@Controller('tutors')
export class TutorsController {
  constructor(private readonly service: TutorsService) {}

  @Post()
  create(@Body() dto: CreateTutorDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }
}
