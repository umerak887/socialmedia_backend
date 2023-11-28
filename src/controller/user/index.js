import userModel from "../../model/user/user.js";

const userController = {
  create: async (req, res) => {
    try {
      const { name, email, password } = req.body;
      const userData = await userModel.create({
        name,
        email,
        password,
      });
      return res.status(201).json(userData);
    } catch (error) {
      return res.status(400).json({ msg: "something went wrong" });
    }
  },
};

export default userController;
