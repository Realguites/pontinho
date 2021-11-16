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
import { EncryptionTransformer } from 'typeorm-encrypted';


@Entity('student')
export default class Student extends CommonData {  

  @Column({
    type: "varchar",
    nullable: false,
    transformer: new EncryptionTransformer({
      //chave de 64 caracteres (256bits)
      key: 'e41c966f21f9e1577802463f8924e6a3fe3e9751f201304213b2f845d8841d61',
      //algoritmo de 256 bits
      algorithm: 'aes-256-cbc',
      //vetor de inicialização
      ivLength: 16,
      iv: 'ff5ac19190424b1d88f9419ef949ae56'
    }),
  })
  @MinLength(3, {message: "Nome precisa ter no minimo 3 caracteres"})
  @MaxLength(40, {message: "Nome precisa ter no maximo 40 caracteres"})
  name: string;

  @Column()
  @Min(1, {message: "Chave não pode ser menor que 1"})
  @Max(1000, {message: "Chave não pode ser maior que 1000"})
  key: number;

  @Column({
    type: "varchar",
    nullable: false,
    transformer: new EncryptionTransformer({
      key: 'e41c966f21f9e1577802463f8924e6a3fe3e9751f201304213b2f845d8841d61',
      algorithm: 'aes-256-cbc',
      ivLength: 16,
      iv: 'ff5ac19190424b1d88f9419ef949ae56'
    }),
  })
  @IsEmail({},{message:"E-mail inválido"})
  email: string;

  @ManyToMany(type => Class, { eager: true })
  @JoinTable()
  classes: Class[];

 
}
