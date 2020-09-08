import {groupModel, userModel} from "../models/user_group";
import { IGroup } from "../interfaces/igroup";
const { Op } = require("sequelize");
const groupDBContext = require("../utils/dbutils");

class userGroupDAL
{
    static async getUsersInGroup(id: number){
        const result = await groupModel.findOne({
            where: { id: id },
            include: userModel
          });
          return result;
    }

    static async addUsersToGroup (id: number, userIds: Array<number>) 
    {
        const result = await groupDBContext.sequelize.transaction(async (t: any) => {
            const group = await groupModel.findOne({ where: { id: id }});
            await group.addUsers(userIds);  
        });
    }
}

module.exports = userGroupDAL;