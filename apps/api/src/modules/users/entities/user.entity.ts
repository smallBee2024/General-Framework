import { 
  Entity,
  Column,
  ManyToMany,
  JoinTable,
  Relation
} from 'typeorm';
import { CommonEntity } from '~/common/entity/common.entity';

// export class User {}
@Entity('users')
export class UserEntity extends CommonEntity {
  @Column()
  name: string;

  @Column({ select: false }) // 设置为 false，表示该字段不参与查询
  password: string;

  // // nullable 设置为 true，表示该字段可以为空
  // @Column({ nullable: true })
  // email: string;

  // @Column({ nullable: true })
  // phone: string;

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

  // @ManyToMany(() => RoleEntity, role => role.users)
  // @JoinTable({
  //   name: 'user_roles',
  //   joinColumn: { name: 'user_id', referencedColumnName: 'id' },
  //   inverseJoinColumn: { name: 'role_id', referencedColumnName: 'id' },
  // })
  // roles: Relation<RoleEntity[]>
}
