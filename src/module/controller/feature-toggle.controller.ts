import { Controller, Get, Param, Put} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
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