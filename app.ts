import express from 'express';
import { mainRouter } from ('../users/routes/main');


const app = express();
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

app.use(express.json())
app.use('/user', mainRouter)

app.all('*', function(req, res, next){
    res.status(404).send('Not found');
});

export default app;