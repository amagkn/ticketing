import express, { Request, Response } from "express";
import { body } from "express-validator";
import { validateRequest } from "../middlewares/validate-request";
import { User } from "../models/user";
import { BadRequestError } from "../errors/bad-request-error";
import { Password } from "../services/password";
import jwt from "jsonwebtoken";

const router = express.Router();

const validationRules = [
  body("email").isEmail().withMessage("Email must be valid"),
  body("password").trim().notEmpty().withMessage("You must supply a password"),
];

router.post(
  "/api/users/signin",
  validationRules,
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      throw new BadRequestError("Invalid credentials");
    }

    const passwordIsValid = await Password.compare(user.password, password);

    if (!passwordIsValid) {
      throw new BadRequestError("Invalid credentials");
    }

    const userJwt = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_KEY!
    );

    req.session = { jwt: userJwt };

    return res.status(200).send(user);
  }
);

export { router as signinRouter };
