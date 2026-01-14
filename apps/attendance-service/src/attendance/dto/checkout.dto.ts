import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CheckOutDto {
  @ApiProperty()
  @IsString()
  checkedOutBy!: string;
}
