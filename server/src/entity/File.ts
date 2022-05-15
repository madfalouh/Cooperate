import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { GroupUser } from "./GroupUser";
import { User } from "./User";

 

 
/**
 * Initial class for one product
 * @class Activity
 */
@Entity()
export class File {
    @PrimaryGeneratedColumn("uuid")
    id: String = '';


    @Column("text")  
    name: String = '';
    @Column("text")  
    groupname: String = '';
   @Column("text")  
    file: String = '';
    @Column("text")  
    type: String = '';


}
