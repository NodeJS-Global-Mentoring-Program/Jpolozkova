class userService {
	constructor(userModel){
	  this.userModel = userModel;
	}

	async getUsers()
	{
	
		return await this.userModel.getUsers();
	}

	async getUser (id)
	{
		console.log(this.userModel)
		return await this.userModel.getUser(id);
	}

	async updateUser (id, userData)
	{
		return await this.userModel.updateUser(id, userData);
	}

	async insertUser (userData)
	{
		return await this.userModel.insertUser(userData);
	}

	async deleteUser (id)
	{
		return await this.userModel.deleteUser(id);
	}
}

module.exports = userService;