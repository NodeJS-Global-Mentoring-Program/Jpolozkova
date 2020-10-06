import { dbModel } from "../models/user_group";
import { IUser } from "../interfaces/iuser";
import { IUserDAL } from "../interfaces/iuserdal";

export class UserDAL implements IUserDAL
{
    userModel: dbModel;
	constructor(model: dbModel){
	  this.userModel = model;
    }
    
    async getUsers(): Promise<Array<IUser>> {
        return await this.userModel.findAll();;
    }

    async getById (id: number): Promise<IUser> {
        return await this.userModel.findByPk(id);
    }

    async getByLogin (login: string) {
        let result = await this.userModel.findOne({ where: { login: login} });
        if(result) 	
            return result;
        return false;   
    }

    async checkLogin(login: string, password: string):Promise<boolean> {
        if(!login || !password) 	
            return false;
        let user = await this.getByLogin(login);
       
        if(!user) 	
            return false;
        if(user.password != password)
            return false;  
        return true;
    }

    async _updateUser (userId: number, userData: IUser) {
        await this.userModel.update(
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

    async getUser(id: number): Promise<IUser>
    {
       return await this.getById(id);
    }

    async updateUser(id: number, userData: IUser): Promise<boolean>
    {
        let user = this.getById(id);
        if(user)
        {
            await this._updateUser(id, userData);
            return true;
        }
        return false;
    }

    async insertUser (userData: IUser): Promise<boolean>
    {    
        await this.userModel.create(
            { 
                login: userData.login, 
                password: userData.password, 
                age: userData.age 
            });
        return true;
    }

    async deleteUser (id: number): Promise<boolean> {
        let user = await this.getById(id);
        if(user)
        {
            user.isdeleted = true;
            await this._updateUser(id, user);
            return true;
        }
        return false;	
    }
}