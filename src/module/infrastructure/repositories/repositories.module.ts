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
@Module({
  imports: [TypeOrmConfigModule, TypeOrmModule.forFeature([UserEntity,PermissionEntity,RoleEntity,LoginLogEntity])],
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
  ],
  exports: ['IUserRepository',
    'IPermissionRepository',
    'IRoleRepository',
    'ILoginLogRepository'
  ],
})
export class RepositoriesModule {}
  