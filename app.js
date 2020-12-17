const express = require('express');
const app = express();
require('dotenv').config()

const PORT = process.env.PORT || 3000;

const router = require('./routes')
const cors = require('cors')
const errorHandling = require('./middlewares/errorHandling')

app.use(express.json());
app.use(express.urlencoded({ extended: false}));
app.use(cors());

app.use(router);
app.use(errorHandling);

app.listen(PORT, () => {
    console.log(`Server is running at port : ${PORT}`);
})