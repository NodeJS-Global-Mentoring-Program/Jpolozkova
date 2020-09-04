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
    }

    static async addUsersToGroup (id: number, userIds: Array<number>) 
    {
        const result = await groupDBContext.sequelize.transaction(async (t: any) => {
            const userlist: Array<userModel> = await userModel.findAll({
                where: {
                    id: {
                        [Op.or]: userIds
                    }
                }
            });

            const group = await groupModel.findOne({ where: { id: id }});
            await group.addUsers(userIds);

           /* 
            for(let i = 0; i <= userlist.length; i++)
            {
                console.log(userlist[i]);
                await userlist[i].addGroup(group);
                //group.addUser();
            }*/

 
        });
    }
}

module.exports = userGroupDAL;