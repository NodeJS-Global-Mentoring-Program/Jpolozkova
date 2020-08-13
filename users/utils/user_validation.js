const Joi = require('@hapi/joi')

const validator = require('express-joi-validation').createValidator({ passError: true}) 
const querySchema = Joi.object({
    login: Joi.string().required().alphanum().min(3).max(30),
    password: Joi.string().required().pattern(new RegExp('^[a-zA-Z0-9]')),
    age: Joi.number().integer().required().min(4).max(130),
    isDeleted: Joi.bool().required()
})

exports.validateUser = async(data)=>{
  try{
    const validtionRes = Joi.attempt(data, querySchema);
    return "";
  }
  catch(err)
  {
    return err.details[0].message;
  }
}