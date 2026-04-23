import { HttpException, Injectable } from '@nestjs/common';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MenuEntity } from './entities/menu.entity';

/**
 * 将平铺菜单列表构造成树形结构
 * - 不依赖数据库递归查询，适用于中小规模菜单数据
 * - `parentId` 找不到对应父节点时，该节点会被当作根节点
 */
function buildMenuTree(list: MenuEntity[]) {
  const map = new Map<number, any>()
  const roots: any[] = []
  for (const item of list) {
    map.set(item.id, { ...item, children: [] })
  }
  for (const item of list) {
    const node = map.get(item.id)
    const parentId = item.parentId
    if (parentId && map.has(parentId)) {
      map.get(parentId).children.push(node)
    }
    else {
      roots.push(node)
    }
  }
  return roots
}

@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(MenuEntity)
    private readonly menuRepository: Repository<MenuEntity>,
  ) {}

  /**
   * 创建菜单
   * - 若传了 `parentId`，需要保证父级存在
   * - 默认值：type=menu、sort=0、visible=1、status=1
   */
  async create(createMenuDto: CreateMenuDto) {
    const parentId = createMenuDto.parentId ?? null
    if (parentId) {
      const parent = await this.menuRepository.findOne({ where: { id: parentId } })
      if (!parent)
        throw new HttpException('父级菜单不存在', 400)
    }

    const entity = this.menuRepository.create({
      parentId,
      title: createMenuDto.title,
      type: createMenuDto.type ?? 'menu',
      path: createMenuDto.path ?? null,
      component: createMenuDto.component ?? null,
      icon: createMenuDto.icon ?? null,
      sort: createMenuDto.sort ?? 0,
      permission: createMenuDto.permission ?? null,
      visible: createMenuDto.visible ?? 1,
      status: createMenuDto.status ?? 1,
    })
    return await this.menuRepository.save(entity)
  }

  /**
   * 获取菜单树
   * - 返回树结构，便于前端直接渲染侧边栏/权限菜单
   */
  async findAll() {
    const list = await this.menuRepository.find({
      order: { sort: 'ASC', id: 'ASC' },
    })
    return buildMenuTree(list)
  }

  /** 获取菜单详情 */
  async findOne(id: number) {
    const menu = await this.menuRepository.findOne({ where: { id } })
    if (!menu)
      throw new HttpException('菜单不存在', 404)
    return menu
  }

  /**
   * 更新菜单
   * - 防止把自己设置为父级（形成环）
   * - 若更新 parentId，需校验父级存在；传 null 表示改为根节点
   */
  async update(id: number, updateMenuDto: UpdateMenuDto) {
    const menu = await this.menuRepository.findOne({ where: { id } })
    if (!menu)
      throw new HttpException('菜单不存在', 404)

    if (updateMenuDto.parentId === id)
      throw new HttpException('父级菜单不能是自己', 400)

    if (typeof updateMenuDto.parentId !== 'undefined') {
      if (updateMenuDto.parentId === null) {
        // root
      }
      else {
        const parent = await this.menuRepository.findOne({ where: { id: updateMenuDto.parentId } })
        if (!parent)
          throw new HttpException('父级菜单不存在', 400)
      }
    }

    await this.menuRepository.update(id, updateMenuDto as any)
    return await this.findOne(id)
  }

  /**
   * 删除菜单
   * - 若存在子菜单则拒绝删除，避免树结构断裂
   */
  async remove(id: number) {
    const menu = await this.menuRepository.findOne({ where: { id } })
    if (!menu)
      throw new HttpException('菜单不存在', 404)

    const child = await this.menuRepository.findOne({ where: { parentId: id } })
    if (child)
      throw new HttpException('请先删除子菜单', 400)

    await this.menuRepository.delete(id)
    return true
  }
}
