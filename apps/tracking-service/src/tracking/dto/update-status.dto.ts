import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsOptional, IsString } from 'class-validator';

export class UpdateStatusDto {
  @ApiProperty({ enum: ['IN_DAYCARE', 'CHECKED_OUT', 'UNKNOWN'] })
  @IsIn(['IN_DAYCARE', 'CHECKED_OUT', 'UNKNOWN'])
  status!: 'IN_DAYCARE' | 'CHECKED_OUT' | 'UNKNOWN';

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  updatedBy?: string;
}
