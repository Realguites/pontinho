import { Column, CreateDateColumn, Entity, InsertValuesMissingError, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import Lesson from "./Lesson";

@Entity()
export default class Class{
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column({
      length: 100,
      unique: true,
    })
    name: string;
  
    @Column()
    duration: number;

    @OneToMany(type => Lesson, classe => Class)
    lessons: Lesson[];
  
    @CreateDateColumn({ name: 'created_At' })
    createdAt: Date;
  
    @UpdateDateColumn({ name: 'update_At' })
    updatedAt: Date;
}