import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js";
import hotelsRoute from "./routes/hotels.js";
import roomsRoute from "./routes/rooms.js";
import usersRoute from "./routes/users.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
dotenv.config()

// const port = process.env.PORT;

const connect = async ()=>{
try {
    await mongoose.connect(process.env.MONGO);
    console.log("Connected to Mongodb!!..")
  } catch (error) {
    throw error;
  }
};

mongoose.connection.on("disconnected", ()=>{
    console.log("mongodb disconnected");
})

// middlewares
app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/hotels", hotelsRoute);
app.use("/api/rooms", roomsRoute);

app.listen(process.env.PORT, ()=>{
    connect()
    console.log("Backend is connected!......")
})