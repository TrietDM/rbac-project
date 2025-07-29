import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, Length } from "class-validator";

export class VerifyDto{
    @ApiProperty()
    @IsEmail()
    email: string;

    @ApiProperty()
    @Length(6,6)
    otp: string;
}