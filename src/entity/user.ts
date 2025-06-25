import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  openid: string;

  @Column({ nullable: true })
  phoneNumber: string;

  @Column({ default: '' })
  nickname: string;

  @Column({ default: '' })
  avatarUrl: string;
}
