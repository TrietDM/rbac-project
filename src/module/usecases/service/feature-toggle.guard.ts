import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { FeatureToggleService } from './feature-toggle.service';
import { FEATURES_KEY } from './feature.toggle.decorator';

@Injectable()
export class FeatureToggleGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private featureService: FeatureToggleService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredFeatures = this.reflector.getAllAndOverride<string[]>(
      FEATURES_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredFeatures || requiredFeatures.length === 0) return true;

    for (const feature of requiredFeatures) {
      const isEnabled = await this.featureService.isEnabled(feature);
      if (!isEnabled) {
        throw new HttpException(
          `Tính năng "${feature}" đang bị tắt`,
          HttpStatus.FORBIDDEN,
        );
      }
    }

    return true;
  }
}
