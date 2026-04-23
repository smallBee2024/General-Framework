import { IsInt, IsNotEmpty, IsOptional, IsString, MaxLength, Min, MinLength } from 'class-validator'

export class CreateRoleDto {
  /** 角色编码：用于唯一标识角色（建议后端逻辑/权限判断使用） */
  @IsString({ message: '角色编码必须是字符串' })
  @IsNotEmpty({ message: '角色编码不能为空' })
  @MinLength(2, { message: '角色编码长度不能小于2' })
  @MaxLength(32, { message: '角色编码长度不能超过32' })
  code: string

  /** 角色名称：用于前端展示（同样做唯一约束，防止同名） */
  @IsString({ message: '角色名称必须是字符串' })
  @IsNotEmpty({ message: '角色名称不能为空' })
  @MinLength(2, { message: '角色名称长度不能小于2' })
  @MaxLength(20, { message: '角色名称长度不能超过20' })
  name: string

  /** 备注/描述 */
  @IsString({ message: '备注必须是字符串' })
  @IsOptional()
  @MaxLength(255, { message: '备注长度不能超过255' })
  remark?: string

  /** 状态：1 启用；0 禁用 */
  @IsInt({ message: '状态必须是整数' })
  @IsOptional()
  @Min(0, { message: '状态值不合法' })
  status?: number
}
