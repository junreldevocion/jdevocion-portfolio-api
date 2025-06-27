import { EmploymentHistory } from 'src/employment-history/entities/employment-history.entity';
import { Project } from 'src/project/entities/project.entity';
import { Techstack } from 'src/techstack/entities/techstack.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @OneToMany(() => Project, (project) => project.user)
  projects: Project[];

  @OneToMany(
    () => EmploymentHistory,
    (employmentHistory) => employmentHistory.user,
  )
  employmentHistory: EmploymentHistory[];

  @OneToMany(() => Techstack, (stack) => stack.createdBy)
  createdStacks: Techstack[];
}
