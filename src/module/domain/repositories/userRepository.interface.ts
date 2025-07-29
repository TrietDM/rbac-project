import { getListUserDto } from "../../controller/dtos/user/getlist.dto";
import { updateUserDto } from "../../controller/dtos/user/update.dto";
import { UserEntity } from "../../infrastructure/entities/user.entity";

export interface IUserRepository {
  findAll(dto: getListUserDto): Promise<UserEntity[]>;
  findById(id: number): Promise<any>;
  findByIds(ids: number[]): Promise<any>;
  updateUser(id: number, dto: updateUserDto): Promise<UserEntity>;
  delete(id: number): Promise<void>;
  saveUser(data: Partial<UserEntity>): Promise<UserEntity>
  findByName(username: string): Promise<any>;
  findByEmail(email: string): Promise<any>;
}
