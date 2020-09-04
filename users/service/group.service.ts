import { IGroup } from "../interfaces/igroup";
import { IGroupDAL } from "../interfaces/igroupdal";

class groupService {
	groupDAL: IGroupDAL;
	constructor(group: IGroupDAL){
	  this.groupDAL = group;
	}

	async getGroups()
	{	
		return await this.groupDAL.getGroups();
	}

	async getGroup (id: number)
	{
		return await this.groupDAL.getGroup(id);
	}

	async updateGroup (id: number, groupData: IGroup)
	{
		return await this.groupDAL.updateGroup(id, groupData);
	}

	async insertGroup (groupData: IGroup)
	{
		return await this.groupDAL.insertGroup(groupData);
	}

	async deleteGroup (id: number)
	{
		return await this.groupDAL.deleteGroup(id);
	}
}

module.exports = groupService;