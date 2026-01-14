import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from '../common/enums/role.enum';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepo: Repository<User>,
  ) {}

  async findByEmail(email: string): Promise<User | null> {
    return this.usersRepo.findOne({ where: { email } });
  }

  async createUser(params: {
    email: string;
    password: string;
    fullName: string;
    role?: Role;
  }): Promise<User> {
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(params.password, saltRounds);

    const user = this.usersRepo.create({
      email: params.email.toLowerCase().trim(),
      passwordHash,
      fullName: params.fullName.trim(),
      role: params.role ?? Role.TUTOR,
      isActive: true,
    });

    return this.usersRepo.save(user);
  }

  async validatePassword(user: User, password: string): Promise<boolean> {
    return bcrypt.compare(password, user.passwordHash);
  }
}
