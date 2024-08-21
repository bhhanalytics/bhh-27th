import dotenv from "dotenv";
import { createWriteStream } from "fs";
import { fileURLToPath } from "url";
import path from "path";
import fs from "fs";
import crypto from "crypto-js";
import chalk from "chalk";
import express from "express";
import axios from "axios";
import pg from "pg";
import dayjs from "dayjs";
import multer from "multer";

const apiRouter = express.Router();
dotenv.config();

const api = axios.create({
  baseURL: "http://localhost:8080",
  timeout: 15000,
});

const { Client } = pg;

const dbConfig = {
  user: "cloudsql_bhh_birthdate",
  password: "mA^Ze^J0s~^9Ucu:",
  database: "bhh-27th",
  host: "34.87.17.238",
  port: "5432",
};

async function connectToDB(query = "") {
  const client = new Client(dbConfig);

  try {

    await client.connect();
    console.log("Connected to the DB");
    const result = await client.query(query);

    return result.rows;

  } catch (error) {

    console.error("Error connecting to the database", error);

  } finally {
    await client.end();
  }

}

apiRouter.get("/hello", async (req, res) => {
    const query=`select *  from donate_list `
    try {
        const result = await connectToDB(query);
        res.status(200).json({ success: true,data:[{id:3}]});
    } catch (error) {
        res.status(500).json({ error: "Error on add task " + error });
    }
});

apiRouter.get('/donate',async(req,res)=>{
    const input = req.body;
    const query = `SELECT row_id, organization_name, organization_address, organization_phone, donate_total, contact_name, contact_phone, contact_email, payment_type, payment_status, tree_status, record_time, isactive
    FROM donate_list dl where dl.isactive = true ; `;
    try{
        const result = await connectToDB(query);
        if(result.length > 0){
            res.status(200).json({success:true,data:result});
        }else{
            res.status(204).json({success:true})
        }
    }catch(error){
        res.status(500).json({success:false,Error:'Error :'+error})
    }
})


export default apiRouter;
