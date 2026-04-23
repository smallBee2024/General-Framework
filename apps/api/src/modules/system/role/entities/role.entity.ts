import { Column, Entity, Index, ManyToMany, JoinTable, Relation } from 'typeorm'
import { CommonEntity } from '~/common/entity/common.entity'

import { MenuEntity } from '../../menu/entities/menu.entity'
import { UserEntity } from '~/modules/users/entities/user.entity'

/**
 * 角色实体
 * - 用于系统权限/用户授权等场景的“角色”概念
 * - `code` / `name` 均做唯一约束，避免重复定义
 */
@Entity('sys_role')
export class RoleEntity extends CommonEntity {
  /** 角色编码（建议用于程序内标识，如：admin、editor） */
  @Index({ unique: true })
  @Column({ length: 32 })
  code: string

  /** 角色名称（用于展示，如：管理员、编辑） */
  @Index({ unique: true })
  @Column({ length: 20 })
  name: string

  /** 备注/描述 */
  @Column({ nullable: true, length: 255 })
  remark: string

  /** 状态：1 启用；0 禁用（项目里用 tinyint 统一表示开关状态） */
  @Column({ type: 'tinyint', default: 1 })
  status: number

  @ManyToMany(() => UserEntity, user => user.roles)
  users: Relation<UserEntity[]>

  @ManyToMany(() => MenuEntity, menu => menu.roles, {})
  @JoinTable({
    name: 'sys_role_menus',
    joinColumn: { name: 'role_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'menu_id', referencedColumnName: 'id' },
  })
  menus: Relation<MenuEntity[]>
}
