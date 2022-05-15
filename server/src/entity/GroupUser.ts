import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, JoinColumn } from "typeorm";
import { User } from "./User";
import { Message} from "./Message";
/**
 * Initial class for one message
 * @class message
 */
@Entity()
export class GroupUser {
    @PrimaryGeneratedColumn("uuid")
    id: String = '';
    @Column("text")
    groupname: String = '';
    @ManyToOne(() => User, user => user.id, {
        eager: true
    })
    @JoinColumn()
    responsable!: User;
  @ManyToOne(() => Message, message => message.id, {
        eager: true
    })
     @JoinColumn()
    message!: Message ;
    @Column("text")
    users: String = '';
   
}
