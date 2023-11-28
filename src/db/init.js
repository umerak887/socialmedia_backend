import commentModel from "../model/comment/comment.js";
import followerModel from "../model/follower/follower.js";
import postModel from "../model/post/post.js";
import userModel from "../model/user/user.js";

const dbInit = async () => {
  postModel.sync({
    alter: true,
    force: false,
    logging: false,
  });
  userModel.sync({
    alter: true,
    force: false,
    logging: false,
  });
  commentModel.sync({
    alter: true,
    force: false,
    logging: false,
  });
  followerModel.sync({
    alter: true,
    force: false,
    logging: false,
  });
};

export default dbInit;
