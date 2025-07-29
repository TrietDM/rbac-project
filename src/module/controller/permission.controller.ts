import { Body, Controller, Delete, Get, Inject, Param, Post, Put} from '@nestjs/common';
import { createPermissionDto } from './dtos/permission/createPermission.dto';
import { updatePermissionDto } from './dtos/permission/updatePermission.dto';
import { ApiTags } from '@nestjs/swagger';
import { PermissionUseCase } from 'src/module/usecases/permission.usecases';

    @ApiTags('Permissions')
    @Controller('permissions')
    export class PermissionController {
        constructor(
            private readonly permissionUsecase: PermissionUseCase,
        ) {}

    @Get()
    async getallPermissions() {
        return this.permissionUsecase.findAll();
    }

 
    @Post('/create')
    async register(@Body() body: createPermissionDto){
        return this.permissionUsecase.create(body);
    }


    @Put(':id')
    async updateUser(@Param('id') id: number,@Body() body: updatePermissionDto){
        return this.permissionUsecase.update(id,body);
    }


    @Delete(':id')
    async delete(@Param('id') id: number) {
        return this.permissionUsecase.delete(id);
    }
}