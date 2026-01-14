import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CheckInDto {
  @ApiProperty()
  @IsString()
  childId!: string;

  @ApiProperty()
  @IsString()
  checkedInBy!: string;
}
