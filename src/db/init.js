import commentModel from "../model/comment/comment.js";
import postModel from "../model/post/post.js";
import userModel from "../model/user/user.js";

const dbInit = async () => {
  userModel.sync({
    alter: true,
    force: false,
    logging: false,
  });
  postModel.sync({
    alter: true,
    force: false,
    logging: false,
  });
  commentModel.sync({
    alter: true,
    force: false,
    logging: false,
  });
};

export default dbInit;
