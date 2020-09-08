import express from 'express';
const router = express.Router();
const userGroupService = require('../service/user_group.service');
const userGroupDAL = require('../data-access/user_group');
const errorHandler = require('../utils/error_handler');

const userGroup = new userGroupService(userGroupDAL);

router.post('/:id', async (req, res, next) => {
    let result = await errorHandler.executeQuery(await userGroup.addUsersToGroup(req.params.id, req.body, next));
    res.send(await userGroup.getUsersInGroup(req.params.id));
})

module.exports = router;
