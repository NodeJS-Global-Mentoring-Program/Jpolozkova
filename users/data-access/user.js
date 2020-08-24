
const user = require('../models/user');

class userDAL
{
    static async getUsers()  {
        return await user.findAll();;
    }

    static async getById (id) {
        return await user.findByPk(id);
    }

    static getByLogin (login) {
        let result = user.findOne({ where: { login: login} });
        if(result) 	
            return result;
        return false;   
    }

    static async _updateUser (userId, userData) {
        await user.update(
        { 
            login: userData.login, 
            password: userData.password, 
            age: userData.age,
            isdeleted: userData.isdeleted
        },
        {
            where: { id: userId }
        });
    }

    static async getUser(id)
    {
        let user = await this.getById(id);
        if(user)
            return user;    
        return false;
    }

    static async updateUser (id, userData)
    {
        let user = getById(id);
        if(user)
        {
            await _updateUser(id, userData);
            return true;
        }
        return `User with id ${id} was not found`;
    }

    static async insertUser (userData)
    {    
        await user.create(
            { 
                login: userData.login, 
                password: userData.password, 
                age: userData.age 
            });
        return true;
    }

    static async deleteUser (id) {
        let user = await getById(id);
        if(user)
        {
            user.isdeleted = 1;
            await _updateUser(id, user);
            return true;
        }
        return false;	
    }
}

module.exports = userDAL;