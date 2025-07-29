import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, ManyToMany, JoinTable } from 'typeorm';
import { PermissionEntity } from './permission.entity';
import { UserEntity } from './user.entity';
@Entity('role')
export class RoleEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({type: 'varchar', length: 50})
    name: string;

    @ManyToMany(() => PermissionEntity, permission => permission.roles, { cascade: true })
    @JoinTable({
        name: 'role_permission', // tên bảng trung gian
        joinColumn: { name: 'role_id', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'permission_id', referencedColumnName: 'id' },
    })
    permissions: PermissionEntity[];

    @ManyToMany(() => UserEntity, user => user.roles)
    users: UserEntity[];
}