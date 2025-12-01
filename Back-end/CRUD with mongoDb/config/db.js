import mongoose from "mongoose";

export async function DB() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/crudWithMondoDB");
    console.log("MongoDB connect succefully");
  } catch (error) {
    console.log("MongoDB connetion failed", error);
    process.exit(1);
  }
}