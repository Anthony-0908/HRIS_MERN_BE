// src/entity/User.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  employeeId!:string

  @Column()
  name!: string;

  @Column()
  email!: string;

  @Column()
  password!:string;

  @Column()
  address!:string;

  @Column() 
  contactNumber!:number;

  @Column()
  position!:number

  @Column() 
  department!:number

  @Column()
  salaryGrade!:number



}
