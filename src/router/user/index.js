import { Router } from "express";
import userController from "../../controller/user/index.js";
import userValidator from "../../validators/user/index.js";

const userRouter = Router();

userRouter.post("/", userValidator.create, userController.create);
userRouter.get("/", userController.getAll);
userRouter.get("/single_user/:userId", userController.getOne);
userRouter.put("/update_user/:userId", userController.update);
userRouter.delete("/delete_user/:userId", userController.delete);

export default userRouter;
