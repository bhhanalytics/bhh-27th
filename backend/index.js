import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import http from 'http';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs'

import dotenv from 'dotenv';
import axios from 'axios';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.static(path.join(__dirname, 'assets')))



// Load environment variables based on the current environment
if (process.env.NODE_ENV === 'prod') {
    dotenv.config({ path: '.env.prod' });
} else {
    dotenv.config({ path: '.env.dev' });
}




app.set("view engine", "ejs");
app.set('views', path.join(__dirname, '/views'));

const api = axios.create({
    baseURL: process.env.BASE_URL,
    timeout: 15000,
});

// Allow all origins with all methods
app.use(cors());
app.disable('x-powered-by');

/*
app.set('trust proxy', 1) // trust first proxy

app.use(cookieParser());

/* app.use(session({
  name: "user",
  secret: 'captzApi_sess',
  saveUninitialized: true,
  resave: false,
  cookie: { secure: false ,maxAge: 6000000},
}))
 */

app.use((req, res, next) => {
    console.log("Running on "+ process.env.NODE_ENV.toUpperCase());
    
    console.log("*------ Request ------");

    console.log(`${req.method} : ${req.url}`)
    next();
});


app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors());


console.log("Running on "+process.env.NODE_ENV);

const routesPath = path.resolve('./Routes');
const routeFiles = fs.readdirSync(routesPath);

Promise.all(
  routeFiles.map(async (file) => {
    const route = await import(path.join(routesPath, file));
    const routeName = file.split('.js')[0]
    app.use(`/api/${routeName}`, route.default);
  })
).then(() => {
  app.listen(8080, () => {
    console.log('Running on http://localhost:8080');
  });
}).catch(err => {
  console.error('Error loading routes:', err);
});

