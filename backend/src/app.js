import express from "express";
import { createServer } from "node:http";
import dns from "node:dns";
import dotenv from "dotenv";

dotenv.config();

import { Server } from "socket.io";
import mongoose from "mongoose";
import { connectToSocket} from "./controller/socketManager.js";
import cors from "cors";
import { connect } from "node:http2";
import userRoutes from "./routes/users.routes.js";


const app = express();
const server = createServer(app);
const io = connectToSocket(server);

dns.setServers(["8.8.8.8", "8.8.4.4"]);

app.set("port", (process.env.PORT || 8000));
app.use(cors());
app.use(express.json({limit: "40kb"}))
app.use(express.urlencoded({limit: "40kb",extended:true}));

app.use("/api/v1/users", userRoutes); 

const start = async (app) => {
  app.set("mongo_user");

  const connectionDb = await mongoose.connect(
    "mongodb+srv://sundark682005_db_user:%40neha123456@cluster0.tnai2iv.mongodb.net/?appName=Cluster0");

console.log(`MONGO Connected DB host : ${connectionDb.connection.host}`);
  server.listen(app.get("port"), () => {
    console.log("LISTENING ON PORT 8000");
  });
};

start(app);