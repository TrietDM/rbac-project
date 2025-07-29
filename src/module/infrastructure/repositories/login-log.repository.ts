// infrastructure/repositories/login-log.repository.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ILoginLogRepository } from 'src/module/domain/repositories/login-logRepository.interface';
import { LoginLogEntity } from '../entities/login_log.entity';

@Injectable()
export class LoginLogRepository implements ILoginLogRepository {
  constructor(
    @InjectRepository(LoginLogEntity)
    private readonly repo: Repository<LoginLogEntity>,
  ) {}

  async saveLog(userId: number, ip: string, ua: string, platform: string, success: boolean): Promise<void> {
    const log = this.repo.create({ userId, ipAddress: ip, userAgent: ua, platform, success });
    await this.repo.save(log);
  }
}
