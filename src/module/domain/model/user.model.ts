import { UserEntity } from "../../infrastructure/entities/user.entity";

export class UserListViewModel{
    id: number;
    username: string;
    password: string;
    job: string;
    constructor(entity: UserEntity) {
    this.id = entity.id;
    this.username = entity.username;
    this.password = entity.password;
  }

}