import {Column,PrimaryGeneratedColumn , OneToOne , JoinColumn , Entity } from "typeorm";
import {User} from "./user.entity"


@Entity({name:"profiles"})
export class Profile{

    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    firstName:string;

    @Column()
    lastName:string;

    @Column()
    email:string;

    @OneToOne(() => User, (user) => user.profile)
    @JoinColumn()
    user: User;
}

