import express from 'express';
import cors from 'cors';
import userRouter from './users/routes/user';
import groupRouter from './users/routes/group';
const userGroupRouter = require('./users/routes/user_group');
const loginRouter = require('./users/routes/login');
import {Logger} from './users/utils/logger';
const authValidation = require('./users/middleware/auth_validation');

const app = express();
const port = process.env.PORT || 3004;
const logger = new Logger();
app.listen(port, () => {
  logger.log(`App listening at localhost:${port}`);
})

app.use(express.json())
app.use(cors())
app.use('/login', loginRouter)
app.use('/user', userRouter)

app.use(authValidation)
app.use('/usergroup', userGroupRouter)
app.use('/group', groupRouter)

app.all('*', function(req, res, next){
    res.status(404).send('Not found');
});

app.use(function errorHandler (err: Error, req: express.Request, res: express.Response, next: express.NextFunction) {
    logger.logError(`General error handler receive an error: ${err.message} `);
    res.status(500);
    res.json({
      message: err.message,
      error: err
    });
  })

process.on('unhandledRejection', (reason, p) => {
  console.log(`promise logging : ${p}`);
    logger.logError(`${reason}; Unhandled Rejection at ${p}`);
  }).on('uncaughtException', err => {
    logger.logError(`${err} Uncaught Exception thrown`);
});

export default app;