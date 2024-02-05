import express, { Request, Response } from "express";
import dotevn from "dotenv";
import mongoose from "mongoose";
import cors from "cors";

dotevn.config();
mongoose.set("strictQuery", false);

const app = express();
const port = process.env.Port;
const db = mongoose.connection;

db.on("error", (error: Error) => {
  console.log(error);
});

db.on("open", () => {
  console.log("I have made a connection to the database");
});

app.use(express.json());

app.use(
  cors({
    origin: process.env.ORIGIN,
  })
);

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to Express & TypeScript Server");
});

app.listen(port, () => {
  console.log(process.env.ORIGIN);
  console.log(`Server is Fire at http://localhost:${port}`);
});
