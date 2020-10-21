import express from 'express';
const router = express.Router();
const groupService = require('../service/group.service');
const groupDAL = require('../data-access/group');
const errHandler = require('../utils/error_handler');
const groupValidation = require('../middleware/group_validation');
const logInfo = require('../middleware/logger');
const logger = require('../utils/logger');

const groups = new groupService(groupDAL);
const errorHandler = new errHandler(logger);

export default  class GroupController{
    constructor() { }

    async getGroups(req:express.Request, res: express.Response, next: express.NextFunction) {   
        let params = `${JSON.stringify(req.body)}; ${JSON.stringify(req.params)}`
        res.send(await errorHandler.executeQuery(await groups.getGroups(), next, req.method + req.baseUrl, params));
    }
    
    async getGroup(req:express.Request, res: express.Response, next: express.NextFunction) {
        let params = `${JSON.stringify(req.body)}; ${JSON.stringify(req.params)}`
        const group = await errorHandler.executeQuery(await groups.getGroup(req.params.id), next, req.method + req.baseUrl, params);
        if(group)
            res.send(group);
    }

    async deleteGroup (req:express.Request, res: express.Response, next: express.NextFunction) {
        let params = `${JSON.stringify(req.body)}; ${JSON.stringify(req.params)}`
        let result = await errorHandler.executeQuery(await groups.deleteGroup(req.params.id), next, req.method + req.baseUrl, params);
        if(result)
            res.send(await groups.getGroups());
    }

    async addGroup (req:express.Request, res: express.Response, next: express.NextFunction) {
        let params = `${JSON.stringify(req.body)}; ${JSON.stringify(req.params)}`
        let result = await errorHandler.executeQuery(groups.insertGroup(req.body), next, req.method + req.baseUrl, params);
        if(result)
            res.send(await groups.getGroups());
    }

    async updateGroup(req:express.Request, res: express.Response, next: express.NextFunction) {
        let params = `${JSON.stringify(req.body)}; ${JSON.stringify(req.params)}`
        let result = await errorHandler.executeQuery(await groups.updateGroup(req.params.id, req.body), next, req.method + req.baseUrl, params);
        if(result)
            res.send(await groups.getGroups());
    }
}