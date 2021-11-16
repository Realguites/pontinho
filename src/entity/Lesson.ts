import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  OneToOne,
  ManyToOne,
} from 'typeorm';
import Class from './Class';
import Content from './Content';
import { MaxLength } from "class-validator"
import CommonData from './CommonData';

@Entity('lesson')
export default class Lesson extends CommonData{
  

  @Column()
  @MaxLength(150, {message: "Descrição deve ter no maximo 100 caracteres"})
  description: string;

  @OneToOne(type => Content, lesson=> Lesson)
  content: Content;

  @ManyToOne(type => Class, lessons => Lesson, { eager: true})
  classe: Class;

  
}
