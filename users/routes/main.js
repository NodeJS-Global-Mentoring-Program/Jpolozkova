const express = require('express');
const router = express.Router();
const userService = require('../service/users.service');
const userDAL = require('../data-access/user');
const autoSuggest = require('../utils/auto_suggestion');
const errorHandler = require('../utils/error_handler');
const validationMiddleware = require('../middleware/user_validation');

const users = new userService(userDAL);

router.get('/autoSuggest', async (req, res) => {
    let result = await autoSuggest.getAutoSuggestUsers(req.body.substr, req.body.limit);
    res.send(result);
})

router.get('/', async (req, res, next) => {   
    res.send(await errorHandler.executeQuery(await users.getUsers(), next));
})

router.get('/:id', async (req, res, next) => {
    const user = await errorHandler.executeQuery(await users.getUser(req.params.id), next);
    res.send(user);
})

router.delete('/:id', async (req, res, next) => {
    let result = await errorHandler.executeQuery(await users.deleteUser(req.params.id), next);
    if(result)
        res.send(await users.getUsers());
    else
        res.status(400).end();
})

router.post('/', validationMiddleware, async (req, res, next) => {
    let result = await errorHandler.executeQuery(await users.insertUser(req.body), next);
    res.send(await users.getUsers());
})

router.post('/:id', validationMiddleware, async (req, res, next) => {
    let result = await errorHandler.executeQuery(await users.updateUser(req.params.id, req.body, next));
    res.send(await users.getUsers());
})

/*
app.use((err, req, res, next) => {
    if (err && err.error && err.error.isJoi) {
      res.status(400).json({
        type: err.type, 
        message: err.error.toString()
      });
    } else {
      next(err);
    }
  });*/


module.exports = router;
