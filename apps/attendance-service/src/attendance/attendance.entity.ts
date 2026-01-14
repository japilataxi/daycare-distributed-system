import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'attendance_records' })
export class Attendance {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  childId!: string;

  @Column()
  checkedInBy!: string;

  @Column({ type: 'timestamp' })
  checkInAt!: Date;

  @Column({ nullable: true })
  checkedOutBy?: string;

  @Column({ type: 'timestamp', nullable: true })
  checkOutAt?: Date;
}
