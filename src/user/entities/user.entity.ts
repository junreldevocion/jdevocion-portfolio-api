import { EmploymentHistory } from 'src/employment-history/entities/employment-history.entity';
import { Project } from 'src/project/entities/project.entity';
import { Techstack } from 'src/techstack/entities/techstack.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
}

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

  @OneToMany(() => EmploymentHistory, (history) => history.user)
  employmentHistories: EmploymentHistory[];

  @OneToMany(() => Techstack, (stack) => stack.createdBy)
  createdStacks: Techstack[];

  @Column({ type: 'enum', enum: UserRole, default: UserRole.USER })
  role: UserRole;
}
