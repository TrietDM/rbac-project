import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "./user.entity";

@Entity('platform')
export class PlatformEntity{
    @PrimaryGeneratedColumn('increment')
    id: number;
        
    @Column()
    name: string;

    @Column("simple-array")
    allowedPrefixes: string[];

    @Column("simple-array")
    disabledMethods: string[];

    @ManyToMany(() => UserEntity, user => user.platforms)
    users: UserEntity[];

}