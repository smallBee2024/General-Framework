import { IsIn, IsInt, IsOptional, IsString, MaxLength, Min } from 'class-validator'

/**
 * 更新菜单 DTO
 * - 允许部分更新：字段均为可选
 */
export class UpdateMenuDto {
  /** 父级菜单 ID；传 null 表示改为根菜单 */
  @IsInt({ message: '父级ID必须是整数' })
  @IsOptional()
  @Min(1, { message: '父级ID不合法' })
  parentId?: number | null

  /** 菜单标题 */
  @IsString({ message: '标题必须是字符串' })
  @IsOptional()
  @MaxLength(50, { message: '标题长度不能超过50' })
  title?: string

  /** 类型：目录/菜单/按钮 */
  @IsString({ message: '类型必须是字符串' })
  @IsIn(['dir', 'menu', 'button'], { message: '类型只能是 dir/menu/button' })
  @IsOptional()
  type?: 'dir' | 'menu' | 'button'

  /** 路由路径 */
  @IsString({ message: '路由必须是字符串' })
  @IsOptional()
  @MaxLength(200, { message: '路由长度不能超过200' })
  path?: string

  /** 前端组件路径 */
  @IsString({ message: '组件必须是字符串' })
  @IsOptional()
  @MaxLength(200, { message: '组件长度不能超过200' })
  component?: string

  /** 图标 */
  @IsString({ message: '图标必须是字符串' })
  @IsOptional()
  @MaxLength(50, { message: '图标长度不能超过50' })
  icon?: string

  /** 排序 */
  @IsInt({ message: '排序必须是整数' })
  @IsOptional()
  sort?: number

  /** 权限标识 */
  @IsString({ message: '权限标识必须是字符串' })
  @IsOptional()
  @MaxLength(100, { message: '权限标识长度不能超过100' })
  permission?: string

  /** 是否可见 */
  @IsInt({ message: '是否可见必须是整数' })
  @IsOptional()
  @Min(0, { message: '是否可见值不合法' })
  visible?: number

  /** 状态 */
  @IsInt({ message: '状态必须是整数' })
  @IsOptional()
  @Min(0, { message: '状态值不合法' })
  status?: number
}
