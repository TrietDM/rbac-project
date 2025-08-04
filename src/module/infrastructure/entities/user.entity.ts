import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { RoleEntity } from './role.entity';
import { PlatformEntity } from './platform.entity';

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
    name: 'user_role', 
    joinColumn: { name: 'user_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'role_id', referencedColumnName: 'id' },
  })
  roles: RoleEntity[];

  @ManyToMany(() => PlatformEntity, platform => platform.users)
  @JoinTable({
    name: 'user_platform',
    joinColumn: { name: 'user_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'platform_id', referencedColumnName: 'id' },
  })
  platforms: PlatformEntity[];
}
