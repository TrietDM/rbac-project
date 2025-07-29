import { HttpException, HttpStatus, Inject } from "@nestjs/common";
import { createRoleDto } from "../controller/dtos/role/createRole.dto";
import { updateRoleDto } from "../controller/dtos/role/updateRole.dto";
import { IRoleRepository } from "../domain/repositories/roleRepository.interface";
import { RoleEntity } from "../infrastructure/entities/role.entity";
import { masterDataErrorMessage } from "../infrastructure/message/master-data";
import { IUserRepository } from "../domain/repositories/userRepository.interface";
import { IPermissionRepository } from "../domain/repositories/permissionRepository.interface";

export class RoleUseCase {
    constructor(
        @Inject('IRoleRepository')
        private readonly roleRepo: IRoleRepository,

        @Inject('IUserRepository')
        private readonly userRepo: IUserRepository,

        @Inject('IPermissionRepository')
        private readonly permissionRepo: IPermissionRepository,

    ){}

    async findAll(): Promise<RoleEntity[]>{
        return await this.roleRepo.findAll();
    }

    async create(dto: createRoleDto): Promise<RoleEntity>{
        const existingRole = await this.roleRepo.findByName(dto.name);    
        if(existingRole)
            throw new HttpException(masterDataErrorMessage.E_007(), HttpStatus.BAD_REQUEST);
        return await this.roleRepo.create(dto);
    }

    async update(id: number, dto: updateRoleDto): Promise<RoleEntity>{
        const existingRole = await this.roleRepo.findById(id);
        if(!existingRole)
            throw new HttpException(masterDataErrorMessage.E_008(),HttpStatus.NOT_FOUND)
        return await this.roleRepo.update(id, dto);
    }

    async delete(id: number): Promise<any>{
        const existingRole = await this.roleRepo.findById(id);    
        if(!existingRole)
            throw new HttpException(masterDataErrorMessage.E_008(), HttpStatus.NOT_FOUND);
        return await this.roleRepo.delete(id);
    }

    async assignPermissionToRole(id: number, permissionIds: number[] ){
        const role = await this.roleRepo.findById(id);    
        if(!role)
            throw new HttpException(masterDataErrorMessage.E_008(), HttpStatus.NOT_FOUND);
        const permissions = await this.permissionRepo.findByIds(permissionIds);
        if(!permissions.length)
            throw new HttpException(masterDataErrorMessage.E_005(),HttpStatus.NOT_FOUND);
        const existingPermissionIds = new Set((role.permissions ?? []).map(u => u.id));
        const newPermission = permissions.filter(u => !existingPermissionIds.has(u.id));
        role.permissions = [...(role.permission ?? []), ...newPermission]
        return this.roleRepo.save(role);

    }


    async assignUsersToRole(id: number, userIds: number[]) {
    const role = await this.roleRepo.findById(id);

    if (!role) {
        throw new HttpException('Role not found', HttpStatus.NOT_FOUND);
    }

    const users = await this.userRepo.findByIds(userIds);
    if (!users.length) {
        throw new HttpException('No users found', HttpStatus.NOT_FOUND);
    }

    // Tránh lỗi undefined + tránh trùng lặp
    const existingUserIds = new Set((role.users ?? []).map(u => u.id));
    const newUsers = users.filter(u => !existingUserIds.has(u.id));

    role.users = [...(role.users ?? []), ...newUsers];

    return this.roleRepo.save(role); // TypeORM sẽ tự động cập nhật bảng user_role
    }


}   