import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async findById(id: number): Promise<User> {
    const user = await this.userRepo.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async findByUserName(username: string): Promise<User> {
    const user = await this.userRepo.findOne({ where: { username } });
    if (!user) {
      throw new NotFoundException(`User with username ${username} not found`);
    }

    return user;
  }

  async createuser(userDto: CreateUserDto): Promise<User> {
    const { username, password } = userDto;
    const existing = await this.userRepo.findOne({ where: { username } });
    if (existing) {
      throw new ConflictException('Username already taken');
    }

    const hashed = await bcrypt.hash(password, 12);
    const user = this.userRepo.create({ username, password: hashed });
    return this.userRepo.save(user);
  }
}
