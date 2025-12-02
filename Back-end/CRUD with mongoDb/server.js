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

// ===============================GET ALL USER =====================================
app.get("/user", async (req, res) => {
  try {
    const allUser = await userModel.find();
    if (allUser === 0) {
      return res.status(404).send({
        success: false,
        message: "User not found yet"
      });
    }
    res.status(200).send({
      success: true,
      message: "All user found",
      allUser
    })
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Server Error"
    })
  }
})

// =====================================GET USER BY ID (SINGLE USER) =========================

app.get("/user/:id", async(req, res) => {

  const { id } = req.params;

  try {
    const singleUser = await userModel.findById(id);

    if (!singleUser) {
      return res.status(404).send({
        success: false,
        message: "User not Found"
      }); 
    }

    res.status(200).send({
      success: true,
      message: "User Found",
      singleUser
    });

  } catch (error) {
    res.status(500).send({
      success: false,
      message: "server error",
      error: error.message
    });

  }
})

// ======================= CREATE USER==========================
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

// ==============================DELETE USER BY ID=====================================
app.delete("/user/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedUser = await userModel.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).send({
        success: false,
        message: "User not Found",
      })
    }

    res.status(200).send({
      success: true,
      message: "User Deleted succefully",
      deletedUser
    })
  } catch (error) {
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