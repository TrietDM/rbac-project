import { Body, Controller, Delete, Get, Inject, Param, Post, Put} from '@nestjs/common';
import { createPermissionDto } from './dtos/permission/createPermission.dto';
import { updatePermissionDto } from './dtos/permission/updatePermission.dto';
import { ApiTags } from '@nestjs/swagger';
import { PermissionUseCase } from 'src/module/usecases/permission.usecases';
import { RequirePermissions } from '../usecases/auth/permission.decorator';
import { FeatureToggleService } from '../usecases/service/feature-toggle.service';

    @ApiTags('Feature-toggles')
    @Controller('feature-toggles')
    export class FeatureToggleController {
        constructor(
            private readonly service: FeatureToggleService,
        ) {}


    @Get()
    async getEnablesFeatures() {
        return this.service.getEnabledFeatures();
    }
    @Put('/status/:id')
    async updateFeatureStatus(@Param('id') id: number){
        return this.service.updateFeature(id);
    }
}