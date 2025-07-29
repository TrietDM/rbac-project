import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, ManyToMany } from 'typeorm';
import { RoleEntity } from './role.entity';
@Entity('permission')
export class PermissionEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({type: 'varchar', length: 50})
    name: string;

    @ManyToMany(() => RoleEntity, role => role.permissions)
    roles: RoleEntity[];

}