import { ApiProperty } from '@nestjs/swagger';

export class CreateChildDto {
  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  birthDate: string;

  @ApiProperty()
  tutorId: string;
}
