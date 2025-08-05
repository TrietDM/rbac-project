import { HttpException, HttpStatus, Inject } from "@nestjs/common";
import { CreateRoleDto } from "../controller/dtos/role/createRole.dto";
import { UpdateRoleDto } from "../controller/dtos/role/updateRole.dto";
import { IRoleRepository } from "../domain/repositories/roleRepository.interface";
import { RoleEntity } from "../infrastructure/entities/role.entity";
import { masterDataErrorMessage } from "../infrastructure/message/master-data";
import { IUserRepository } from "../domain/repositories/userRepository.interface";
import { IPermissionRepository } from "../domain/repositories/permissionRepository.interface";
import { AssignRoleDto } from "../controller/dtos/role/assignRole.dto";
import { AssignPermissionDto } from "../controller/dtos/role/assignPermission.dto";

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

    async create(dto: CreateRoleDto): Promise<RoleEntity>{
        const existingRole = await this.roleRepo.findByName(dto.name);    
        if(existingRole)
            throw new HttpException(masterDataErrorMessage.E_007(), HttpStatus.BAD_REQUEST);
        return await this.roleRepo.create(dto);
    }

    async update(id: number, dto: UpdateRoleDto): Promise<RoleEntity>{
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

    async assignPermissionToRole(dto: AssignPermissionDto): Promise<RoleEntity> {
        const role = await this.roleRepo.findById(dto.roleId);    
        if(!role)
            throw new HttpException(masterDataErrorMessage.E_008(), HttpStatus.NOT_FOUND);
        const permissions = await this.permissionRepo.findById(dto.permissionId);
        if(!permissions.length)
            throw new HttpException(masterDataErrorMessage.E_005(),HttpStatus.NOT_FOUND);

        const permission = role.permission.find(p => p.id === dto.permissionId);
        if (permission) {
            throw new HttpException(masterDataErrorMessage.E_014, HttpStatus.BAD_REQUEST);
        }

        role.permissions.push({ id: dto.permissionId } as any);
        return this.roleRepo.save(role);

    }


    async assignUsersToRole(dto: AssignRoleDto): Promise<RoleEntity> {
    const role = await this.roleRepo.findById(dto.roleId);

    if (!role) {
        throw new HttpException(masterDataErrorMessage.E_008, HttpStatus.NOT_FOUND);
    }

    const existingUser = await this.userRepo.findById(dto.userId);
    if (!existingUser   ) {
        throw new HttpException(masterDataErrorMessage.E_002, HttpStatus.NOT_FOUND);
    }

    const user = role.users.find(user => user.id === dto.userId);
    if (user) {
        throw new HttpException(masterDataErrorMessage.E_014, HttpStatus.BAD_REQUEST);
    }

    role.users.push({ id: dto.userId } as any); 

    return this.roleRepo.save(role);
    }


}   