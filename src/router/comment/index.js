import commentController from "../../controller/comment/index.js";
import { Router } from "express";

const commentRouter = Router();

commentRouter.post("/user/:userId/post/:postId", commentController.create);

export default commentRouter;
