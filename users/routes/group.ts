import express from 'express';
const router = express.Router();
const groupService = require('../service/group.service');
const groupDAL = require('../data-access/group');
const errHandler = require('../utils/error_handler');
const groupValidation = require('../middleware/group_validation');
const groupLogger = require('../middleware/logger');

const groups = new groupService(groupDAL);
const errorHandler = new errHandler(groupLogger);

const logInfo = (req:express.Request, res: express.Response, next: express.NextFunction) =>
{
  let params = `${JSON.stringify(req.body)}; ${JSON.stringify(req.params)}`
  groupLogger.log(`Method was called: ${req.method} ${req.baseUrl} with params: ${params};`);
  next();
}

router.get('/', logInfo, async (req, res, next) => {   
    let params = `${JSON.stringify(req.body)}; ${JSON.stringify(req.params)}`
    res.send(await errorHandler.executeQuery(await groups.getGroups(), next, req.method + req.baseUrl, params));
})

router.get('/:id', logInfo, async (req, res, next) => {
    let params = `${JSON.stringify(req.body)}; ${JSON.stringify(req.params)}`
    const group = await errorHandler.executeQuery(await groups.getGroup(req.params.id), next, req.method + req.baseUrl, params);
    if(group)
        res.send(group);
})

router.delete('/:id', logInfo, async (req, res, next) => {
    let params = `${JSON.stringify(req.body)}; ${JSON.stringify(req.params)}`
    let result = await errorHandler.executeQuery(await groups.deleteGroup(req.params.id), next, req.method + req.baseUrl, params);
    if(result)
        res.send(await groups.getGroups());
})

router.post('/', logInfo,  groupValidation, async (req, res, next) => {
    let params = `${JSON.stringify(req.body)}; ${JSON.stringify(req.params)}`
    let result = await errorHandler.executeQuery(groups.insertGroup(req.body), next, req.method + req.baseUrl, params);
    if(result)
        res.send(await groups.getGroups());
})

router.post('/:id', logInfo, groupValidation, async (req, res, next) => {
    let params = `${JSON.stringify(req.body)}; ${JSON.stringify(req.params)}`
    let result = await errorHandler.executeQuery(await groups.updateGroup(req.params.id, req.body), next, req.method + req.baseUrl, params);
    if(result)
        res.send(await groups.getGroups());
})

module.exports = router;
