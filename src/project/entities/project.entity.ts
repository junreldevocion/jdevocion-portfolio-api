import { Techstack } from 'src/techstack/entities/techstack.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  JoinTable,
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

  @Column()
  imageUrl: string;

  @OneToMany(() => Techstack, (techstack) => techstack.projects, {
    cascade: true,
    eager: true,
  })
  @JoinTable()
  techStacks: Techstack[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
