import express, { Request, Response } from "express";
import { body } from "express-validator";
import { validateRequest } from "../middlewares/validate-request";

const router = express.Router();

const validationRules = [
  body("email").isEmail().withMessage("Email must be valid"),
  body("password").trim().notEmpty().withMessage("You must supply a password"),
];

router.post(
  "/api/users/signin",
  validationRules,
  validateRequest,
  async (req: Request, res: Response) => {}
);

export { router as signinRouter };
