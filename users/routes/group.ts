import express from 'express';
const groupRouter = express.Router();
const groupValidation = require('../middleware/group_validation');
const logInfo = require('../middleware/logger');
import  GroupController  from "../controller/group";

const groupController = new GroupController();

groupRouter.get('/', logInfo, groupController.getGroups);
groupRouter.get('/:id', logInfo, groupController.getGroup);
groupRouter.delete('/:id', logInfo, groupController.deleteGroup);
groupRouter.post('/', logInfo,  groupValidation, groupController.addGroup);
groupRouter.post('/:id', logInfo, groupValidation, groupController.updateGroup);

export default groupRouter;
