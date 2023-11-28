import commentController from "../../controller/comment/index.js";
import { Router } from "express";

const commentRouter = Router();

commentRouter.post("/user/:userId/post/:postId", commentController.create);
commentRouter.get("/", commentController.getAll);
commentRouter.get(
  "/users/:userId/post/:postId/comment/:commentId",
  commentController.getOne
);
commentRouter.put(
  "/user/:userId/post/:postId/update_comment/:commentId",
  commentController.update
);

export default commentRouter;
