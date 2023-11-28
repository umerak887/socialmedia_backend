import { Router } from "express";
import followerController from "../../controller/follower/index.js";

const followerRouter = Router();

followerRouter.post(
  "//:userId/followee/:followeeId",
  followerController.create
);

export default followerRouter;
