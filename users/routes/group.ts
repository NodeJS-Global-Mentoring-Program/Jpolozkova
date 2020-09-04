import express from 'express';
const router = express.Router();
const groupService = require('../service/group.service');
const groupDAL = require('../data-access/group');
const errorHandler = require('../utils/error_handler');
const groupValidation = require('../middleware/group_validation');

const groups = new groupService(groupDAL);

router.get('/', async (req, res, next) => {   
    res.send(await errorHandler.executeQuery(await groups.getGroups(), next));
})

router.get('/:id', async (req, res, next) => {
    const user = await errorHandler.executeQuery(await groups.getGroup(req.params.id), next);
    res.send(user);
})

router.delete('/:id', async (req, res, next) => {
    let result = await errorHandler.executeQuery(await groups.deleteGroup(req.params.id), next);
    if(result)
        res.send(await groups.getGroups());
    else
        res.status(400).end();
})

router.post('/', groupValidation, async (req, res, next) => {
    let result = await errorHandler.executeQuery(await groups.insertGroup(req.body), next);
    res.send(await groups.getGroups());
})

router.post('/:id', groupValidation, async (req, res, next) => {
    let result = await errorHandler.executeQuery(await groups.updateGroup(req.params.id, req.body, next));
    res.send(await groups.getGroups());
})

module.exports = router;
