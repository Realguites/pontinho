import { MinLength } from 'class-validator';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import CommonData from './CommonData';
import Lesson from './Lesson';

@Entity('content')
export default class Content extends CommonData{
 

  @OneToOne(type => Lesson, content => Content, { eager: true, cascade: true}) //cascade cria objeto caso ñ encontre id
  @JoinColumn()
  lesson: Lesson;

  @Column()
  @MinLength(5,{message:"Descrição não pode ter menos que 5 caracteres"})  
  description: string;

  @Column()
  @MinLength(5,{message:"Campo não pode ter menos que 5 caracteres"}) 
  linkContent: string;
}
