// module/admin/admin.module.ts
import { Module } from '@nestjs/common';
import { UserUseCase } from './usecases/user.usecase';
import { ViaMailService } from './usecases/service/viamail.service';
import { LoginLogService } from './usecases/service/login-log.service';
import { RepositoriesModule } from './infrastructure/repositories/repositories.module';
import { JwtModule } from '@nestjs/jwt';
import { UseCasesModule } from './usecases/usecase.module';
import { PermissionUseCase } from './usecases/permission.usecases';
import { UsersController } from './controller/user.controller';

@Module({
  imports: [RepositoriesModule,
      JwtModule.register({}),

    ],
    controllers:[
      UsersController
    ],
    providers: [
      UserUseCase,
      ViaMailService,
      LoginLogService,
      PermissionUseCase
    ],
})
export class ClientModule {}
