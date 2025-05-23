import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { ResponseMessage, User } from 'src/decotator/customize';
import { IUser } from 'src/users/user.interface';

@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) { }

  @Post()
  @ResponseMessage("Create a new role")
  create(@Body() createRoleDto: CreateRoleDto, @User() user: IUser) {
    return this.roleService.create(createRoleDto, user);
  }

  @Get()
  @ResponseMessage("Fetch roles with paginate")
  findAll(@Query("current") currentPage: string,
    @Query("pageSize") limit: string,
    @Query() qs: string) {
    return this.roleService.findAll(+currentPage, +limit, qs);
  }

  @Get(':id')
  @ResponseMessage("Fetch a role by id")
  findOne(@Param('id') id: string) {
    return this.roleService.findOne(id);
  }

  @Patch(':id')
  @ResponseMessage("Update a role")
  update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto, @User() user: IUser) {
    return this.roleService.update(id, updateRoleDto, user);
  }

  @Delete(':id')
  @ResponseMessage("Delete a role")
  remove(@Param('id') id: string, @User() user: IUser) {
    return this.roleService.remove(id, user);
  }
}
