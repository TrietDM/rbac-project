export interface ILoginLogRepository {
  saveLog(userId: number, ip: string, ua: string, platform: string, success: boolean): Promise<void>;
}
