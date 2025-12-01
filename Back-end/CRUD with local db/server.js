const express = require("express");
const app = express();
const fs = require("fs-extra");

const DB_PATH = "./utils/db.json";

app.use(express.json());

// Read DB
async function readData() {
  return await fs.readJSON(DB_PATH);
}

// Write DB
async function writeData(data) {
  await fs.writeJSON(DB_PATH, data, { spaces: 2 });
}

app.post("/create", async (req, res) => {
  const db = await readData();

  const newUser = {
    id: Date.now(),
    name: req.body.name
  };

  db.users.push(newUser);
  await writeData(db);

  res.status(201).json({ message: "User Created", user: newUser });
  console.log("user created");
});

app.get("/", (req, res) => {
  res.send("This is Home Page");
});
app.get("/user", async (req, res) => {
  const allUser = await readData();

  console.log(allUser);
  res.json(allUser);
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
