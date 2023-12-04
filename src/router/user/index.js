import { Router } from "express";
import userValidator from "../../validators/user/index.js";
import AuthController from "../../controller/auth/index.js";

const userRouter = Router();

userRouter.post("/register", userValidator.register, AuthController.register);
userRouter.post(
  "/login",
  userValidator.login,
  userValidator.login,
  AuthController.login
);

export default userRouter;
