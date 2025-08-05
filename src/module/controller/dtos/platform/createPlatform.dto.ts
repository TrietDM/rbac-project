import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreatePlatformDto {
    @ApiProperty()
    @IsString()
    name: string;

    @ApiProperty({ type: [String] })
    @IsString({ each: true })
    allowedPrefixes: string[];

    @ApiProperty({ type: [String] })
    @IsString({ each: true })
    disabledMethods: string[];
}