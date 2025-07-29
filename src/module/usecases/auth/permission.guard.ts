// guards/permission.guard.ts
import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PERMISSIONS_KEY } from './permission.decorator';
import { masterDataErrorMessage } from 'src/module/infrastructure/message/master-data';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredPermissions = this.reflector.getAllAndOverride<string[]>(
      PERMISSIONS_KEY,
      [context.getHandler(), context.getClass()]
    );

    if (!requiredPermissions) return true;

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    const platform = request['platform'];
    const userPermissions: string[] = user?.permission ?? [];
    if (platform === 'client'  &&['DELETE'].includes(request.method)) {
        throw new HttpException(masterDataErrorMessage.E_009(), HttpStatus.FORBIDDEN);
      }
    // Super admin shortcut
    if (user?.isSuperAdmin){
       return true;
    }
    if (platform === 'admin') {
      const hasPermission = requiredPermissions.every(p =>
        userPermissions.includes(p),
      );

      if (!hasPermission) {
        throw new HttpException(masterDataErrorMessage.E_010(),HttpStatus.FORBIDDEN);
      }

      return true;
    }

    
    const allowedPrefixes = ['view-', 'create-', 'edit-'];

    if (platform === 'client') {

      // Chỉ cho gọi các API có permission prefix phù hợp
      const isAllAllowed = requiredPermissions.every(p =>
        allowedPrefixes.some((prefix) => p.startsWith(prefix)),
      );
      const hasPermissions = requiredPermissions.every(p =>
        userPermissions.includes(p),
      );

      if (!isAllAllowed || !hasPermissions) {
        throw new HttpException(masterDataErrorMessage.E_010(), HttpStatus.FORBIDDEN);
      }

      return true;
    }

    return requiredPermissions.every(p => userPermissions.includes(p));
  }
}
