import express from 'express';
const router = express.Router();
const userService = require('../service/users.service');
import {UserDAL} from '../data-access/user';
const autoSuggest = require('../utils/auto_suggestion');
const errHandler = require('../utils/error_handler');
const validationMiddleware = require('../middleware/user_validation');
const logger = require('../utils/logger');
const logInfo = require('../middleware/logger');
import { userModel } from "../models/user_group";

const users = new userService(new UserDAL(userModel));
const errorHandler = new errHandler(logger);

router.get('/autoSuggest', logInfo, async (req, res) => {
    let result = await autoSuggest.getAutoSuggestUsers(req.body.substr, req.body.limit);
    res.send(result);
})

router.get('/', logInfo, async (req, res, next) => {   
    res.send(await errorHandler.executeQuery(await users.getUsers(), next, req.method + req.baseUrl, req.params));
})

router.get('/:id', logInfo, async (req, res, next) => {
    const user = await errorHandler.executeQuery(await users.getUser(req.params.id), next, req.method + req.baseUrl, req.params);
    if(user)
        res.send(user);   
})

router.delete('/:id', logInfo, async (req, res, next) => {
    let result = await errorHandler.executeQuery(await users.deleteUser(req.params.id), next, req.method + req.baseUrl, req.params);
    if(result)
        res.send(await users.getUsers());
})

router.post('/', logInfo, validationMiddleware, async (req, res, next) => {
    let result = await errorHandler.executeQuery(await users.insertUser(req.body), next, req.method + req.baseUrl, req.params);
    res.send(await users.getUsers());
})

router.post('/:id', logInfo, validationMiddleware, async (req, res, next) => {
    let result = await errorHandler.executeQuery(await users.updateUser(req.params.id, req.body, next), next, req.method + req.baseUrl, req.params);
    if(result)
        res.send(await users.getUsers());
})

module.exports = router;
