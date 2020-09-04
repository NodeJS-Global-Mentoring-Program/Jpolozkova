import { IUser } from "./iuser";
export interface IUserDAL {
    getUsers(): Array<IUser>;
    getUser(id: number): IUser;
    updateUser(id: number, userData: IUser): boolean;
    insertUser(userData: IUser): boolean;
    deleteUser(id: number): boolean;
  }