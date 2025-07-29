// common/middleware/platform.middleware.ts
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class PlatformMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const url = req.originalUrl;

    if (url.startsWith('/admin')) {
      req['platform'] = 'admin';
    } else if (url.startsWith('/client')) {
      req['platform'] = 'client';
    } else {
      req['platform'] = 'unknown';
    }

    next();
  }
}
