// module/admin/admin.module.ts
import { Module } from '@nestjs/common';
import { UserUseCase } from '../user.usecase';
import { ViaMailService } from '../service/viamail.service';
import { PermissionUseCase } from '../permission.usecases';
import { RoleUseCase } from '../role.usecases';
import { LoginLogService } from '../service/login-log.service';
import { RepositoriesModule } from '../../infrastructure/repositories/repositories.module';
import { JwtModule } from '@nestjs/jwt';
import { UsersController } from '../../controller/user.controller';
import { PermissionController } from '../../controller/permission.controller';
import { RoleController } from '../../controller/role.controller';

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
