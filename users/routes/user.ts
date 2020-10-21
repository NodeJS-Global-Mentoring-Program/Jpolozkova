import express from 'express';
const userRouter = express.Router();
const validationMiddleware = require('../middleware/user_validation');
const logger = require('../utils/logger');
const logInfo = require('../middleware/logger');
import  UserController  from "../controller/users";


const userController = new UserController();

userRouter.get('/autoSuggest', logInfo, userController.getSuggestions);
userRouter.get('/', logInfo, userController.getUsers);
userRouter.get('/:id', logInfo, userController.getUser);
userRouter.delete('/:id', logInfo, userController.deleteUser);
userRouter.post('/', logInfo, validationMiddleware, userController.addUser);
userRouter.post('/:id', logInfo, validationMiddleware, userController.updateUser);

export default userRouter;
