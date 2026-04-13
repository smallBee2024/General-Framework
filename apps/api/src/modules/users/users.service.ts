import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  create(createUserDto: CreateUserDto) {
    // 创建用户
    const user = this.userRepository.create(createUserDto);
    return this.userRepository.save(user);
  }

  findAll() {
    return this.userRepository.find();
  }

  findOne(id: number) {
    return this.userRepository.findOne({ where: { id } });
  }

  async findUserByUserName(name: string) {
    console.log('findUserByUserName', name);
    return this.userRepository
      .createQueryBuilder('users')
      .addSelect('users.password')
      .where({
        name,
      })
      .getOne()
  }

  async update(id: number, updateUserDto: any) {
    const result = await this.userRepository.update(id, updateUserDto);
    console.log('result', result);
    if (result.affected === 0) {
      return false;
    }
    
    return true;
  }

  async remove(id: number) {
    const result = await this.userRepository.delete(id);
    if (result.affected === 0) {
      return false;
    }
    return true;
  }
}
