import { getCustomRepository } from "typeorm";
import { ActivityRepository } from "../repository/ActivityRepository";
import Logger from "./Logger";

/**
 * Product service class
*/
export class ActivityService {

    private ActivityRepository:ActivityRepository;

    constructor() {
        this.ActivityRepository = getCustomRepository(ActivityRepository);
    }

    /**
     * Get product by id
     * @param id 
     * @returns product | undefined
     */
    public findOne = async (id: String) => {
        const Activity = await this.ActivityRepository.findById(id);
        return Activity;
    }

   public findByuserid =async (id: String) => {
        const Activity = await this.ActivityRepository.findByuserid(id);
        return Activity;
    }

    /**
     * Get last product
     * @param id 
     * @returns product | undefined
     */
    

    /**
     * 
     * @returns product[] | undefined
     */
    public findAll = async () => {
        const Activity = await this.ActivityRepository.find();
        return Activity;
    }

    /**
     * Create a new product entity
     * @param body Validated body of the request
     * @returns boolean
     */
     public create = async (body: any) => {
        try {
            body.image = Buffer.from(body.image);
            const Activity = await this.ActivityRepository.save(body);

            if (Activity !== undefined || Activity !== null) {
                // Success
                return true;
            }

            // Error while creating the new product (the product already exists)
            return false;
        } catch (err) {
            Logger.error(err);
            return false;
        }
    }

    /**
     * Update one product
     * @param body Validated body of the request
     * @returns boolean
     */
     public update = async (body: Object, id: number) => {
        try {
            const Activity  = await this.ActivityRepository.findOne(id);
            if (Activity  !== undefined) {
                this.ActivityRepository.merge(Activity , body);
                const ActivityResult = await this.ActivityRepository.save(Activity );
                if (ActivityResult !== undefined || ActivityResult !== null) {
                    // Success
                    return true;
                }

                // Error while creating the new product (the product already exists)
                return false;
            }
            return false;
        } catch (err) {
            Logger.error(err);
            return false;
        }
    }

    /**
     * 
     * @param id product's id to delete
     * @returns boolean
     */
     public delete = async (id: string) => {
        try {
            const results = await this.ActivityRepository.delete(id);
            return results.affected;
        }  catch (err) {
            Logger.error(err);
            return false;
        }
    }
}
