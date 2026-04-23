import { Column, Entity, Index, ManyToMany, ManyToOne, OneToMany, Relation } from 'typeorm'
import { CommonEntity } from '~/common/entity/common.entity'

import { RoleEntity } from '../../role/entities/role.entity'

export type MenuType = 'dir' | 'menu' | 'button'

/**
 * 菜单实体（支持树形结构）
 * - `parentId` 形成父子层级
 * - `type` 用于区分：目录/菜单/按钮
 * - `permission` 用于按钮级/接口级权限标识（若后续做 RBAC 可直接复用）
 */
@Entity('sys_menu')
export class MenuEntity extends CommonEntity {
  /** 父级菜单 ID；为空表示根节点 */
  @Index()
  @Column({ name: 'parent_id', type: 'int', nullable: true })
  parentId: number | null

  /** 显示标题 */
  @Column({ length: 50 })
  title: string

  /** 类型：dir(目录) / menu(菜单) / button(按钮) */
  @Column({ type: 'varchar', length: 20, default: 'menu' })
  type: MenuType

  /** 路由路径（目录/菜单常用；按钮可为空） */
  @Column({ nullable: true, length: 200 })
  path: string

  /** 前端组件路径（仅菜单常用，可为空） */
  @Column({ nullable: true, length: 200 })
  component: string

  /** 图标 */
  @Column({ nullable: true, length: 50 })
  icon: string

  /** 排序（越小越靠前） */
  @Index()
  @Column({ type: 'int', default: 0 })
  sort: number

  /** 权限标识（如：system:menu:create），用于鉴权/按钮权限 */
  @Column({ name: 'permission', nullable: true, length: 100 })
  permission: string

  /** 是否可见：1 可见；0 隐藏 */
  @Column({ type: 'tinyint', default: 1 })
  visible: number

  /** 状态：1 启用；0 禁用 */
  @Column({ type: 'tinyint', default: 1 })
  status: number

  @ManyToMany(() => RoleEntity, role => role.menus, {
    onDelete: 'CASCADE',
  })
  roles: Relation<RoleEntity[]>
}
