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
import admin from 'firebase-admin';


admin.initializeApp({
  credential: admin.credential.cert('./key.json'),
  databaseURL: "https://anniversarybangkokhatyai-default-rtdb.asia-southeast1.firebasedatabase.app"
});

const db = admin.database();

const donate = express.Router();
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
    console.log("Connected to the Tasks DB");
    const result = await client.query(query);

    return result.rows;

  } catch (error) {

    console.error("Error connecting to the database", error);

  } finally {
    await client.end();
  }

}


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });


// donate.delete("/tasks/:id", async (req, res) => {
//   const taskID = req.params.id;
//   console.log(taskID);
//   let query = `DELETE FROM public.tasks
//   WHERE row_id=${taskID};`;

//   try {
//     await connectToDB(query);
//     res.status(200).json({ success: "Delete Task", data: { id: taskID } });
//   } catch (error) {
//     res.status(500).json({ error: "Error on add task " + error });
//   }
// });

donate.get("/hello", async (req, res) => {
    // const query=`select *  from donate_list `
    try {
        const result = await connectToDB(query);
        res.status(200).json({ success: true,data:[{id:3}]});
    } catch (error) {
        res.status(500).json({ error: "Error on add task " + error });
    }
});

donate.post('/insert/data', async (req, res) => {
  try {
    const input = req.body;
    // const user = {
    //   name: 'John Doe',
    //   email: 'johndoe@example.com'
    // };
    
    const ref = db.ref('donate').push();
    await ref.set(input);
    res.status(200).json({ id: ref.key });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

donate.get('/get/data', async (req, res) => {
  try {
    const snapshot = await db.ref('donate').once('value');
    if (snapshot.exists()) {
      const data = Object.values(snapshot.val());
      res.status(200).json({success:true,data:data})
    } else {
      res.status(404).json({ error: 'Data not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

donate.post('/insert/donate',async(req,res)=>{

    const input =req.body;
    console.log(input);
    const query_organization = `INSERT INTO donate_list
    (organization_name, organization_address, organization_phone, donate_total, contact_name, contact_phone, contact_email, payment_type, payment_status, tree_status, record_time, isactive)
    VALUES( '${input.organization_name}', '${input.organization_address}', '${input.organization_phone}', '${input.donate_total}', '${input.contact_name}', '${input.contact_phone}', '${input.contact_email}', '${input.donate_type}', false , false, now() , true ) `;
    try{
        const result = await connectToDB(query_organization);
        const ref = db.ref('donate').push();
        await ref.set(input);
        // res.status(200).json({ success: true,data:result});

        res.status(200).json({ success: true});
    }catch(error){
        res.status(500).json({ error: "Error on add task " + error });
    }
});
  
donate.get('/get/donate',async(req,res)=>{
    const input = req.body;
    const query = `SELECT row_id, organization_name, organization_address, organization_phone, donate_total, contact_name, contact_phone, contact_email, payment_type, payment_status, tree_status, record_time, isactive
    FROM donate_list dl where dl.isactive = true ; `;
    try{
        const result = await connectToDB(query);
        if(result.length >0){
            res.status(200).json({success:true,data:result});
        }else{
            res.status(204).json({success:true})
        }
    }catch(error){
        res.status(500).json({success:false,Error:'Error :'+error})
    }
})


export default donate;
