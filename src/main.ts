import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { PlatformMiddleware } from './shared/middleware/platform.middleware';
import { AdminModule } from './module/usecases/modules/admin.module';
import { ClientModule } from './module/usecases/modules/client.module';
import { JwtAuthGuard } from './module/usecases/auth/jwt-auth.guard';
import { JwtService } from '@nestjs/jwt';
import { PermissionGuard } from './module/usecases/auth/permission.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(new PlatformMiddleware().use);

  const config = new DocumentBuilder()
    .setTitle('My API')
    .setDescription('The API documentation')
    .setVersion('1.0')
    .addBearerAuth(
      {
        description: `Enter JWT token like: Bearer <token>`,
      name: 'Authorization',
      bearerFormat: 'Bearer',
      scheme: 'Bearer',
      type: 'http',
      in: 'header',
    },
    'access-token', // 👈 đặt tên khác với 'Authorization' để match sau
  )
    .build();

  const publicRoutes = [
    { method: 'POST', path: '/admin/users/login' },
    { method: 'POST', path: '/admin/users/register' },
    { method: 'POST', path: '/admin/users/login-via-mail' },
    { method: 'POST', path: '/admin/uses/verify' },
    { method: 'POST', path: '/client/users/login' },
    { method: 'POST', path: '/client/users/register' },
    { method: 'POST', path: '/client/users/login-via-mail' },
    { method: 'POST', path: '/client/uses/verify' },

  ];

  const jwtService = app.get(JwtService);
  const reflector = app.get(Reflector);
  app.useGlobalGuards(new JwtAuthGuard(reflector, jwtService, publicRoutes),
  app.get(PermissionGuard),
  );

  const adminDoc = SwaggerModule.createDocument(app, config, {
  include: [AdminModule],
  });
  SwaggerModule.setup('swagger/admin', app, adminDoc);

  // Swagger cho client
  const clientDoc = SwaggerModule.createDocument(app, config, {
    include: [ClientModule],
  });
  SwaggerModule.setup('swagger/client', app, clientDoc);
  await app.listen(process.env.PORT ?? 3000);

}
bootstrap();
