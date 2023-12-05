import { Router } from "express";
import userValidator from "../../validators/user/index.js";
import AuthController from "../../controller/auth/index.js";
import AuthenticateMiddleware from "../../middleware/authenticate.js";
const userRouter = Router();

userRouter.post("/register", userValidator.register, AuthController.register);
// userRouter.post("/login", userValidator.login, AuthController.login);

//due to session not working cannot use the authenticatemiddleware
userRouter.post(
  "/login",
  //   AuthenticateMiddleware,
  userValidator.login,
  AuthController.login
);

export default userRouter;
