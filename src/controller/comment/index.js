import commentModel from "../../model/comment/comment.js";
import postModel from "../../model/post/post.js";
import userModel from "../../model/user/user.js";

const commentController = {
  create: async (req, res) => {
    try {
      const userId = req.params.userId;
      const postId = req.params.postId;
      const content = req.body;
      const user = await userModel.findByPk(userId);
      if (!user) {
        return res.status(404).json({ error: "user not found" });
      }
      const post = await postModel.findByPk(postId);
      if (!post) {
        return res.status(404).json({ error: "post not found" });
      }
      const comment = await commentModel.create({
        content,
        author: user.name,
        userId,
        postId,
      });
      return res.status(201).json(comment);
    } catch (error) {
      return res.status(400).json({ error: "something went wrong" });
    }
  },
};

export default commentController;
