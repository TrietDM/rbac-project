import { Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository, ILike, In } from 'typeorm';

import { IPermissionRepository } from '../../domain/repositories/permissionRepository.interface';
import { createPermissionDto } from '../../controller/dtos/permission/createPermission.dto';
import { updatePermissionDto } from '../../controller/dtos/permission/updatePermission.dto';
import { PermissionEntity } from '../entities/permission.entity';

@Injectable()
export class PermissionRepository implements IPermissionRepository {
  constructor(
    @InjectRepository(PermissionEntity)
    private permissionRepo: Repository<PermissionEntity>,
    @InjectDataSource()
    private _dataSource: DataSource,
  ) {}


  async findAll(): Promise<PermissionEntity[]>{
    return await this.permissionRepo.find();
  }

  async create(dto: createPermissionDto): Promise<PermissionEntity>{
      const newPermission = this.permissionRepo.create({
        ...dto
      });
      return await this.permissionRepo.save(newPermission);
  }

  async update(id: number, dto: updatePermissionDto): Promise<PermissionEntity> {
      const permission = await this.permissionRepo.findOne({where: {id: id}});
      const update = {...permission,  ...dto};
      return await this.permissionRepo.save(update);
  }


  async delete(id: number): Promise<void> {
    await this.permissionRepo.delete(id);
  }

  async findById(id: number): Promise<any> {
    return await this.permissionRepo.findOne({
      where :{id}
    });
  }
  async findByName(name: string): Promise<any> {
    return await this.permissionRepo.findOne({
      where :{name}
    });
  }
  async findByIds(ids: number[]): Promise<any>{
      return this.permissionRepo.find({
        where : { id: In (ids)} ,       
      });
    }
}
 