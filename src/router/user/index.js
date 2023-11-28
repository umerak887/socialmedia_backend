import { Router } from "express";
import userController from "../../controller/user/index.js";
import userValidator from "../../validators/user/index.js";

const userRouter = Router();

userRouter.post("/", userValidator.create, userController.create);

export default userRouter;
