import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class FileObject {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty()
  id: string;

  @Column()
  @ApiProperty()
  originalName: string;

  @Column()
  @ApiProperty()
  mimeType: string;

  @Column('int')
  @ApiProperty()
  size: number;

  @Column()
  @ApiProperty()
  bucket: string;

  @Column()
  @ApiProperty()
  key: string;

  @Column()
  @ApiProperty()
  url: string;

  @Column({ nullable: true })
  @ApiProperty({ required: false })
  uploadedBy?: string;

  @CreateDateColumn()
  @ApiProperty()
  createdAt: Date;
}
