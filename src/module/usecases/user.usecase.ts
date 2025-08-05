import { HttpException, HttpStatus, Inject } from "@nestjs/common";
import { IUserRepository } from "../domain/repositories/userRepository.interface";
import { UserEntity } from "../infrastructure/entities/user.entity";
import { masterDataErrorMessage } from "../infrastructure/message/master-data";
import { LoginUserDto } from "../controller/dtos/user/login.dto";
import * as bcrypt from 'bcryptjs';
import { CreateUserDto } from "../controller/dtos/user/register.dto";
import { UpdateUserDto } from "../controller/dtos/user/update.dto";
import { JwtService } from "@nestjs/jwt";
import { GetListUserDto } from "../controller/dtos/user/getlist.dto";
import { LoginLogService } from "./service/login-log.service";
import { PermissionUseCase } from "./permission.usecases";


export class UserUseCase {
    constructor(
        @Inject('IUserRepository')
        private readonly userRepo: IUserRepository,
        
        private readonly permissionUsecase: PermissionUseCase, 
        private readonly jwtService: JwtService,
        private readonly loginLogService: LoginLogService,
    ){}

    async findAll(dto: GetListUserDto): Promise<UserEntity[]>{
        return await this.userRepo.findAll(dto);
    }

    async findById(id: number): Promise<UserEntity>{
        const existingUser = await this.userRepo.findById(id);
        if(!existingUser)
            throw new HttpException(masterDataErrorMessage.E_002(),HttpStatus.NOT_FOUND)
        return existingUser;
    }

    async register(dto: CreateUserDto): Promise<UserEntity> {
        const checkUsername = await this.userRepo.findByName(dto.username);
        const checkEmail = await this.userRepo.findByEmail(dto.email);
        if(checkUsername)
          throw new HttpException(masterDataErrorMessage.E_001(),HttpStatus.BAD_REQUEST)
        if(checkEmail)
          throw new HttpException(masterDataErrorMessage.E_003(),HttpStatus.BAD_REQUEST)
    
        const hashPassword = await bcrypt.hash(dto.password,10);
    
        
        const newUser = await this.userRepo.saveUser({
        ...dto,
        password: hashPassword,
        });
    
        return newUser;
      }

    async login(dto: LoginUserDto, ip: string, ua: string, platform: string): Promise<{ accessToken: string, refreshToken: string }> {
        const user = await this.userRepo.findByName(dto.username);
        if (!user) {
          throw new HttpException(masterDataErrorMessage.E_002(),HttpStatus.NOT_FOUND)
        }
    
        const isMatch = await bcrypt.compare(dto.password, user.password);
        if (!isMatch) {
          throw new Error('Invalid credentials');
        }
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
        };
        console.log('Payload', payload);
    
        const accessToken = this.jwtService.sign(payload, {
          secret: process.env.JWT_SECRET,
          expiresIn: '15m',
        });
    
        const refreshToken = this.jwtService.sign(payload, {
          secret: process.env.JWT_REFRESH_TOKEN_SECRET,
          expiresIn: '7d',
        });
        await this.loginLogService.saveLog(user.id, ip, ua, platform, true);

    
        return { accessToken, refreshToken };
      }

    async update(id: number, dto: UpdateUserDto): Promise<UserEntity>{
        const existingUser = await this.userRepo.findById(id);
        if(!existingUser)
            throw new HttpException(masterDataErrorMessage.E_002(),HttpStatus.NOT_FOUND)
        return await this.userRepo.updateUser(id, dto);
    }

    async delete(id: number): Promise<any>{
        const existingUser = await this.userRepo.findById(id);    
        if(!existingUser)
            throw new HttpException(masterDataErrorMessage.E_002(), HttpStatus.NOT_FOUND);
        return await this.userRepo.delete(id);
    }
}   