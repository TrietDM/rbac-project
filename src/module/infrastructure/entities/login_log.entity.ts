import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('login_logs')
export class LoginLogEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  ipAddress: string;

  @Column()
  userAgent: string;

  @Column({ default: true })
  success: boolean;

  @Column()
  platform: string;

  @CreateDateColumn()
  createdAt: Date;
}
