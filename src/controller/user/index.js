import { where } from "sequelize";
import postModel from "../../model/post/post.js";
import userModel from "../../model/user/user.js";
import jwt from "jsonwebtoken";
import userModel from "../../model/user/user.js";

const userController = {
  create: async (req, res) => {
    try {
      const { name, email, password } = req.body;
      const user = await userModel.findOne({
        where: {
          email,
        },
      });
      if (email) {
        return res
          .status(400)
          .json({ error: "account with this email already exist" });
      }
      const hPassword = await hash(password, 10);
      const userData = await userModel.create({
        name,
        email,
        password: hPassword,
      });
      return res.status(201).json(userData);
    } catch (error) {
      return res.status(400).json({ msg: "something went wrong" });
    }
  },
  getAll: async (req, res) => {
    try {
      const users = await userModel.findAll({
        // include: [postModel],
      });
      return res.status(200).json(users);
    } catch (error) {
      return res.status(400).json({ error: "something went wrong" });
    }
  },
  getOne: async (req, res) => {
    try {
      const userId = req.params.userId;
      const user = await userModel.findByPk(userId);
      if (!user) {
        return res.status(404).json({ error: "user does not exist" });
      }
      return res.status(200).json(user);
    } catch (error) {
      return res.status(400).json({ error: "somthing went wrong" });
    }
  },
  update: async (req, res) => {
    try {
      const userId = req.params.userId;
      const { content } = req.body;
      const user = await userModel.findByPk(userId);
      if (!user) {
        return res.status(404).json({ error: "user not found" });
      }
      const updatedUser = await userModel.update({
        content,
        where: {
          id: userId,
        },
      });
      return res.status(202).json(updatedUser);
    } catch (error) {
      return res.status(400).json({ error: "something went wrong" });
    }
  },
  delete: async (req, res) => {
    try {
      const userId = req.params.userId;
      const user = await userModel.findByPk(userId);
      if (!user) {
        return res.status(404).json({ error: "user not found" });
      }
      user.destroy();
      return res.status(200).json({ message: "user deleted" });
    } catch (error) {
      return res.status(400).json({ error: "something went wrong" });
    }
  },
};

export default userController;
