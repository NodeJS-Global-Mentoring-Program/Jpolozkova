import express from 'express';
const autoSuggest = require('../utils/auto_suggestion');    
import {UserService} from '../service/users.service';
import {UserDAL} from '../data-access/user';
const errHandler = require('../utils/error_handler');
const validationMiddleware = require('../middleware/user_validation');
const logger = require('../utils/logger');
const logInfo = require('../middleware/logger');
import { userModel } from "../models/user_group";

const users = new UserService(new UserDAL(userModel));
const errorHandler = new errHandler(logger);

export default  class UserController{
    constructor() { }

    async getSuggestions(req:express.Request, res: express.Response)
    {
        async () => {
            let result = await autoSuggest.getAutoSuggestUsers(req.body.substr, req.body.limit);
            res.send(result);
        }
    };

    async getUsers(req:express.Request, res: express.Response, next: express.NextFunction) {   
        res.send(await errorHandler.executeQuery(await users.getUsers(), next, req.method + req.baseUrl, req.params));
    }
    
    async getUser(req:express.Request, res: express.Response, next: express.NextFunction) {
        const user = await errorHandler.executeQuery(await users.getUser(parseInt(req.params.id)), next, req.method + req.baseUrl, req.params);
        if(user)
            res.send(user);   
    }

    async deleteUser (req:express.Request, res: express.Response, next: express.NextFunction) {
        let result = await errorHandler.executeQuery(await users.deleteUser(parseInt(req.params.id)), next, req.method + req.baseUrl, req.params);
        if(result)
            res.send(await users.getUsers());
    }

    async addUser (req:express.Request, res: express.Response, next: express.NextFunction) {
        let result = await errorHandler.executeQuery(await users.insertUser(req.body), next, req.method + req.baseUrl, req.params);
        res.send(await users.getUsers());
    }

    async updateUser(req:express.Request, res: express.Response, next: express.NextFunction) {
        let result = await errorHandler.executeQuery(await users.updateUser(parseInt(req.params.id), req.body), next, req.method + req.baseUrl, req.params);
        if(result)
            res.send(await users.getUsers());
    }
}