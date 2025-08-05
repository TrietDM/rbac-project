import { Body, Controller, Delete, Get, Inject, Param, Post, Put} from '@nestjs/common';
import { CreatePlatformDto } from './dtos/platform/createPlatform.dto';
import { UpdatePlatformDto } from './dtos/platform/updatePlatform.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { PlatformUseCase } from 'src/module/usecases/platform.usecases';
import { AssignPlatformDto } from './dtos/platform/assignPlatform.dto';


    @ApiBearerAuth('access-token')
    @ApiTags('Platform')
    @Controller('platforms')
    export class PlatformController {
        constructor(
            private readonly platformUsecase:      PlatformUseCase,
        ) {}


    @Get()
    async getallPlatforms() {
        return this.platformUsecase.findAll();
    }

    @Post('/create')
    async register(@Body() body: CreatePlatformDto){
        return this.platformUsecase.create(body);
    }

    @Put('/assign-platform')
    async assignUserToPlatform(@Body() body: AssignPlatformDto) {
        return this.platformUsecase.assignUserToPlatform(body);
    }

    @Put(':id')
    async updateUser(@Param('id') id: number,@Body() body: UpdatePlatformDto){
        return this.platformUsecase.update(id,body);
    }

    @Delete(':id')
    async delete(@Param('id') id: number) {
        return this.platformUsecase.delete(id);
    }

    
}