import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Child {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty()
  id: string;

  @Column()
  @ApiProperty()
  firstName: string;

  @Column()
  @ApiProperty()
  lastName: string;

  @Column({ type: 'date' })
  @ApiProperty()
  birthDate: string;

  @Column()
  @ApiProperty()
  tutorId: string;

  @Column({ default: true })
  @ApiProperty()
  active: boolean;

  @CreateDateColumn()
  @ApiProperty()
  createdAt: Date;
}
