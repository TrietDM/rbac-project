import { HttpException, HttpStatus, Inject } from "@nestjs/common";
import { createPermissionDto } from "../controller/dtos/permission/createPermission.dto";
import { updatePermissionDto } from "../controller/dtos/permission/updatePermission.dto";
import { IPermissionRepository } from "../domain/repositories/permissionRepository.interface";
import { PermissionEntity } from "../infrastructure/entities/permission.entity";
import { masterDataErrorMessage } from "../infrastructure/message/master-data";

export class PermissionUseCase {
    constructor(
        @Inject('IPermissionRepository')
        private readonly permissionRepo: IPermissionRepository
    ){}

    async findAll(): Promise<PermissionEntity[]>{
        return await this.permissionRepo.findAll();
    }

    async create(dto: createPermissionDto): Promise<PermissionEntity>{
        const existingPermission = await this.permissionRepo.findByName(dto.name);    
        if(existingPermission)
            throw new HttpException(masterDataErrorMessage.E_004(), HttpStatus.BAD_REQUEST);
        return await this.permissionRepo.create(dto);
    }

    async update(id: number, dto: updatePermissionDto): Promise<PermissionEntity>{
        const existingPermission = await this.permissionRepo.findById(id);
        if(!existingPermission)
            throw new HttpException(masterDataErrorMessage.E_005(),HttpStatus.NOT_FOUND)
        return await this.permissionRepo.update(id, dto);
    }

    async delete(id: number): Promise<any>{
        const existingPermission = await this.permissionRepo.findById(id);    
        if(!existingPermission)
            throw new HttpException(masterDataErrorMessage.E_005(), HttpStatus.NOT_FOUND);
        return await this.permissionRepo.delete(id);
    }

    async resolvePermissions(inputPermissions: string[]): Promise<string[]> {
        const allPermissions = await this.permissionRepo.findAll(); 
        const resolved = new Set<string>(inputPermissions); // Dùng Set để tránh trùng

        for (const permission of inputPermissions) {
            if (permission.startsWith('manage-')) {
                const suffix = permission.replace('manage-', ''); 

                for (const perm of allPermissions) {
                    if (
                        perm.name !== permission &&
                        perm.name.endsWith(`-${suffix}`) 
                    ) {
                        resolved.add(perm.name);
                    }
                }
            }
        }

        return Array.from(resolved);
    }

}   