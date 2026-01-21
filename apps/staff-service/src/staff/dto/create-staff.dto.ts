import { ApiProperty } from '@nestjs/swagger';

export class CreateStaffDto {
  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  role: string;
}
