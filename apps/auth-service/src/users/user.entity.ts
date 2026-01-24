import { Column, Entity, PrimaryGeneratedColumn, Index } from 'typeorm';
import { Role } from '../common/enums/role.enum';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Index({ unique: true })
  @Column({ type: 'varchar', length: 120 })
  email!: string;

  @Column({ type: 'varchar', length: 120 })
  passwordHash!: string;

  @Column({ type: 'varchar', length: 80 })
  fullName!: string;

  @Column({ type: 'enum', enum: Role, default: Role.TUTOR })
  role!: Role;

  @Column({ type: 'boolean', default: true })
  isActive!: boolean;
}
