import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UseCasesModule } from './module/usecases/usecase.module';
import { ControllersModule } from './module/controller/controllers.module';
import { JwtService } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { PermissionGuard } from './module/usecases/auth/permission.guard';
import { RedisModule } from './module/redis.module';
import { PlatformMiddleware } from './shared/middleware/platform.middleware';
import { RouterModule } from '@nestjs/core';
import { AdminModule } from './module/admin.module';
import { ClientModule } from './module/client.module';

@Module({
  imports: [UseCasesModule,
    ControllersModule,
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
  ],
  controllers: [],
  providers: [JwtService,
    PermissionGuard,
  ],
})
export class AppModule {}
