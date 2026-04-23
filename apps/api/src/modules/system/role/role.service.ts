import { HttpException, Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoleEntity } from './entities/role.entity';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(RoleEntity)
    private readonly roleRepository: Repository<RoleEntity>,
  ) {}

  /**
   * 创建角色
   * - `code` / `name` 任一重复都拒绝创建（对应实体唯一索引）
   */
  async create(createRoleDto: CreateRoleDto) {
    const exists = await this.roleRepository.findOne({
      where: [
        { code: createRoleDto.code },
        { name: createRoleDto.name },
      ],
    })
    if (exists)
      throw new HttpException('角色编码或名称已存在', 400)

    const entity = this.roleRepository.create({
      ...createRoleDto,
      status: createRoleDto.status ?? 1,
    })
    return await this.roleRepository.save(entity)
  }

  /** 获取全部角色（按 id 倒序） */
  async findAll() {
    return await this.roleRepository.find({
      order: { id: 'DESC' },
    })
  }

  /** 获取角色详情 */
  async findOne(id: number) {
    const role = await this.roleRepository.findOne({ where: { id } })
    if (!role)
      throw new HttpException('角色不存在', 404)
    return role
  }

  /**
   * 更新角色
   * - 支持部分更新
   * - 若更新了 `code`/`name`，需要做唯一性检查
   */
  async update(id: number, updateRoleDto: UpdateRoleDto) {
    const role = await this.roleRepository.findOne({ where: { id } })
    if (!role)
      throw new HttpException('角色不存在', 404)

    if (updateRoleDto.code || updateRoleDto.name) {
      const exists = await this.roleRepository.findOne({
        where: [
          ...(updateRoleDto.code ? [{ code: updateRoleDto.code }] : []),
          ...(updateRoleDto.name ? [{ name: updateRoleDto.name }] : []),
        ],
      })
      if (exists && exists.id !== id)
        throw new HttpException('角色编码或名称已存在', 400)
    }

    await this.roleRepository.update(id, updateRoleDto)
    return await this.findOne(id)
  }

  /**
   * 删除角色
   * - 目前为物理删除
   * - 若后续加“用户-角色/角色-菜单”关联，这里建议做关联检查或改为软删除
   */
  async remove(id: number) {
    const role = await this.roleRepository.findOne({ where: { id } })
    if (!role)
      throw new HttpException('角色不存在', 404)
    await this.roleRepository.delete(id)
    return true
  }
}
