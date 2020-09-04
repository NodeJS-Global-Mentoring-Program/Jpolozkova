import express from 'express';
const Joi = require('@hapi/joi')
import { Permissions } from '../utils/permissions';

const querySchema = Joi.object({
    name: Joi.string().required().alphanum().min(3).max(30),
    //permissions: Joi.array().items(Joi.valid(Object.values(Permissions).join())).required()
    permissions: Joi.array().items(Joi.valid("Read", "Write", "Delete", "Share", "UploadFile")).required()
})

const middleware = (req:express.Request, res: express.Response, next: express.NextFunction) =>
{
    try{
      Joi.attempt(req.body, querySchema);
      next();
    }
    catch(error)
    {
      const { details } = error;   
      const message = details.map((i: any) => i.message).join(',');
      res.status(422).json({ error: message }) 
    }
}

module.exports = middleware;