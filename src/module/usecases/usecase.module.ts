import { Module } from '@nestjs/common';
import { RepositoriesModule } from '../infrastructure/repositories/repositories.module';
import { JwtModule } from '@nestjs/jwt';
import { PermissionUseCase } from './permission.usecases';
import { UserUseCase } from './user.usecase';
import { ViaMailService } from './service/viamail.service';
import { RoleUseCase } from './role.usecases';
import { LoginLogService } from './service/login-log.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoginLogEntity } from '../infrastructure/entities/login_log.entity';
import { FeatureToggleService } from './service/feature-toggle.service';


@Module({
    imports: [RepositoriesModule,
        JwtModule.register({}),
        TypeOrmModule.forFeature([LoginLogEntity])
    ],
    providers: [
     PermissionUseCase,
     RoleUseCase,
     UserUseCase,
     ViaMailService,
     LoginLogService,
     FeatureToggleService,
    ],
    exports: [PermissionUseCase,
     UserUseCase,
     RoleUseCase,
     ViaMailService,
     LoginLogService,
     FeatureToggleService,
  ],
})
export class UseCasesModule {}
