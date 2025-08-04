import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PERMISSIONS_KEY } from './permission.decorator';
import { masterDataErrorMessage } from 'src/module/infrastructure/message/master-data';
import { IPlatformRepository } from 'src/module/domain/repositories/platformRepository.interface';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(
    private reflector: Reflector,

    @Inject('IPlatformRepository')
    private platformRepo: IPlatformRepository,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredPermissions = this.reflector.getAllAndOverride<string[]>(
      PERMISSIONS_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredPermissions) return true;

    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const platform = request['platform'];

    const platformConfig = await this.platformRepo.findByName(platform);
    if (!platformConfig) {
      throw new HttpException('Platform không tồn tại', HttpStatus.FORBIDDEN);
    }

    const userPlatforms: string[] = user.platforms?.map(p => p.name) ?? [];
    if (!userPlatforms.includes(platform)) {
      throw new HttpException('User không có quyền truy cập platform này', HttpStatus.FORBIDDEN);
    }

    const disabledMethods: string[] = platformConfig.disabledMethods || [];
    if (disabledMethods.includes(request.method)) {
      throw new HttpException(masterDataErrorMessage.E_009(), HttpStatus.FORBIDDEN);
    }

    if (user?.isSuperAdmin) return true;

    const userPermissions: string[] = user.permission ?? [];

    const allowedPrefixes: string[] = platformConfig.allowedPrefixes ?? [];
    const hasValidPrefix = requiredPermissions.every(p =>
      allowedPrefixes.length === 0 || allowedPrefixes.some(prefix => p.startsWith(prefix)),
    );

    const hasAllPermissions = requiredPermissions.every(p =>
      userPermissions.includes(p),
    );

    if (!hasValidPrefix || !hasAllPermissions) {
      throw new HttpException(masterDataErrorMessage.E_010(), HttpStatus.FORBIDDEN);
    }

    return true;
  }
}
