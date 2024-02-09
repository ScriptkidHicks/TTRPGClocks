import { Router } from "express";
import { Member } from "../models/member";

const memberRouter = Router();

memberRouter.get("/", async (req, res) => {
  console.log("base members route has been touched");
});

memberRouter.post("/", async (req, res) => {
  const isCreate = req.body.isCreate;
  if (isCreate == null) {
    res.status(400);
    res.send("Request provided without correct login/create status.");
    return;
  }

  const name = req.body.name;
  const password = req.body.password;
  const email = req.body.email;

  if (name == null || password == null || (isCreate && email == null)) {
    res.status(400);
    res.send(
      "Request provided without valid email, name, or password information"
    );
    return;
  }
});

export { memberRouter };
