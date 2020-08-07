let users = [ { id: 1, login: 'Stephen', password: 123, age: 57, isDeleted: 0 },
{ id: 2, login: 'Covey', password: 456, age: 8, isDeleted: 0 },
{ id: 3, login: 'Hal', password: 789, age: 40, isDeleted: 0 },
{ id: 4, login: 'Robert', password: 101112, age: 34, isDeleted: 1 },
{ id: 5, login: 'Gary', password: 131415, age: 20, isDeleted: 0 } ]

const getById = (id) => {
	let user = users.filter(item => {return item.id == id})
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
		return item	;	
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

exports.putOrUpdateUser = async (userData) =>
{
	console.log(userData.id);
	if(userData.hasOwnProperty('login'))
	{
		let user = getByLogin(userData.login);
		console.log(user);
		if(user)
			updateUser(userData.id, userData);
		else
			users.push(userData);
		return true;
	}

    return false;
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