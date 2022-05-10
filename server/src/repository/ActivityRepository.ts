import {EntityRepository, Repository} from "typeorm";
import {Activity} from "../entity/Activity";

@EntityRepository(Activity)
export class ActivityRepository extends Repository<Activity> {
    public findById = (id: String) => {
        return this.createQueryBuilder("Activity")
            .where("Activity.id = :id", { id})
            .getOne();
    }

    public findByName = (description: String) => {
        return this.createQueryBuilder("Activity")
            .where("Activity.description = :id", { description})
            .getOne();
    }

    public findByuserid = (userId: String) => {
        console.log(userId);
        
        return this.createQueryBuilder("Activity")
            .where("Activity.userId='"+ userId +"'" )
            .getMany()
    }
 
}
