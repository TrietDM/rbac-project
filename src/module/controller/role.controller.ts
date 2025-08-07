import { Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import { CreateRoleDto } from './dtos/role/createRole.dto';
import { UpdateRoleDto } from './dtos/role/updateRole.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RoleUseCase } from 'src/module/usecases/role.usecases';
import { RequirePermissions } from '../usecases/auth/permission.decorator';
import { AssignRoleDto } from './dtos/role/assignRole.dto';
import { AssignPermissionDto } from './dtos/role/assignPermission.dto';

@ApiBearerAuth('access-token')
@ApiTags('Roles')
@Controller('roles')
    export class RoleController {
        constructor(
            private readonly roleUsecase: RoleUseCase,
        ) {}

    @RequirePermissions('view-role')
    @Get()
    async getallRoles() {
        return this.roleUsecase.findAll();
    }


    @RequirePermissions('create-role')
    @Post('/create')
    async register(@Body() body: CreateRoleDto){
        return this.roleUsecase.create(body);
    }


  


    @RequirePermissions('delete-role')
    @Delete(':id')
    async delete(@Param('id') id: number) {
        return this.roleUsecase.delete(id);
    }

    @Put('users-assign')
    @RequirePermissions('role-assign')
    async assignUsers(@Body() dto: AssignRoleDto) {
        return this.roleUsecase.assignUsersToRole(dto);
    }

    @Put('permissions-assign')
    @RequirePermissions('role-assign')
    async assignPermission(@Body() dto: AssignPermissionDto) {
        return this.roleUsecase.assignPermissionToRole(dto);
    }


    @RequirePermissions('edit-role')
    @Put(':id')
    async updateUser(@Param('id') id: number,@Body() body: UpdateRoleDto){
        return this.roleUsecase.update(id,body);
    }
}