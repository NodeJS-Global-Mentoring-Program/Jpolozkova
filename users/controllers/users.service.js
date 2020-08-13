let usersList = require('../models/users');
const validator = require('../utils/user_validation');

const getById = (id) => {
	let user = users.filter(item => {return item.id == id});
	if(user.length > 0) 	
		return user[0];
	return false;   
}

const getByLogin = (login) => {
	let user = users.filter(item => {return item.login == login})
	if(user.length > 0) 	
		return user[0];
	return false;   
}

const updateUser = (id, userData) => {
	let usersUpd = users.map(function(item) {
		if(item.id == id)
			return userData;
		return item;	
	})
	users = usersUpd;
}

exports.getUser = async (id) =>
{
	let user = getById(id);
	if(user)
		return user;    
    return false;
}

exports.getUsers = async () =>
{
    return users;
}

exports.updateUser = async (id, userData) =>
{
	const validateResults = await validator.validateUser(userData);
	if(validateResults != "")
		return validateResults;

	let user = getById(id);
	if(user)
	{
		updateUser(userData.id, userData);
		return true;
	}
	return `User with id ${id} was not found`;
}

exports.insertUser = async (userData) =>
{
	const validateResults = await validator.validateUser(userData);

	if(validateResults == "")
	{
		userData.id = users.length + 1;
		users.push(userData);
		return true;
	}

    return validateResults;
}

exports.deleteUser = async (id) =>
{
	let user = getById(id);
	if(user)
	{
		user.IsDeleted = true;
		updateUser(id, user);
		return true;
	}
	return false;	
}