import { IUserGroupDAL } from "../interfaces/iusergroupdal";

class userGroupService {
	userGroupDAL: IUserGroupDAL;
	constructor(userGroup: IUserGroupDAL){
	  this.userGroupDAL = userGroup;
	}

	async getUsersInGroup(groupId: number)
	{	
		return await this.userGroupDAL.getUsersInGroup(groupId);
	}

	async addUsersToGroup (id: number, body: any)
	{
		let ids: Array<number> = body.userIds;
		return await this.userGroupDAL.addUsersToGroup(id, ids);
	}
}

module.exports = userGroupService;