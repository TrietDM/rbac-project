import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FeatureToggleService } from '../service/feature-toggle.service';
import { FeatureToggleEntity } from 'src/module/infrastructure/entities/feature-toggle.entity';
import { FeatureToggleRepository } from 'src/module/infrastructure/repositories/feature-toggle.repository';

@Module({
  imports: [TypeOrmModule.forFeature([FeatureToggleEntity])],
  providers: [FeatureToggleService,
    {
      provide: 'IFeatureToggleRepository',
      useClass: FeatureToggleRepository, 
    }
  ],
  exports: [FeatureToggleService,
       'IFeatureToggleRepository',
  ],
})
export class FeatureToggleModule {}
