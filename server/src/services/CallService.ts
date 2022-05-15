import { getCustomRepository } from "typeorm";
import { Message } from "../entity/Message";
import { User } from "../entity/User";
import { ActivityRepository } from "../repository/ActivityRepository";
import Logger from "./Logger";

/**
 * Message service class
*/
export class CallService {

    private activityRepository: ActivityRepository;

    constructor() {
        this.activityRepository = getCustomRepository(ActivityRepository);
    }

  
    public create = async (body: any) => {
        try {
            const message = await this.activityRepository.save(body);
                           
            if (message !== undefined || message !== null) {
                // Success
                return message;
            }

            // Error while creating the new message (the message already exists)
            return null;
        } catch (err) {
            Logger.error(err);
            return null;
        }
    }

 
}
