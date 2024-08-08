import dotenv from 'dotenv';
import { createWriteStream } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';

import crypto from 'crypto-js'
import chalk from 'chalk'
import express from 'express';
import axios from 'axios';
import pkg from 'pg';
import dayjs from 'dayjs';

const router = express.Router();
dotenv.config()

const api = axios.create({
    baseURL: process.env.BASE_URL,
    timeout: 15000,
});

const { Client } = pkg;

const dbConfig = {
    user: process.env.TELEHEALTH_USER,
    password: process.env.TELEHEALTH_PASSWORD,
    database: process.env.TELEHEALTH_DATABASE,
    host: process.env.TELEHEALTH_HOST,
    port: process.env.TELEHEALTH_PORT,
};


const encodeMD5 = (data) => {
    return crypto.MD5(data).toString();
};


router.get('/', (req, res) => {
    res.send('D-KUB');
  });

export default router

