import mongoose from "mongoose";

export async function DB() {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("MongoDB connect succefully");
  } catch (error) {
    console.log("MongoDB connetion failed", error);
    process.exit(1);
  }
}