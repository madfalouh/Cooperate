import { EntityRepository, Repository } from "typeorm";
import { Message} from "../entity/Message";
import { User } from "../entity/User";
import { GroupUser } from "../entity/GroupUser";

@EntityRepository(Message)
export class MessageRepository extends Repository<Message> {
    public findById = (id: String) => {
        return this.createQueryBuilder("message")
            .where("message.id = :id", { id})
            .getOne();
    }

    public findAll = () => {
        return this.createQueryBuilder("message")
            .orderBy("message.date" ,"ASC")
            .getOne();
    }

    public findMessageByUser = (user: User) => {
        return this.createQueryBuilder("message")
            .where("message.sender = :id OR message.receiver = :id", { id: user.id })
            .innerJoinAndSelect("message.sender", "sd")
            .innerJoinAndSelect("message.receiver", "rv")
            .orderBy("message.date" ,"ASC")
            .getMany();
    }
    public findMessageByGroup = (group: GroupUser) => {
        return this.createQueryBuilder("message")
            .where("message.groupId = :id", { id: group.id })
            .innerJoinAndSelect("message.sender", "sd")
            .innerJoinAndSelect("message.group", "gp")
            .orderBy("message.date" ,"ASC")
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
