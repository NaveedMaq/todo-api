import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Priority } from '../enum/Priority';
import { Status } from '../enum/Status';

@Entity()
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'text',
  })
  title: string;

  @Column({
    type: 'varchar',
    length: 256,
  })
  date: string;

  @Column({
    type: 'longtext',
  })
  description: string;

  @Column({
    type: 'enum',
    enum: Priority,
    default: Priority.NORMAL,
  })
  priority: Priority;

  @Column({
    type: 'enum',
    enum: Status,
    default: Status.TODO,
  })
  status: Status;
}
