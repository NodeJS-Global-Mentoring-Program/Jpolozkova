import { IUser } from "../interfaces/iuser";
import { IUserDAL } from "../interfaces/iuserdal";

class userService {
	userDAL: IUserDAL;
	constructor(user: IUserDAL){
	  this.userDAL = user;
	}

	async getUsers()
	{	
		return await this.userDAL.getUsers();
	}

	async getUser (id: number)
	{
		console.log(this.userDAL)
		return await this.userDAL.getUser(id);
	}

	async updateUser (id: number, userData: IUser)
	{
		return await this.userDAL.updateUser(id, userData);
	}

	async insertUser (userData: IUser)
	{
		return await this.userDAL.insertUser(userData);
	}

	async deleteUser (id: number)
	{
		return await this.userDAL.deleteUser(id);
	}
}

module.exports = userService;