const express = require('express');
const router = express.Router();
const users = require('../controllers/users.service');
const autoSuggest = require('../utils/auto_suggestion');
const Joi = require('@hapi/joi')

/*const validator = require('express-joi-validation').createValidator({ passError: true}) 
const querySchema = Joi.object({
    id: Joi.int().required(),
    login: Joi.string().required(),
    password: Joi.string().required(),
    age: Joi.int().required(),
    isDelited: Joi.bool().required()
})*/


router.get('/autoSuggest', async (req, res) => {
    let result = await autoSuggest.getAutoSuggestUsers(req.body.substr, req.body.limit);
    res.send(result);
})

router.get('/', async (req, res) => {
    res.send(await users.getUsers());
})

router.get('/:id', async (req, res) => {
    const user = await users.getUser(req.params.id);
    res.send(user);
})

router.delete('/:id', async (req, res) => {
    let result = await users.deleteUser(req.params.id);
    if(result)
        res.send(await users.getUsers());
    else
        res.status(400).end();
})

router.post('/', async (req, res) => {
    let result = await users.insertUser(req.body);
    if(result)
        res.send(await users.getUsers());
    else
        res.status(400).end()
})

router.post('/:id', async (req, res) => {
    let result = await users.updateUser(req.params.id, req.body);
    if(result)
        res.send(await users.getUsers());
    else
        res.status(400).end()
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
