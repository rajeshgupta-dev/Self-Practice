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
    if (!name || !age) {
      res.status(405).send({
        success: false,
        message: "all field required"
      })
    }
    const newUser = await userModel.create({ name, age });
    newUser.save();

    res.status(200).send({
      success: true,
      message: "User create succefully"
    });
    console.log("user reate succefully")
  } catch (error) {
    console.log("error to create", error)
    res.status(404).send({
      success: false,
      message: "Something went wrong"
    })
  }
})


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  DB();
  console.log(`Server is Runing on port,${PORT}`);
})