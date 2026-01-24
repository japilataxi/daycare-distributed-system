import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

export type ChildPresenceStatus = 'IN_DAYCARE' | 'CHECKED_OUT' | 'UNKNOWN';

@Entity({ name: 'child_status' })
export class ChildStatus {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Index({ unique: true })
  @Column()
  childId!: string;

  @Column({ type: 'varchar', length: 20, default: 'UNKNOWN' })
  status!: ChildPresenceStatus;

  @Column({ type: 'timestamp', nullable: true })
  lastUpdatedAt?: Date;

  @Column({ type: 'varchar', length: 120, nullable: true })
  lastUpdatedBy?: string;
}
