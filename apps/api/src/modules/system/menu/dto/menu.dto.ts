import {
  IsIn,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  Min,
  MinLength,
  ValidateIf,
} from 'class-validator'

export enum MenuType {
  /** 菜单 */
  MENU = 0,
  /** 目录 */
  MENU_GROUP = 1,
  /** 权限 */
  PERMISSION = 2,
}

export class MenuDto {
  /**
   * 父级菜单 ID；不传则作为根菜单
   * 可选，不传则作为根菜单
   * @example 1
   * @example null
   */
  @IsOptional()
  parentId: number | null

  /**
   * 菜单标题（展示用）
   * 必填，长度不能小于2，不能超过50
   * */
  @IsString({ message: '标题必须是字符串' })
  @IsNotEmpty({ message: '标题不能为空' })
  @MaxLength(50, { message: '标题长度不能超过50' })
  @MinLength(2, { message: '标题长度不能小于2' })
  title: string

  /** 类型：目录/菜单/按钮（默认 menu） */
  @IsIn([0, 1, 2])
  type: MenuType

  /** 路由路径 */
  @ValidateIf(o => o.type !== MenuType.PERMISSION)
  path: string

  /** 前端组件路径（menu 常用） */
  @IsString({ message: '组件必须是字符串' })
  @ValidateIf((o: MenuDto) => o.type !== MenuType.PERMISSION)
  @IsString({ message: '组件必须是字符串' })
  @IsOptional()
  component?: string

  /** 图标 */
  @IsString({ message: '图标必须是字符串' })
  @IsOptional()
  @ValidateIf((o: MenuDto) => o.type !== MenuType.PERMISSION)
  @IsString()
  icon?: string

  /** 排序（越小越靠前） */
  @IsInt({ message: '排序必须是整数' })
  @IsOptional()
  @Min(0, { message: '排序值不合法' })
  sort: number

  /** 权限标识（按钮/接口鉴权用） */
  @IsString({ message: '权限标识必须是字符串' })
  @ValidateIf((o: MenuDto) => o.type === MenuType.PERMISSION)
  @IsOptional()
  @IsString({ message: '权限标识必须是字符串' })
  permission: string

  /** 是否可见：1 可见；0 隐藏, 可选，不传则默认为 1 */
  @ValidateIf((o: MenuDto) => o.type !== MenuType.PERMISSION)
  @IsIn([0, 1])
  @IsOptional()
  visible: number

  /** 状态：1 启用；0 禁用 */
  @IsIn([0, 1])
  @IsOptional()
  status: number
}
