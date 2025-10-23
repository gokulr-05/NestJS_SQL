import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn     } from "typeorm";

@Entity({name:"users"})
export class User {

    @PrimaryGeneratedColumn()
    id: string;

    @Column({unique:true})
    username:string;

    @Column()
    password:string;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date;

    @Column({nullable:true})
    authStrategy?: string;


}