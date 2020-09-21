import express from 'express';
import { TokenGenerator } from "../utils/token_generator";
import { ExceptionHandler } from 'winston';

const middleware = async (req:express.Request, res: express.Response, next: express.NextFunction) =>
{
    try{
      let incomeToken = req.headers["x-access-token"];
      if(!incomeToken)
        res.status(401).json({ error: "Unauthorized Error" }) 

      let tokenGen = new TokenGenerator();
      let checkToken = await tokenGen.check_token(incomeToken);

      if(checkToken)
        return next();
      return res.status(403).json({ error: "Auth token is invalid" }) 
    }
    catch(error)
    {
      const { details } = error;   
      const message = details.map((i: any) => i.message).join(',');
      res.status(422).json({ error: message }) 
    }
}

module.exports = middleware;