import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity() 
export class Position { 
    @PrimaryGeneratedColumn()
    id!:number;

    @Column() 
    PositionName!:string;

    @Column() 
    Description!:string


 
}