import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { User } from "./User";

 

 
/**
 * Initial class for one product
 * @class Activity
 */
@Entity()
export class Activity {
    @PrimaryGeneratedColumn("uuid")
    id: String = '';


    @Column("text")  
    description: String = '';


  @Column("text")
    userId: String='';

@Column("text")
    SenderName: String='';

}
