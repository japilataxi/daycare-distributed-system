import { Controller, Post, Get, Body, Param, Patch } from '@nestjs/common';
import { ChildrenService } from './children.service';
import { CreateChildDto } from './dto/create-child.dto';
import { ApiTags } from '@nestjs/swagger';


@ApiTags('children')
@Controller('children')
export class ChildrenController {
  constructor(private readonly service: ChildrenService) {}

  @Post()
  create(@Body() dto: CreateChildDto) {
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

  @Patch(':id/deactivate')
  deactivate(@Param('id') id: string) {
    return this.service.deactivate(id);
  }

  @Get('by-tutor/:tutorId')
  findByTutor(@Param('tutorId') tutorId: string) {
  return this.service.findByTutor(tutorId);
}

}
