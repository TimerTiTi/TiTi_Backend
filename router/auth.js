import express from "express";
import { } from "express-async-errors";
import { body } from "express-validator";
import { validate } from "../middleware/validator.js";
import { isAuth } from "../middleware/auth.js";
import * as authController from "../controller/auth.js";

const router = express.Router();

const validateCredential = [
  body("username")
    .trim()
    .isLength({ min: 5 })
    .notEmpty()
    .withMessage("Invalid username"),
  body("password")
    .trim()
    .isLength({ min: 5 })
    .notEmpty()
    .withMessage("Invalid password"),
  validate,
];

const validateSignup = [
  ...validateCredential,
  body("email").isEmail().normalizeEmail().withMessage("Invalid email"),
  validate,
];

router.post("/signup", validateSignup, authController.signup);
router.post("/login", validateCredential, authController.login);
router.get("/master/users", isAuth, authController.getAll);
router.get("/users", authController.checkUser);
router.post("/users/password", authController.updatePassword);

export default router;
