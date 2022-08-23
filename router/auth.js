import express from "express";
import {} from "express-async-errors";
import { body } from "express-validator";
import * as authController from "../controller/auth.js";

const router = express.Router();

const validateCredential = [
  body("username")
    .trim()
    .notEmpty()
    .withMessage("username should be at least 5 characters"),
  body("password")
    .trim()
    .isLength({ min: 5 })
    .notEmpty()
    .withMessage("password should be at least 5 characters"),
];

const validateSignup = [
  ...validateCredential,
  body("email").isEmail().normalizeEmail().withMessage("invalid email"),
];

router.post("/signup", validateSignup, authController.signup);

export default router;
