import express from 'express';
const router = express.Router();
const userGroupService = require('../service/user_group.service');
const userGroupDAL = require('../data-access/user_group');
const errHandler = require('../utils/error_handler');
const userGroupLogger = require('../middleware/logger');
const logger = require('../middleware/logger');

const userGroup = new userGroupService(userGroupDAL);
const errorHandler = new errHandler(logger);

const logInfo = (req:express.Request, res: express.Response, next: express.NextFunction) =>
{
  let params = `${JSON.stringify(req.body)}; ${JSON.stringify(req.params)}`
  logger.log(`Method was called: ${req.method} ${req.baseUrl} with params: ${params};`);
  next();
}

router.post('/:id',  logInfo, async (req, res, next) => {
    let result = await errorHandler.executeQuery(await userGroup.addUsersToGroup(req.params.id, req.body, next), req.method + req.baseUrl, req.params);
    res.send(await userGroup.getUsersInGroup(req.params.id));
})

module.exports = router;
