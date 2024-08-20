import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import http from 'http';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs'

import functions from 'firebase-functions'
import firebaseFunction from 'firebase-functions/v2';



const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.static(path.join(__dirname, 'assets')))

import dotenv from 'dotenv';
import axios from 'axios';

if (process.env.NODE_ENV === 'prod') {
    dotenv.config({ path: '.env.prod' });
} else {
    dotenv.config({ path: '.env.dev' });
}

import apiRounter from './routes/api.js';
import donate from './routes/donate.js';

app.set("view engine", "ejs");
app.set('views', path.join(__dirname, '/views'));

const api = axios.create({
    baseURL: process.env.BASE_URL,
    timeout: 15000,
});

// Allow all origins with all methods
app.use(cors({ origin:['http://172.16.2.85:5173','http://127.0.0.1:5173','http://localhost:5173'] }));
app.disable('x-powered-by');


app.use((req, res, next) => {
    
    console.log("*------ Request ------");

    console.log(`${req.method} : ${req.url}`)
    next();
});

function listRoutes() {
    const routes = [];
    app._router.stack.forEach((middleware) => {
        if (middleware.route) {
            routes.push(middleware.route);
        } else if (middleware.name === 'router') {
            middleware.handle.stack.forEach((handler) => {
                const route = handler.route;
                route && routes.push(route);
            });
        }
    });

    return routes;
}



app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())


app.use('/api',apiRounter);
app.use('/form',donate);

 const port = process.env.PORT || 8080;
 const server = app.listen(port, () => {
     console.log(`start at  http://localhost:${port}`)
 })


export default functions.https.onRequest(app)
