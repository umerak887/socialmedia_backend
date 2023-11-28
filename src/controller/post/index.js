import postModel from "../../model/post/post.js";
import userModel from "../../model/user/user.js";

const postController = {
  create: async (req, res) => {
    try {
      const userId = req.params.userId;
      const user = await userModel.findByPk(userId);
      if (!user) {
        return res.status(404).status({ error: " User does not exist" });
      }
      const { content } = req.body;
      const post = await postModel.create({
        author: user.name,
        content,
        userId,
      });
      return res.status(201).json(post);
    } catch (error) {
      return res.status(400).json({ error: "something went wrong" });
    }
  },
  likePost: async (req, res) => {
    try {
      const userId = req.params.userId;
      const postId = req.params.postId;
      const user = await userModel.findOne({
        where: {
          id: userId,
        },
      });
      if (!user) {
        return res.status(404).json({ error: "user not found" });
      }
      const post = await postModel.findOne({
        where: {
          id: postId,
        },
      });
      if (!post) {
        return res.status(404).json({ error: "post not found" });
      }
      post.like = post.like + 1;
      post.save();
      return res.status(200).json(post);
    } catch (error) {
      return res.status(400).json({ error: "something went wrong" });
    }
  },
};

export default postController;
