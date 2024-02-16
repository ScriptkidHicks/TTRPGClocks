import { Router, json } from "express";
import { Member } from "../models/member";
import bcrypt from "bcryptjs";
import jwt, { verify } from "jsonwebtoken";

const memberRouter = Router();

memberRouter.get("/", async (req, res) => {});

//create or log in a member
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

  if (isCreate) {
    // if this is a create request, then the client is trying to create an account
    const extantMemberByName = await Member.findOne({ name: name });
    if (extantMemberByName != null) {
      res.status(302);
      res.send("A member with that username already exists.");
      return;
    }

    const extandMemberByEmail = await Member.findOne({ email: email });
    if (extandMemberByEmail != null) {
      res.status(302);
      res.send("That email is already in use.");
      return;
    }

    const salt = await bcrypt.genSalt(Number(process.env.ITERATION_COUNT));
    const hashedPassword = bcrypt.hashSync(password, salt);
    const newMember = new Member({
      name: name,
      hashedPassword: hashedPassword,
      email: email,
    });
    try {
      newMember.save();
      res.status(201);
      if (process.env.JWT_SECRET != null) {
        res.send({
          jwt: jwt.sign({ username: name }, process.env.JWT_SECRET),
        });
      }
      return;
    } catch (error) {
      //else the client is trying to log someone in.
      res.status(500);
      res.send(error);
      return;
    }
  } else {
    const foundMember = await Member.findOne({ name: name });
    if (foundMember == null) {
      res.status(412);
      res.send();
      return;
    } else {
      if (bcrypt.compareSync(password, foundMember.hashedPassword)) {
        res.status(200);
        if (process.env.JWT_SECRET != null) {
          res.send({
            jwt: jwt.sign({ username: name }, process.env.JWT_SECRET),
          });
        }
        return;
      } else {
        res.status(400);
        res.send("Bad password");
        return;
      }
    }
  }
});

//verify a cookie
memberRouter.get("/verify", async (req, res) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer") &&
    process.env.JWT_SECRET != null
  ) {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET
      ) as jwt.JwtPayload;

      if (!decoded) {
        res.status(400);
        res.send("Invalid Token");
        return;
      }

      const foundMember = Member.findOne({ name: decoded.username }).select(
        "-hashedPassword"
      );
      if (!foundMember) {
        res.status(400);
        res.send("Invalid Token. User does not exist");
        return;
      }

      //we've found a matching member. This person is logged in.
      res.status(200);
      res.send();
      return;
    } catch (error) {
      res.status(500);
      res.send(error);
      return;
    }
  }
});

export { memberRouter };
