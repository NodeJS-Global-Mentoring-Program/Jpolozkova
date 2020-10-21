import express from 'express';
import GroupController from "../controller/group";

jest.mock('../middleware/logger');
jest.mock('../controller/group');

const getSpy = jest.fn();
const postSpy = jest.fn();
const deleteSpy = jest.fn();

jest.mock('../controller/group', () => {
  return function () {
    return {
      getGroups: () => {},
      getGroup: () => {},
      deleteGroup: () => {},
      addGroup: () => {},
      UpdateGroup: () => {}
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
  require('../routes/group');
  test('should test get suggestions', () => {
    expect(getSpy).toBeCalledTimes(2);
    expect(deleteSpy).toBeCalledTimes(1);
    expect(postSpy).toBeCalledTimes(2);
  });
});