import express from "express";
import "express-async-errors";
import { currentUserRouter } from "./routes/current-user";
import { signinRouter } from "./routes/signin";
import { signoutRouter } from "./routes/signout";
import { signupRouter } from "./routes/signup";
import { errorHandler } from "./middlewares/error-handler";
import { NotFoundError } from "./errors/not-found-error";
import mongoose from "mongoose";
import cookieSession from "cookie-session";

const app = express();

app.set("trust proxy", true);
app.use(express.json());
app.use(cookieSession({ signed: false, secure: true }));

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

app.all("*", async () => {
  throw new NotFoundError();
});

app.use(errorHandler);

const start = async () => {
  try {
    if (!process.env.JWT_KEY) {
      throw new Error("JWT_KEY must be defined");
    }

    await mongoose.connect("mongodb://auth-mongo-srv:27017/auth");

    console.log("Connected to DB");

    app.listen(3000, () => {
      console.log("Listening on port 3000");
    });
  } catch (err) {
    console.error(err);
  }
};

start();
