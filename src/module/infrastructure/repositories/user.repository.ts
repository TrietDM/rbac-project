import { Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository, ILike } from 'typeorm';
import { IUserRepository } from '../../domain/repositories/userRepository.interface';
import * as dayjs from 'dayjs';
import * as utc from 'dayjs/plugin/utc';
import * as timezone from 'dayjs/plugin/timezone';
import { UserEntity } from '../entities/user.entity';
import { UpdateUserDto } from '../../controller/dtos/user/update.dto';
import { GetListUserDto } from '../../controller/dtos/user/getlist.dto';
import { In } from 'typeorm';
dayjs.extend(utc);
dayjs.extend(timezone);

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private userRepo: Repository<UserEntity>,
    @InjectDataSource()
    private _dataSource: DataSource,
  ) {}


  async findAll(dto: GetListUserDto): Promise<UserEntity[]> {
    let queryBuilder = this.userRepo.createQueryBuilder('u')
      .orderBy('u.create_at', 'DESC');

    if (dto) {
      queryBuilder.andWhere(
        `(u.username ILIKE :search OR u.email ILIKE :search OR u.full_name ILIKE :search OR u.code ILIKE :search)`,
        { search: `%${dto}%` }
      );
    }

    return await queryBuilder.getMany();
  }

  async findById(id: number): Promise<any>{
    return await this.userRepo.findOne({
      where :{id: id}    
    });
  }


  async updateUser(id: number,dto: UpdateUserDto): Promise<UserEntity>{
    const user = await this.userRepo.findOne({
      where :{id: id}
    });
    
    const updatedUser = { ...user, ...dto };
    return await this.userRepo.save(updatedUser);
  }


  async delete(id: number): Promise<void> {
    await this.userRepo.delete(id);
  }

  async saveUser(data: Partial<UserEntity>): Promise<UserEntity> {
    const entity = this.userRepo.create(data);
    return await this.userRepo.save(entity);
  }

  async findByEmail(email: string): Promise<any>{
    return this.userRepo.findOne({
      where : { email} ,  
      relations: ['roles', 'roles.permissions']     
    });
  }

  async findByName(username: string): Promise<any>{
    return this.userRepo.findOne({
      where : { username} ,
      relations: ['roles', 'roles.permissions']       
    });
  }

}