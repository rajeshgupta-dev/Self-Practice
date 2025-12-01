import express from 'express'
const app = express();
import dotenv from "dotenv";
import { DB } from './config/db.js';
import userModel from './model/user.model.js';
dotenv.config();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Home")
})

app.post("/create", async (req, res) => {
  try {

    const { name, age } = req.body;
    const newUser = await userModel.create({ name, age });

    res.status(200).send(newUser);
    console.log("user reate succefully")
  } catch (error) {
    console.log("error to create", error)
  }
})


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  DB();
  console.log(`Server is Runing on port,${PORT}`);
})