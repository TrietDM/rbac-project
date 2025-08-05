import { HttpException, HttpStatus, Inject } from "@nestjs/common";
import { CreatePlatformDto } from "../controller/dtos/platform/createPlatform.dto";
import { UpdatePlatformDto } from "../controller/dtos/platform/updatePlatform.dto";
import { IPlatformRepository } from "../domain/repositories/platformRepository.interface";
import { PlatformEntity } from "../infrastructure/entities/platform.entity";
import { masterDataErrorMessage } from "../infrastructure/message/master-data";
import { AssignPlatformDto } from "../controller/dtos/platform/assignPlatform.dto";
import { IUserRepository } from "../domain/repositories/userRepository.interface";

export class PlatformUseCase {
    constructor(
        @Inject('IPlatformRepository')
        private readonly platformRepo: IPlatformRepository,
        @Inject('IUserRepository')
        private readonly userRepo: IUserRepository, // Assuming you have a user repository
    ){}

    async findAll(): Promise<PlatformEntity[]>{
        return await this.platformRepo.findAll();
    }

    async create(dto: CreatePlatformDto): Promise<PlatformEntity>{
        const existingPlatform = await this.platformRepo.findByName(dto.name);    
        if(existingPlatform)
            throw new HttpException(masterDataErrorMessage.E_012(), HttpStatus.BAD_REQUEST);
        return await this.platformRepo.createPlatform(dto);
    }

    async update(id: number, dto: UpdatePlatformDto): Promise<PlatformEntity>{
        const existingPlatform = await this.platformRepo.findById(id);
        if(!existingPlatform)
            throw new HttpException(masterDataErrorMessage.E_011(),HttpStatus.NOT_FOUND)
        return await this.platformRepo.updatePlatform(id, dto);
    }

    async delete(id: number): Promise<any>{
        const existingPlatform = await this.platformRepo.findById(id);    
        if(!existingPlatform)
            throw new HttpException(masterDataErrorMessage.E_011(), HttpStatus.NOT_FOUND);
        return await this.platformRepo.deletePlatform(id);
    }

    async assignUserToPlatform(dto: AssignPlatformDto): Promise<PlatformEntity> {
        const platform = await this.platformRepo.findById(dto.platformId);
        if (!platform) {
            throw new HttpException(masterDataErrorMessage.E_011(), HttpStatus.NOT_FOUND);
        }
        const existingUser = await this.userRepo.findById(dto.userId);
        if (!existingUser) {
            throw new HttpException(masterDataErrorMessage.E_002(), HttpStatus.NOT_FOUND);
        }
        const user = platform.users.find(user => user.id === dto.userId);
        if (user) {
            throw new HttpException(masterDataErrorMessage.E_013(), HttpStatus.BAD_REQUEST);
        }
        platform.users.push({ id: dto.userId } as any); 
        return await this.platformRepo.save(platform);
    }


}   