import {EntityRepository, Repository} from "typeorm";
import {File} from "../entity/File";

@EntityRepository(File)
export class FileRepository extends Repository<File> {
    public findById = (id: String) => {
        return this.createQueryBuilder("File")
            .where("File.id = :id", { id})
            .getOne();
    }

    public findByName = (description: String) => {
        return this.createQueryBuilder("Activity")
            .where("Activity.description = :id", { description})
            .getOne();
    }

    public findBygroupid = (groupname: String) => {
       
        
        return this.createQueryBuilder("file")
            .where("file.groupname='"+ groupname+"'" )
            .getMany()
    }
 
}
