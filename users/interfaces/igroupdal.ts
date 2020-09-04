import { IGroup } from "./igroup";
export interface IGroupDAL {
    getGroups(): Array<IGroup>;
    getGroup(id: number): IGroup;
    updateGroup(id: number, groupData: IGroup): boolean;
    insertGroup(groupData: IGroup): boolean;
    deleteGroup(id: number): boolean;
  }