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


    @RequirePermissions()
    @Get()
    async getallPermissions() {
        return this.permissionUsecase.findAll();
    }

    @RequirePermissions()
    @Post('/create')
    async register(@Body() body: CreatePermissionDto){
        return this.permissionUsecase.create(body);
    }

    @RequirePermissions()
    @Put(':id')
    async updateUser(@Param('id') id: number,@Body() body: UpdatePermissionDto){
        return this.permissionUsecase.update(id,body);
    }

    @RequirePermissions()
    @Delete(':id')
    async delete(@Param('id') id: number) {
        return this.permissionUsecase.delete(id);
    }
}