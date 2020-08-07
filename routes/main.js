const express = require('express');
const router = express.Router();
const users = require('../models/users');
const autoSuggest = require('../controllers/auto_suggestion');
//const Joi = require('joi')

/*const validator = require('express-joi-validation').createValidator({ passError: true}) 
const querySchema = Joi.object({
    id: Joi.int().required(),
    login: Joi.string().required(),
    password: Joi.string().required(),
    age: Joi.int().required(),
    isDelited: Joi.bool().required()
})*/

router.get('/', (req, res) => {
    (async () => {
        res.send(await users.getUsers());
    })()
})

router.get('/:id', (req, res) => {
    (async () => {
        const user = await users.getUser(req.params.id);
        res.send(user);
    })()
})

router.delete('/:id', (req, res) => {
    (async () => {
        let result = await users.deleteUser(req.params.id);
        if(result)
            res.send(await users.getUsers());
        else
            res.status(400).end()
    })()
})

router.post('/', (req, res) => {
    (async () => {
        let result = await users.putOrUpdateUser(req.body);
        if(result)
            res.send(await users.getUsers());
        else
            res.status(400).end()
    })()  
})

router.post('/autoSuggest', (req, res) => {
    (async () => {
        let result = await autoSuggest.getAutoSuggestUsers(req.body.substr, req.body.users);
        res.send(result);
    })()  
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
