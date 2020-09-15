import {groupModel} from "../models/user_group";
import { IGroup } from "../interfaces/igroup";
const perm = require('../utils/permissions_utils');

class groupDAL
{
    static async getGroups()  {
        return await groupModel.findAll();;
    }

    static async getById (id: number) {
        return await groupModel.findByPk(id);
    }

    static getByLogin (login: string) {
        let result = groupModel.findOne({ where: { login: login} });
        if(result) 	
            return result;
        return false;   
    }

    static async _updateGroup (groupId: number, groupData: IGroup) {
        await groupModel.update(
        { 
            name: groupData.name, 
            permissions:  perm.convertToInteger(groupData.permissions)
        },
        {
            where: { id: groupId }
        });
    }

    static async getGroup(id: number)
    {
        let group = await this.getById(id);
        if(group)
            return group;    
        return false;
    }

    static async updateGroup (id: number, groupData: IGroup)
    {
        let group = this.getById(id);
        if(group)
        {
            await this._updateGroup(id, groupData);
            return true;
        }
        return `Ggroup with id ${id} was not found`;
    }

    static async insertGroup (groupData: IGroup)
    {    
        //throw "Error2";
        await groupModel.create(
            { 
                name: groupData.name, 
                permissions: perm.convertToInteger(groupData.permissions)
            });
        return true;
    }

    static async deleteGroup (id: number) {
        await groupModel.destroy({
            where: {
                id: id
            }
        })
    }
}

module.exports = groupDAL;