import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Staff {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty()
  id: string;

  @Column()
  @ApiProperty()
  firstName: string;

  @Column()
  @ApiProperty()
  lastName: string;

  @Column()
  @ApiProperty()
  role: string; // CAREGIVER, ADMIN

  @Column({ default: true })
  @ApiProperty()
  active: boolean;

  @CreateDateColumn()
  @ApiProperty()
  createdAt: Date;
}
