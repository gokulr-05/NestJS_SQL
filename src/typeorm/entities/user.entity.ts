import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn  , OneToOne  , JoinColumn } from "typeorm";
import { Profile } from "./profile.entity"

@Entity({name:"users"})
export class User {

    @PrimaryGeneratedColumn()
    id: number;

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



    @OneToOne(() => Profile , (profile)=> profile.user, {cascade:true})
    @JoinColumn()
    profile: Profile;

}