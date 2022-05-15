import { NextFunction, Request, Response, Router } from "express";
import { check, ValidationError, validationResult } from 'express-validator';
import { FileService } from "../services/FileServives";
import Logger from "../services/Logger";

export class FileController {

    private ActivityService: FileService;
    public router: Router;

    constructor() {
        this.ActivityService = new FileService();
        this.router = Router();
        this.routes();
    }
    

    public routes() {
        this.router.post('/myfiles', this.getUserfiles);
        this.router.get('/:id', this.getOne);

        this.router.post(
            '/',
            this.postOne);
        this.router.put(
            '/:id',
       
            this.putOne);
        this.router.delete('/:id', this.deleteOne);
    }

    /**
     * GET all products
     * @param req Express Request
     * @param res Express Response
     * @param next Express NextFunction
     * @returns 
     */
     public getAll = async (req: Request, res: Response, next: NextFunction) => {
        Logger.debug('GET activities');
        
        // Return every products in DB
        const products = await this.ActivityService.findAll();
        res.send(products).end();
        return;
    }

   

    public getUserfiles = async (req: Request, res: Response, next: NextFunction) => {
        Logger.debug('GET user messages ');

           
          
        const groupname = req.body.groupname;
       
        
        if (groupname === undefined || groupname === null) {
            res.status(400).send("Error, parameter id is missing or wrong").end();
            return;
        }
        else {
            // Check if the user exist
            const activity = await this.ActivityService.findBygroupid(groupname)
            res.send(activity).end();
            return;
        }
    }

    /**
     * GET product types
     * @param req Express Request
     * @param res Express Response
     * @param next Express NextFunction
     * @returns 
     */
 

    /**
     * GET last product
     * @param req Express Request
     * @param res Express Response
     * @param next Express NextFunction
     * @returns 
     */
    

    /**
     * GET product by id
     * @param req Express Request
     * @param res Express Response
     * @param next Express NextFunction
     * @returns 
     */
    public getOne = async (req: Request, res: Response, next: NextFunction) => {
        Logger.debug('GET One Activity');

        const ActivityServiceId = req.params.id;
        if (ActivityServiceId === undefined || ActivityServiceId === null) {
            res.status(400).send("Error, parameter id is missing or wrong").end();
            return;
        }
        else {
            const Activity = await this.ActivityService.findOne(ActivityServiceId);
            if (Activity === undefined) {
                // Send 404 error
                res.status(404).send('Entity not found').end();
                return;
            }

            // Send product found
            res.send(Activity).end();
            return;
        }
    }

    /**
     * POST product
     * @param req Express Request 
     * @param res Express Response
     * @param next Express NextFunction
     */
    public postOne = async (req: Request, res: Response, next: NextFunction) => {
        Logger.debug('POST activity');
        // Check if there are format errors
   

        
         
        
        const response = await this.ActivityService.create(req.body);
        
        if (response) {
            res.end();
        } else {
            res.status(404).send('Unable to create product').end();
        }

        return;
    }

    /**
     * PUT product
     * @param req Express Request
     * @param res Express Response
     * @param next Express NextFunction
     */
    public putOne = async (req: Request, res: Response, next: NextFunction) => {
        Logger.debug('PUT product');
        // Check if there are format errors
        const errorFormatter = ({ location, msg, param, value, nestedErrors }: ValidationError) => {            
            return `${location}[${param}]: ${msg}`;
        };

        // Check if there are validation errors
        const result = validationResult(req).formatWith(errorFormatter);
        if (!result.isEmpty()) {
            res.status(404).send({ errors: result.array() }).end();
            return;
        }

        // Check path id
        const ActivityId = req.params.id;
        if (ActivityId === undefined || ActivityId === null) {
            res.status(400).send("Error, parameter id is missing or wrong");
            return;
        } else {
            // Body validation and path validation are now complete
            return;
        }
    }

    /**
     * DELETE product 
     * @param req Express Request
     * @param res Express Response
     * @param next Express NextFunction
     */
     public deleteOne = async (req: Request, res: Response, next: NextFunction) => {
        // Check path id
        const ActivityId = req.params.id;
        if (ActivityId === undefined || ActivityId === null) {
            res.status(404).send("Error, parameter id is missing or wrong");
            return;
        } else {
            const response = await this.ActivityService.delete(ActivityId);
            res.end();
            return;
        }
    }
}