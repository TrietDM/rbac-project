import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigModule } from '../config/typeorm/typeorm.module';
import { UserEntity } from '../entities/user.entity';
import { UserRepository } from './user.repository';
import { PermissionRepository } from './permission.repository';
import { PermissionEntity } from '../entities/permission.entity';
import { RoleRepository } from './role.repository';
import { RoleEntity } from '../entities/role.entity';
import { LoginLogEntity } from '../entities/login_log.entity';
import { LoginLogRepository } from './login-log.repository';
import { PlatformRepository } from './platform.repository';
import { PlatformEntity } from '../entities/platform.entity';
import { FeatureToggleRepository } from './feature-toggle.repository';
import { FeatureToggleEntity } from '../entities/feature-toggle.entity';
@Module({
  imports: [TypeOrmConfigModule, TypeOrmModule.forFeature([UserEntity,PermissionEntity,RoleEntity,LoginLogEntity, PlatformEntity, FeatureToggleEntity])],
  providers: [
    {
      provide: 'IUserRepository',
      useClass: UserRepository,
    },
    {
      provide: 'IPermissionRepository',
      useClass: PermissionRepository, 
    },
    {
      provide: 'IRoleRepository',
      useClass: RoleRepository, 
    },
    {
      provide: 'ILoginLogRepository',
      useClass: LoginLogRepository,
    },
    {
      provide: 'IPlatformRepository',
      useClass: PlatformRepository,
    },
    {
      provide: 'IFeatureToggleRepository',
      useClass: FeatureToggleRepository,
    },
  ],
  exports: ['IUserRepository',
    'IPermissionRepository',
    'IRoleRepository',
    'ILoginLogRepository',
    'IPlatformRepository',
    'IFeatureToggleRepository'
  ],
})
export class RepositoriesModule {}
  