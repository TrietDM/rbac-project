import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import Redis from 'ioredis';
import * as nodemailer from 'nodemailer';
import { JwtService } from '@nestjs/jwt';
import { IUserRepository } from "../../domain/repositories/userRepository.interface";
import { masterDataErrorMessage } from 'src/module/infrastructure/message/master-data';
import { LoginLogService } from './login-log.service';
import { PermissionUseCase } from '../permission.usecases';


@Injectable()
export class ViaMailService {
  private transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  constructor(
    @Inject('REDIS_CLIENT') private readonly redisClient: Redis,
    @Inject('IUserRepository')
    private readonly userRepo: IUserRepository,
    private readonly permissionUsecase: PermissionUseCase,
    private readonly jwtService: JwtService,
    private readonly loginLogService: LoginLogService,
  ) {}

  async sendOtp(email: string) {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    await this.redisClient.set(`otp:${email}`, otp, 'EX', 100);

    await this.transporter.sendMail({
      from: process.env.MAIL_USER,
      to: email,
      subject: 'Your OTP Code',
      text: `Your OTP is: ${otp}`,
    });
  }

  async verifyOtp(email: string, otp: string, ip: string, ua: string, platform: string) {
    const saved = await this.redisClient.get(`otp:${email}`);
    if (!saved || saved !== otp) {
      throw new HttpException(masterDataErrorMessage.E_006(),HttpStatus.BAD_REQUEST)
    }
    const user = await this.userRepo.findByEmail(email)


    const isSuperAdmin = user.roles?.some(role => role.name === 'SuperAdmin') ?? false;
    const rolePermissions = user.roles
      ?.flatMap(role => role.permissions
      .map(p => p.name) ?? []) ?? [];
    const fullPermissions = await this.permissionUsecase.resolvePermissions(rolePermissions);
    const roles = user?.roles?.map(f => f.name) ?? [];
    const payload = {
          sub: user.id,
          username: user.username,
          role: roles,
          permission: fullPermissions,
          isSuperAdmin
        };;
    const accessToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: '15m',
    });
    await this.redisClient.del(`otp:${email}`);
    await this.loginLogService.saveLog(user.id, ip, ua, platform, true);
    return {accessToken};
  }
}
