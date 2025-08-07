import { Body, Controller, Delete, Get, Inject, Param, Post, Put} from '@nestjs/common';
import { CreatePlatformDto } from './dtos/platform/createPlatform.dto';
import { UpdatePlatformDto } from './dtos/platform/updatePlatform.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { PlatformUseCase } from 'src/module/usecases/platform.usecases';
import { AssignPlatformDto } from './dtos/platform/assignPlatform.dto';
import { RequirePermissions } from '../usecases/auth/permission.decorator';


    @ApiBearerAuth('access-token')
    @ApiTags('Platform')
    @Controller('platforms')
    export class PlatformController {
        constructor(
            private readonly platformUsecase:      PlatformUseCase,
        ) {}

    @RequirePermissions('view-platform')
    @Get()
    async getallPlatforms() {
        return this.platformUsecase.findAll();
    }

    @RequirePermissions('create-platform')
    @Post('/create')
    async create(@Body() body: CreatePlatformDto){
        return this.platformUsecase.create(body);
    }

    @RequirePermissions('assign-platform')
    @Put('/assign-platform')
    async assignUserToPlatform(@Body() body: AssignPlatformDto) {
        return this.platformUsecase.assignUserToPlatform(body);
    }

    @RequirePermissions('edit-platform')
    @Put(':id')
    async updatePlatform(@Param('id') id: number,@Body() body: UpdatePlatformDto){
        return this.platformUsecase.update(id,body);
    }

    @RequirePermissions('delete-platform')
    @Delete(':id')
    async delete(@Param('id') id: number) {
        return this.platformUsecase.delete(id);
    }

    
}