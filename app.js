const express = require('express');
const mainRouter = require('./routes/main');

const app = express();
const port = 3000;
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

app.use(express.json())
app.use('/user', mainRouter)

module.exports = app;
