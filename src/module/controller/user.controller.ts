import { Body, Controller, Delete, Get, Param, Post, Put, Req} from '@nestjs/common';
import { CreateUserDto } from './dtos/user/register.dto';
import { LoginUserDto } from './dtos/user/login.dto';
import { UpdateUserDto } from './dtos/user/update.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { GetListUserDto } from './dtos/user/getlist.dto';
import { UserUseCase } from '../usecases/user.usecase';
import { ViaMailService } from '../usecases/service/viamail.service';
import { LoginViaMailDto } from './dtos/user/loginviamail.dto';
import { VerifyDto } from './dtos/user/verify.dto';
import { RequirePermissions } from '../usecases/auth/permission.decorator';

@ApiBearerAuth('access-token')
@ApiTags('Users')
@Controller('users')
    export class UsersController {
        constructor(
            private readonly userUseCase: UserUseCase,
            private readonly viaMailUseCase: ViaMailService,

        ) {}
    @RequirePermissions('view-user')
    @Get()
    async findAllUsers(dto: GetListUserDto) {
        return await this.userUseCase.findAll(dto);
    }

    @RequirePermissions('view-user')
    @Get(':id')
    async getUser(@Param('id') id: number){
        return await this.userUseCase.findById(id);
    }

    @Post('/register')
    async register(@Body() body: CreateUserDto){
        return await this.userUseCase.register(body);
    }

    @Post('/login')
    async login(@Req() req, @Body() body: LoginUserDto){
        const platform = req['platform'];
        const ip = req.ip;
        const ua = req.headers['user-agent'];
        return await this.userUseCase.login(body, ip, ua, platform);
    }

    @Post('/login-via-mail')
    async loginViaMail(@Body() body: LoginViaMailDto){
        await this.viaMailUseCase.sendOtp(body.email);
        return {message: 'OTP sent'};
    }

    @Post('/verify')
    async verify(@Req() req, @Body() body: VerifyDto){
        const platform = req['platform'];
        const ip = req.ip;
        const ua = req.headers['user-agent'];
        return await this.viaMailUseCase.verifyOtp(body.email, body.otp, ip, ua, platform);
    }

    @RequirePermissions('edit-user')
    @Put(':id')
    async updateUser(@Param('id') id: number,@Body() body: UpdateUserDto){
        return await this.userUseCase.update(id,body);
    }

    @RequirePermissions('delete-user')
    @Delete(':id')
    async delete(@Param('id') id: number) {
        return await this.userUseCase.delete(id);
    }
}