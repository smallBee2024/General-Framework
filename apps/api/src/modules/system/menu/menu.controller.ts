import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { MenuService } from './menu.service';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';

/**
 * 菜单管理接口
 * 路由前缀：/menu
 */
@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  /** 创建菜单 */
  @Post()
  create(@Body() createMenuDto: CreateMenuDto) {
    return this.menuService.create(createMenuDto);
  }

  /** 获取菜单树 */
  @Get()
  findAll() {
    return this.menuService.findAll();
  }

  /** 获取菜单详情 */
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.menuService.findOne(id);
  }

  /** 更新菜单（部分更新） */
  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateMenuDto: UpdateMenuDto) {
    return this.menuService.update(id, updateMenuDto);
  }

  /** 删除菜单（存在子菜单则拒绝） */
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.menuService.remove(id);
  }
}
