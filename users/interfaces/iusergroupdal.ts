import { IUser } from "./iuser";

export interface IUserGroupDAL {
  getUsersInGroup(id: number): Array<IUser>;
  addUsersToGroup(id: number, userIds: Array<number>): void;
}