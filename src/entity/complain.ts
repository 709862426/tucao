import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class Complain {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  openid: string;

  @Column()
  content: string;

  @Column({ nullable: true })
  hotel: string;

  @Column('text', { nullable: true })
  images: string; // JSON 字符串数组，例如 '["url1","url2"]'

  @CreateDateColumn()
  createdAt: Date;
}
