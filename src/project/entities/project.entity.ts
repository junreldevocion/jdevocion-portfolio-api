import { Techstack } from 'src/techstack/entities/techstack.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  JoinTable,
  ManyToOne,
} from 'typeorm';

@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column('text')
  description: string;

  @Column({ nullable: true })
  githubUrl: string;

  @Column({ nullable: true })
  liveDemoUrl: string;

  @Column({ nullable: true })
  imageUrl: string;

  @OneToMany(() => Techstack, (techstack) => techstack.projects, {
    cascade: true,
    eager: true,
  })
  @JoinTable()
  techStacks: Techstack[];

  @ManyToOne(() => User, (user) => user.projects, { eager: false })
  user: User;

  @Column()
  userId: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
