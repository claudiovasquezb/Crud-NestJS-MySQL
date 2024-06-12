import { Owner } from 'src/owner/entities/owner.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Pet {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => Owner, (owner) => owner.id, {
    eager: true, // Para que traiga los dueños  al hacer un findOne
  })
  owner: Owner;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @CreateDateColumn({ name: 'updated' })
  updatedAt: string;
}
