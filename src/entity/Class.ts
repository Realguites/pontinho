import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import Lesson from "./Lesson";
import { Max, MaxLength, Min, MinLength } from "class-validator"
import CommonData from "./CommonData";
import { EncryptionTransformer } from "typeorm-encrypted";

@Entity()
export default class Class extends CommonData {  

  @Column({
    type: "varchar",
    nullable: false,
    transformer: new EncryptionTransformer({
      key: 'e41c966f21f9e1577802463f8924e6a3fe3e9751f201304213b2f845d8841d61',
      algorithm: 'aes-256-cbc',
      ivLength: 16,
      iv: 'ff5ac19190424b1d88f9419ef949ae56'
    }),
    length: 100,
    unique: true,
  })
  @MinLength(3, { message: "Nome não pode ter menos que 3 caracteres" })
  @MaxLength(100, { message: "Nome não pode ter mais que 30 caracteres" })
  name: string;

  @Column()
  @Min(1, { message: "Duração não pode ter menos que 1 hora" })
  @Max(150, { message: "Duração não pode ter mais que 150 horas" })
  duration: number;

  //@Column()
  //@Min(1, { message: "Sala de aula não pode ser menor que 1" })
  //@Max(20, { message: "Sala de aula não pode ser maior que 20" })
  //room: number

  @OneToMany(type => Lesson, classe => Class)
  lessons: Lesson[];

 
}