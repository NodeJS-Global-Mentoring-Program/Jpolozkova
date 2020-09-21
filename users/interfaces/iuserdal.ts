import { IUser } from "./iuser";
export interface IUserDAL {
    getUsers(): Promise<Array<IUser>>;
    getUser(id: number): Promise<IUser>;
    updateUser(id: number, userData: IUser): Promise<boolean>;
    insertUser(userData: IUser): Promise<boolean>;
    deleteUser(id: number): Promise<boolean>;
    checkLogin(login: string, passwrod: string):  Promise<boolean>;
  }