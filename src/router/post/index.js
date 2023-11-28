import { Router } from "express";
import postController from "../../controller/post/index.js";

const postRouter = Router();

postRouter.post("/:userId", postController.create);
postRouter.post("/:userId/post/:postId/like", postController.likePost);

export default postRouter;
