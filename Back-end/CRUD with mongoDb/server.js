import express from 'express'
const app = express();
import dotenv from "dotenv";
import { DB } from './config/db.js';
dotenv.config();

app.get("/", (req, res) => {
  res.send("Home")
})


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  DB();
  console.log(`Server is Runing on port,${PORT}`);
})