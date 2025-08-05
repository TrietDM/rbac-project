import { GetListUserDto } from "../../controller/dtos/user/getlist.dto";
import { UpdateUserDto } from "../../controller/dtos/user/update.dto";
import { UserEntity } from "../../infrastructure/entities/user.entity";

export interface IUserRepository {
  findAll(dto: GetListUserDto): Promise<UserEntity[]>;
  findById(id: number): Promise<any>;
  updateUser(id: number, dto: UpdateUserDto): Promise<UserEntity>;
  delete(id: number): Promise<void>;
  saveUser(data: Partial<UserEntity>): Promise<UserEntity>
  findByName(username: string): Promise<any>;
  findByEmail(email: string): Promise<any>;
}
