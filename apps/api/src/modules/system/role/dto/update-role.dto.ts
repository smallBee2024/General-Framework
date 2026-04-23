import { IsInt, IsOptional, IsString, MaxLength, Min, MinLength } from 'class-validator'

/**
 * 更新角色 DTO
 * - 允许部分更新：字段均为可选
 */
export class UpdateRoleDto {
  /** 角色编码（唯一） */
  @IsString({ message: '角色编码必须是字符串' })
  @IsOptional()
  @MinLength(2, { message: '角色编码长度不能小于2' })
  @MaxLength(32, { message: '角色编码长度不能超过32' })
  code?: string

  /** 角色名称（唯一） */
  @IsString({ message: '角色名称必须是字符串' })
  @IsOptional()
  @MinLength(2, { message: '角色名称长度不能小于2' })
  @MaxLength(20, { message: '角色名称长度不能超过20' })
  name?: string

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

