class User {
	constructor (id, login, password, age, isDeleted) {
		this.Id = id;
		this.Login = login;
		this.Password = password;
		this.Age = age;
		this.IsDeleted = isDeleted;
	}
}
module.exports = User;