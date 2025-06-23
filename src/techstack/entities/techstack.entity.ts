import { Project } from 'src/project/entities/project.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class Techstack {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => Project, (projects) => projects.techStacks, {
    onDelete: 'CASCADE',
  })
  projects: Project[];
}
