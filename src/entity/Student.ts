import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { IsEmail, Max, MaxLength, Min, MinLength } from "class-validator"
import Class from './Class';
import CommonData from './CommonData';


@Entity('student')
export default class Student extends CommonData {  

  @Column()
  @MinLength(3, {message: "Nome precisa ter no minimo 3 caracteres"})
  @MaxLength(40, {message: "Nome precisa ter no maximo 40 caracteres"})
  name: string;

  @Column()
  @Min(1, {message: "Chave não pode ser menor que 1"})
  @Max(1000, {message: "Chave não pode ser maior que 1000"})
  key: number;

  @Column()
  @IsEmail({},{message:"E-mail inválido"})
  email: string;

  @ManyToMany(type => Class, { eager: true })
  @JoinTable()
  classes: Class[];

 
}
