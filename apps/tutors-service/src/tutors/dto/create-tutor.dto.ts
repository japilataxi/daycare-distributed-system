import { ApiProperty } from '@nestjs/swagger';

export class CreateTutorDto {
  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  phone: string;
}
