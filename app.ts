import express from 'express';
const userRouter = require('./users/routes/user');
const groupRouter = require('./users/routes/group');
const userGroupRouter = require('./users/routes/user_group');
const logger = require('./users/middleware/logger');

const app = express();
const port = process.env.PORT || 3004;
app.listen(port, () => {
    logger.log(`App listening at localhost:${port}`);
})

app.use(express.json())
app.use('/usergroup', userGroupRouter)
app.use('/user', userRouter)
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