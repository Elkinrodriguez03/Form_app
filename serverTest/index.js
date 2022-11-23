import express from 'express';
import morgan from 'morgan';
import {router} from './routes/index.js';
import cors from 'cors';
import bodyParser from 'body-parser';
import { connect } from './db/dbconfig.js';

const PORT = process.env.PORT ||  3003;

const app = express();


app.use(express.json());

app.use(cors({
    "origin": "*",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 204,
    "allowedHeaders": "*"
}));

app.use(morgan('combined'));

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

connect();

app.use('/api', router);

app.listen(PORT, () => {
    console.log(`Server Started at ${PORT}`)
});
