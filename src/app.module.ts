import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UseCasesModule } from './module/usecases/usecase.module';
import { ControllersModule } from './module/controller/controllers.module';
import { JwtService } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { PermissionGuard } from './module/usecases/auth/permission.guard';
import { RedisModule } from './module/usecases/modules/redis.module';
import { RouterModule } from '@nestjs/core';
import { AdminModule } from './module/usecases/modules/admin.module';
import { ClientModule } from './module/usecases/modules/client.module';
import { FeatureToggleModule } from './module/usecases/modules/feature-toggle.module';
import { PlatformRepository } from './module/infrastructure/repositories/platform.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlatformEntity } from './module/infrastructure/entities/platform.entity';

@Module({
  imports: [UseCasesModule,
    ControllersModule,
    TypeOrmModule.forFeature([PlatformEntity]),
    ConfigModule.forRoot({
      isGlobal: true, // để module dùng được ở mọi nơi
      envFilePath: '.env', // mặc định là .env, có thể bỏ dòng này
    }),
    RedisModule,
    RouterModule.register([
      {
        path: 'admin',
        module: AdminModule,
      },
      {
        path: 'client',
        module: ClientModule,
      },
    ]),
    AdminModule,
    ClientModule,
    FeatureToggleModule,
  ],
  controllers: [],
  providers: [JwtService,
    PermissionGuard,
    {
      provide: 'IPlatformRepository',
      useClass: PlatformRepository,
    }
  ],
  exports: [JwtService, PermissionGuard, 'IPlatformRepository'],
})
export class AppModule {}
