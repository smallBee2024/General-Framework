import { HttpException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository, InjectEntityManager } from '@nestjs/typeorm';
import { Repository, EntityManager } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { isEmpty } from 'lodash';
import { md5, randomValue } from '~/utils'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    @InjectEntityManager()
    private entityManager: EntityManager,
  ) {}

  async create({ name, password, ...data }: CreateUserDto) {
    const exists = await this.userRepository.findOneBy({
      name,
    })
    if (!isEmpty(exists))
      throw new HttpException('用户名已存在', 400)

    await this.entityManager.transaction(async (manager) => {
      const salt = randomValue(32)

      if (!password) {
        // const initPassword = await this.paramConfigService.findValueByKey(
        //   SYS_USER_INITPASSWORD,
        // )
        // password = md5(`${initPassword ?? '123456'}${salt}`)
      }
      else {
        password = md5(`${password ?? '123456'}${salt}`)
      }

      const u = manager.create(UserEntity, {
        name,
        password,
        ...data,
        psalt: salt,
        // roles: await this.roleRepository.findBy({ id: In(roleIds) }),
        // dept: await DeptEntity.findOneBy({ id: deptId }),
      })

      const result = await manager.save(u)
      return result
    })
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
