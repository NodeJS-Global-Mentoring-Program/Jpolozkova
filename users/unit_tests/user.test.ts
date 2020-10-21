import {UserService} from '../service/users.service';
import {UserDAL} from '../data-access/user';
import { IUser } from "../interfaces/iuser";
import router from "../routes/user";
const userService = require('../service/users.service');

let testUser: IUser = {
  id: 1,
  login: 'Homer',
  age: 37,
  password: 'homerspwd',
  isdeleted: false
}

let updUser: IUser = {
  id: 1,
  login: 'Homer Simpson',
  age: 37,
  password: 'homerspwd',
  isdeleted: false
}

let SequelizeMock = require('sequelize-mock');
let DBConnectionMock = new SequelizeMock();
let UserMock = DBConnectionMock.define('users', testUser);

//because of this: https://github.com/BlinkUX/sequelize-mock/pull/85
UserMock.findByPk = UserMock.findById;

const users = new UserService(new UserDAL(UserMock));

describe("Test User Service", () => {  
  it("Get login of first user in the Mock", async () => {
    let user : IUser = await users.getUser(1);
    expect(user.login).toEqual(testUser.login);
  }),
  it("Get users number from Mock", async () => {
    let list: IUser[] = await users.getUsers()
    expect(list.length).toBe(1);
  }),
  it("Update user in a Mock", async () => {
    let updResult = await users.updateUser(testUser.id, updUser)
    expect(updResult).toEqual(true);
  })
})