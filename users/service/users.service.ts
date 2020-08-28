import { IUser } from "../interfaces/iuser";
import { IUserModel } from "../interfaces/iusermodel";

class userService {
	userModel: IUserModel;
	constructor(userModel: IUserModel){
	  this.userModel = userModel;
	}

	async getUsers()
	{	
		return await this.userModel.getUsers();
	}

	async getUser (id: number)
	{
		console.log(this.userModel)
		return await this.userModel.getUser(id);
	}

	async updateUser (id: number, userData: IUser)
	{
		return await this.userModel.updateUser(id, userData);
	}

	async insertUser (userData: IUser)
	{
		return await this.userModel.insertUser(userData);
	}

	async deleteUser (id: number)
	{
		return await this.userModel.deleteUser(id);
	}
}

module.exports = userService;