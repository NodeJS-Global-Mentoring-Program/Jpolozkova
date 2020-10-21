import express from 'express';
const router = express.Router();
import {LoginService} from '../service/login.service';
const errHandler = require('../utils/error_handler');
const logInfo = require('../middleware/logger');
import {UserDAL} from '../data-access/user';
const logger = require('../utils/logger');
import { userModel } from "../models/user_group";

const errorHandler = new errHandler(logger);
let userDal = new UserDAL(userModel);
const login = new LoginService(userDal);

router.post('/', logInfo, async (req, res, next) => {
    let params = `${JSON.stringify(req.body)}; ${JSON.stringify(req.params)}`
    let result = await errorHandler.executeQuery(await login.doLogin(req.body.login, req.body.password), next, req.method + req.baseUrl, params)
    res.send({token: result});
})

module.exports = router;
