import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  phoneNumber: string;

  @Column({ unique: true })
  openid: string;

  @Column({ default: '' })
  nickname: string;
}
