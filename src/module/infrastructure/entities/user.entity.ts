import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { RoleEntity } from './role.entity';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', length: 20 })
  username: string;

  @Column({ type: 'varchar', length: 250 })
  password: string;

  @Column({ type: 'varchar', length: 250 })
  full_name: string;

  @Column({ type: 'varchar', length: 250 })
  email: string;

  @Column({ type: 'varchar', length: 50, nullable: true})
  phone_num: string;

  @Column({ type: 'bool', default: true})
  is_active: boolean;

  @CreateDateColumn({ type: 'timestamp'})
  create_at: Date;

  @ManyToMany(() => RoleEntity, role => role.users)
  @JoinTable({
    name: 'user_role', // tên bảng trung gian
    joinColumn: { name: 'user_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'role_id', referencedColumnName: 'id' },
  })
  roles: RoleEntity[];


}
