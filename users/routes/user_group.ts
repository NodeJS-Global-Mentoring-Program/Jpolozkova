import express from 'express';
const router = express.Router();
const userGroupService = require('../service/user_group.service');
const userGroupDAL = require('../data-access/user_group');
const errHandler = require('../utils/error_handler');
const logInfo = require('../middleware/logger');
const logger = require('../utils/logger');

const userGroup = new userGroupService(userGroupDAL);
const errorHandler = new errHandler(logger);

router.post('/:id',  logInfo, async (req, res, next) => {
    let result = await errorHandler.executeQuery(await userGroup.addUsersToGroup(req.params.id, req.body, next), req.method + req.baseUrl, req.params);
    res.send(await userGroup.getUsersInGroup(req.params.id));
})

module.exports = router;
