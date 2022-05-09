import {Entity, Column, PrimaryGeneratedColumn, Unique, OneToMany, JoinTable} from "typeorm";
import { Activity } from "./Activity";

@Entity()
@Unique(["email"])
@Unique(["firstName", "lastName"])
export class User {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column("varchar", {nullable: false})
    email!: string;

    @Column("varchar", {nullable: false, select: false})
    private password!: string;

    @Column("varchar", {length: 300, nullable: true, select: false})
    token!: string;

    @Column("varchar", {nullable: false})
    firstName!: string;

    @Column("varchar", {nullable: false})
    lastName!: string;

    @OneToMany(() => Activity, Activities => Activities.id)
    @JoinTable()
    Activities!: Activity[];

    getPassword = (): string => {
        return this.password;
    }
}
