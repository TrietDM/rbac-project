import { Module } from '@nestjs/common';
import { EnvironmentConfigModule } from '../infrastructure/config/environment-config/environment-config.module';
import { RepositoriesModule } from '../infrastructure/repositories/repositories.module';
import { UsersController } from './user.controller';
import { PermissionController } from './permission.controller';
import { UseCasesModule } from '../usecases/usecase.module';
import { RoleController } from './role.controller';
import { JwtService } from '@nestjs/jwt';
import { FeatureToggleController } from './feature-toggle.controller';

@Module({
  imports: [RepositoriesModule, EnvironmentConfigModule,UseCasesModule],
  controllers: [
    UsersController,
    PermissionController,
    RoleController,
    FeatureToggleController,
    ],
    providers: [JwtService]
})
export class ControllersModule {}

