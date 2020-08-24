const Joi = require('@hapi/joi')

const validator = require('express-joi-validation').createValidator({ passError: true}) 
const querySchema = Joi.object({
    login: Joi.string().required().alphanum().min(3).max(30),
    password: Joi.string().required().pattern(new RegExp('^[a-zA-Z0-9]')),
    age: Joi.number().integer().required().min(4).max(130),
    isdeleted: Joi.bool()
})

const middleware = (req, res, next) =>
{
    try{
      const validtionRes = Joi.attempt(req.body, querySchema);
      console.log("error", validtionRes); 
      next();
    }
    catch(error)
    {
      const { details } = error; 
      const message = details.map(i => i.message).join(',');
      res.status(422).json({ error: message }) 
    }
  }

module.exports = middleware;