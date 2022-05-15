import { EntityRepository, Repository } from "typeorm";
import {GroupUser} from "../entity/GroupUser";
import { User } from "../entity/User";

@EntityRepository(GroupUser)
export class GroupRepository extends Repository<GroupUser> {
    public findById = (id: String) => {
        return this.createQueryBuilder("group")
            .where("group.id = :id", { id})
            .getOne();
    }

    public findAll = () => {
        return this.createQueryBuilder("group")
            .orderBy("group.date" ,"ASC")
            .getOne();
    }

    public findGroupByUser = (user: User) => {
        return this.createQueryBuilder("groupchat")
            .where("INSTR(groupchat.users, "+"'"+user.id+"'" +")>0")
            .getMany();
    }

    public findMessageSentByUser = (user: User) => {
        return this.createQueryBuilder("message")
            .where("message.sender = :id", { id: user.id })
            .innerJoinAndSelect("message.sender", "sd")
            .innerJoinAndSelect("message.receiver", "rv")
            .orderBy("message.date" ,"ASC")
            .getMany();
    }

    public findMessageReceivedByUser = (user: User) => {
        return this.createQueryBuilder("message")
            .where("message.receiver = :id", { id: user.id })
            .innerJoinAndSelect("message.sender", "sd")
            .innerJoinAndSelect("message.receiver", "rv")
            .orderBy("message.date" ,"ASC")
            .getMany();
    }
}
