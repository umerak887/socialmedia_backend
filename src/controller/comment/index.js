import commentModel from "../../model/comment/comment.js";
import postModel from "../../model/post/post.js";
import userModel from "../../model/user/user.js";

const commentController = {
  create: async (req, res) => {
    try {
      const id = req.session.user.id;
      const postId = req.params.postId;
      const content = req.body;
      const user = await userModel.findByPk(id);
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
        userId: id,
        postId,
      });
      return res.status(201).json(comment);
    } catch (error) {
      return res.status(400).json({ error: "something went wrong" });
    }
  },
  getAll: async (req, res) => {
    try {
      const id = req.session.user.id;
      const comments = await commentModel.findAll({
        where: {
          userId: id,
        },
        // include: [userModel, postModel],
      });
      return res.status(200).json(comments);
    } catch (error) {
      return res.status(400).json({ error: "something went wrong" });
    }
  },
  getOne: async (req, res) => {
    try {
      const id = req.session.user.id;
      const { postId, commentId } = req.params;
      const comment = await commentModel.findOne({
        where: {
          id: commentId,
          postId,
          userId: id,
        },
      });
      if (!comment) {
        return res.status(400).json({ error: "no such comment found" });
      }
      return res.status(200).json(comment);
    } catch (error) {
      return res.status(400).json({ error: "something went wrong" });
    }
  },
  update: async (req, res) => {
    try {
      const id = req.session.user.id;
      const { postId, commentId } = req.params;
      const { content } = req.body;
      const comment = await commentModel.findOne({
        where: {
          id: commentId,
          userId: id,
          postId,
        },
      });
      if (!comment) {
        return res.status(404).json({ error: "no such comment found" });
      }
      const updatedComment = await commentModel.update({
        content,
        where: {
          id: commentId,
        },
      });
      return res.status(201).json(updatedComment);
    } catch (error) {
      return res.status(400).json({ error: "something went wrong" });
    }
  },
};

export default commentController;
