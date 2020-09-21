import express from 'express';
import {Logger} from '../utils/logger';

const middleware = (req:express.Request, res: express.Response, next: express.NextFunction) =>
{
  let params = `${JSON.stringify(req.body)}; ${JSON.stringify(req.params)}`
  let logger = new Logger();
  logger.log(`Method was called: ${req.method} ${req.baseUrl} with params: ${params};`);
  next();
}

module.exports = middleware;