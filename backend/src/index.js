const bodyParser = require("body-parser");
const cors = require("cors");
//const corsOptions = require("cors");
const express = require("express");
const dotenv = require('dotenv').config();
const infoObjectController = require('./controllers/infoObject.controller.js')
//import * as infoObjectController from './controllers/infoObject.controller.js';


let router = require("express").Router();
const app = express();

let corsOptions = {
    origin: 'http://localhost:3000',
}

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send("Hello World!");
})

app.get('info-object/duplicate-check', infoObjectController.duplicateCheck);

app.post('/api/info-object/upload', (req, res) => infoObjectController.create(req, res));


app.listen(3000, () => console.log('Server is running'));

// const mongoose = require('mongoose');
//
// mongoose.connect(
//     process.env.MONGODB_URI,
//     {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//     }
// )

// module.exports = {
//     mongoose
// }
