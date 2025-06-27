import { Techstack } from 'src/techstack/entities/techstack.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

export class EmploymentHistory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  company: string;

  @Column()
  position: string;

  @Column({ type: 'date' })
  startDate: string;

  @Column({ type: 'date', nullable: true })
  endDate: string;

  @Column({ default: false })
  isCurrent: boolean;

  @Column({ nullable: true })
  description: string;

  @ManyToMany(() => Techstack, { cascade: true })
  @JoinTable()
  techstacks: Techstack[];

  @ManyToOne(() => User, (user) => user.employmentHistory)
  @JoinTable()
  user: User;
}
