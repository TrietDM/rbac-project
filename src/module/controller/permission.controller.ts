import { Body, Controller, Delete, Get, Inject, Param, Post, Put} from '@nestjs/common';
import { CreatePermissionDto } from './dtos/permission/createPermission.dto';
import { UpdatePermissionDto } from './dtos/permission/updatePermission.dto';
import { ApiTags } from '@nestjs/swagger';
import { PermissionUseCase } from 'src/module/usecases/permission.usecases';
import { RequirePermissions } from '../usecases/auth/permission.decorator';

    @ApiTags('Permissions')
    @Controller('permissions')
    export class PermissionController {
        constructor(
            private readonly permissionUsecase: PermissionUseCase,
        ) {}


    @RequirePermissions('view-permission')
    @Get()
    async getallPermissions() {
        return this.permissionUsecase.findAll();
    }

    @RequirePermissions('create-permission')
    @Post('/create')
    async register(@Body() body: CreatePermissionDto){
        return this.permissionUsecase.create(body);
    }

    @RequirePermissions('edit-permission')
    @Put(':id')
    async updateUser(@Param('id') id: number,@Body() body: UpdatePermissionDto){
        return this.permissionUsecase.update(id,body);
    }

    @RequirePermissions('delete-permission')
    @Delete(':id')
    async delete(@Param('id') id: number) {
        return this.permissionUsecase.delete(id);
    }
}