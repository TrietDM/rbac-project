// module/admin/admin.module.ts
import { Module } from '@nestjs/common';
import { UserUseCase } from './usecases/user.usecase';
import { ViaMailService } from './usecases/service/viamail.service';
import { PermissionUseCase } from './usecases/permission.usecases';
import { RoleUseCase } from './usecases/role.usecases';
import { LoginLogService } from './usecases/service/login-log.service';
import { RepositoriesModule } from './infrastructure/repositories/repositories.module';
import { JwtModule } from '@nestjs/jwt';
import { UsersController } from './controller/user.controller';
import { PermissionController } from './controller/permission.controller';
import { RoleController } from './controller/role.controller';

@Module({
  imports: [RepositoriesModule,
    JwtModule.register({}),
  ],
  controllers: [
    UsersController,
    PermissionController,
    RoleController,
  ],
  providers: [
    UserUseCase,
    PermissionUseCase,
    RoleUseCase,
    ViaMailService,
    LoginLogService,
    
  ],
})
export class AdminModule {}
