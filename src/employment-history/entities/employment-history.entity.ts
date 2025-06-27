import { Techstack } from 'src/techstack/entities/techstack.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
@Entity()
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

  @ManyToOne(() => User, (user) => user.employmentHistories)
  @JoinTable()
  user: User;
}
