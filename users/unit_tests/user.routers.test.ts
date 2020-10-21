import express from 'express';
const userService = require('../service/users.service');
const logInfo = require('../middleware/logger');
import {UserDAL} from '../data-access/user';
import { userModel } from "../models/user_group";
import {
  mockResponse,
  mockRequest,
  mockNext,
} from '../utils/interceptor';
import { IUser } from "../interfaces/iuser";
import UserController from "../controller/users";


//jest.mock('../data-access/user');
//jest.mock('../models/user_group');
jest.mock('../middleware/logger');
jest.mock('../controller/users');

let testUser: IUser = {
  id: 1,
  login: 'Homer',
  age: 37,
  password: 'homerspwd',
  isdeleted: false
}
let SequelizeMock = require('sequelize-mock');
let DBConnectionMock = new SequelizeMock();
let UserMock = DBConnectionMock.define('users', testUser);


const getSpy = jest.fn();
const postSpy = jest.fn();
const deleteSpy = jest.fn();
const getSuggestionsSpy = jest.fn();

jest.mock('../controller/users', () => {
  return function () {
    return {
      getSuggestions: getSuggestionsSpy,
      getUsers: () => {},
      getUser: () => {},
      deleteUser: () => {},
      addUser: () => {},
      UpdateUser: () => {}
    };
  };
});

jest.doMock('express', () => {
  return {
    Router() {
      return {
        get: getSpy,
        post: postSpy,
        delete: deleteSpy
      }
    }
  }
});

describe('should test router', () => {
  require('../routes/user');
  test('should test get suggestions', () => {
    expect(getSpy).toBeCalledTimes(3);
    expect(deleteSpy).toBeCalledTimes(1);
    expect(postSpy).toBeCalledTimes(2);
    //expect(getSuggestionsSpy).toBeCalledTimes(1);
  });
});