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
      const post = await postModel.findOne({
        where: {
          id: postId,
          userId: userId,
        },
      });
      if (!post) {
        return res.status(404).json({ error: "no such post found" });
      }
      post.like = post.like + 1;
      post.save();
      return res.status(200).json(post);
    } catch (error) {
      return res.status(400).json({ error: "something went wrong" });
    }
  },
  getAll: async (req, res) => {
    try {
      const posts = await postModel.findAll({
        include: [userModel],
      });
      return res.status(200).json(posts);
    } catch (error) {
      return res.status(400).json({ error: "something went wrong" });
    }
  },
  getOne: async (req, res) => {
    const userId = req.params.userId;
    const postId = req.params.postId;
    const post = await postModel.findOne({
      where: {
        id: postId,
        userId: userId,
      },
    });
    if (!post) {
      return res.status(404).json({ error: "no such post found" });
    }
    return res.status(200).json(post);
  },
  update: async (req, res) => {
    try {
      const userId = req.params.userId;
      const postId = req.params.postId;
      const post = await postModel.findOne({
        where: { id: postId, userId },
      });
      if (!post) {
        return res.status(404).json({ error: "no such post found" });
      }
      const updatedPost = await postModel.update({
        content,
        where: {
          id: postId,
          userId: userId,
        },
      });
      return res.status(202).json(updatedPost);
    } catch (error) {
      return res.status(400).json({ error: "something went wrong" });
    }
  },
  delete: async (req, res) => {
    try {
      const userId = req.params.userId;
      const postId = req.params.postId;
      const post = await postModel.findOne({
        where: {
          id: postId,
          userId,
        },
      });
      if (!post) {
        return res.status(404).json({ error: "no such post found" });
      }
      post.destroy();
      return res.status(200).json({ message: "post deleted succesfuly" });
    } catch (error) {
      return res.status(400).json({ error: "something went wrong" });
    }
  },
};

export default postController;
