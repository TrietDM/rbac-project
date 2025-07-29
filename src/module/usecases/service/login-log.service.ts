import { Inject, Injectable } from "@nestjs/common";
import { ILoginLogRepository } from "src/module/domain/repositories/login-logRepository.interface";

@Injectable()
export class LoginLogService {
  constructor(
    @Inject('ILoginLogRepository')
    private readonly loginLogRepo: ILoginLogRepository,
  ) {}

  async saveLog(userId: number, ip: string, ua: string, platform: string, success: boolean) {
    await this.loginLogRepo.saveLog(userId, ip, ua, platform, success);
  }
}
