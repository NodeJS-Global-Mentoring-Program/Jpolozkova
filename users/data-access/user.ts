import { userModel } from "../models/user_group";
import { IUser } from "../interfaces/iuser";

class userDAL
{
    static async getUsers()  {
        return await userModel.findAll();;
    }

    static async getById (id: number) {
        return await userModel.findByPk(id);
    }

    static getByLogin (login: string) {
        let result = userModel.findOne({ where: { login: login} });
        if(result) 	
            return result;
        return false;   
    }

    static async _updateUser (userId: number, userData: IUser) {
        await userModel.update(
        { 
            login: userData.login, 
            password: userData.password, 
            age: userData.age,
            isdeleted: userData.isdeleted ? 1 : 0
        },
        {
            where: { id: userId }
        });
    }

    static async getUser(id: number)
    {
        let user = await this.getById(id);
        if(user)
            return user;    
        return false;
    }

    static async updateUser (id: number, userData: IUser)
    {
        let user = this.getById(id);
        if(user)
        {
            await this._updateUser(id, userData);
            return true;
        }
        return `User with id ${id} was not found`;
    }

    static async insertUser (userData: IUser)
    {    
        await userModel.create(
            { 
                login: userData.login, 
                password: userData.password, 
                age: userData.age 
            });
        return true;
    }

    static async deleteUser (id: number) {
        let user = await this.getById(id);
        if(user)
        {
            user.isdeleted = 1;
            await this._updateUser(id, user);
            return true;
        }
        return false;	
    }
}
module.exports = userDAL;