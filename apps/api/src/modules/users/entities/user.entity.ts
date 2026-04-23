import { 
  Entity,
  Column,
  ManyToMany,
  JoinTable,
  Relation
} from 'typeorm';
import { CommonEntity } from '~/common/entity/common.entity';
import { RoleEntity } from '~/modules/system/role/entities/role.entity';

@Entity('users')
export class UserEntity extends CommonEntity {
  @Column()
  name: string;

  @Column({ select: false }) // 设置为 false，表示该字段不参与查询
  password: string;

  @Column({ nullable: true })
  nickname: string

  @Column({ name: 'avatar', nullable: true })
  avatar: string

  @Column({ nullable: true })
  qq: string

  @Column({ nullable: true })
  email: string

  @Column({ nullable: true })
  phone: string

  @Column({ nullable: true })
  remark: string

  @Column({ type: 'tinyint', nullable: true, default: 1 })
  status: number

  @Column({ length: 32 })
  psalt: string

  @ManyToMany(() => RoleEntity, role => role.users)
  @JoinTable({
    name: 'sys_user_roles',
    joinColumn: { name: 'user_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'role_id', referencedColumnName: 'id' },
  })
  roles: Relation<RoleEntity[]>
}
