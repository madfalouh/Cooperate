import { NextFunction, Request, Response, Router } from "express";
import { check, ValidationError, validationResult } from "express-validator";
import { Server } from "ws";
import { CallService } from "../services/CallService";
import Logger from "../services/Logger";
import { UserService } from "../services/UserService";
import { Message } from "../entity/Message";
const WebSocket = require('ws');

const __REGEX_FOR_WEBSOCKET__ = /[?&]id=([^&#]*)/g;


export class CallController {

    private messageService: CallService;
    private userService: UserService;
    public router: Router;
    private socketMap = new Map<string, any>();

    constructor() {
        this.messageService = new CallService();
        this.userService = new UserService();
        this.router = Router();
        this.routes();
    }

    public initSockets = (server: Server) => {
        const wss = new WebSocket.Server({server: server, path: '/api/calls'});

        wss.on('connection', (ws: any, req: any) => {
            console.log('A new call client Connected!');

            ws.on('message', async (message: any) => {
                         
                const messageStored = await this.messageService.create(JSON.parse(message.toString()));
         
                
                 wss.clients.forEach( (client) => {
                  
                         if (messageStored) {
                             client.send(JSON.stringify(messageStored));
 
                         } else {
                             client.send('ERROR');
                         }
                     
                 });
            

        });
          }
        )}
    public routes() {
   
        this.router.post(
            '/',
            [
                check('content').exists().withMessage('Field "content" is missing').trim().escape(),
                check('sender').exists().withMessage('Field "sender" is missing').isUUID().trim().escape(),
                check('receiver').exists().withMessage('Field "receiver" is missing').isUUID().trim().escape(),
                check('date').exists().withMessage('Field "date" is missing').isDate().trim().escape(),
            ],
            this.postOne);
        this.router.put(
            '/:id',
            [
                check('content').trim().escape(),
                check('sender').isUUID().trim().escape(),
                check('receiver').isUUID().trim().escape(),
                check('date').isDate().trim().escape(),
            ],
            this.putOne);
    }

  
    /**
     * POST message
     * @param req Express Request 
     * @param res Express Response
     * @param next Express NextFunction
     */
    public postOne = async (req: Request, res: Response, next: NextFunction) => {
        Logger.debug('POST message');

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

        const messageStored = await this.messageService.create(req.body);

        if (messageStored) {
            res.end();
        } else {
            res.status(404).send('Unable to create product').end();
        }

        return;
    }

    /**
     * PUT message
     * @param req Express Request
     * @param res Express Response
     * @param next Express NextFunction
     */
    public putOne = async (req: Request, res: Response, next: NextFunction) => {
        Logger.debug('PUT message');
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
        const messageId = req.params.id;
        if (messageId === undefined || messageId === null) {
            res.status(400).send("Error, parameter id is missing or wrong");
            return;
        } else {
            // Body validation and path validation are now complete
            return;
        }
    }

 
}
