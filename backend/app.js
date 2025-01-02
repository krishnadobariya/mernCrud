const express = require('express');
require("dotenv").config();
const bodyparser = require('body-parser');
const cors = require('cors')
const app = express();
const db = require('./db/conn')

app.use(cors());
app.use(express.json());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

const port = process.env.PORT || 3000

const userRoutes = require("./router/userRoute")

app.use('/user', userRoutes)


app.listen(port, () => {
    console.log(`server is connected ${port}`);
})
