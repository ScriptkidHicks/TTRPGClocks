import { Router } from "express";
import { Member } from "../models/member";

const memberRouter = Router();

memberRouter.post("/login", async (req, res) => {
  console.log("login has been touched.");
});

export { memberRouter };
