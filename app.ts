import express from 'express';
const userRouter = require('./users/routes/user');
const groupRouter = require('./users/routes/group');
const userGroupRouter = require('./users/routes/user_group');

const app = express();
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

app.use(express.json())
app.use('/usergroup', userGroupRouter)
app.use('/user', userRouter)
app.use('/group', groupRouter)

app.all('*', function(req, res, next){
    res.status(404).send('Not found');
});

export default app;