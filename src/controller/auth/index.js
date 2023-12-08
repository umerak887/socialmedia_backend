import { hash, compare } from "bcrypt";
import userModel from "../../model/user/user.js";
import jwt from "jsonwebtoken";
import RegisterEmail from "../../email/register.js";
import LoginEmail from "../../email/login.js";
// import cloudinary from "../../middleware/cloud.js";

const AuthController = {
  register: async (req, res) => {
    try {
      const { name, email, password } = req.body;
      // const file = req.file;
      const user = await userModel.findOne({
        where: {
          email,
        },
      });
      if (user) {
        return res
          .status(400)
          .json({ msg: "Accout with this email already exist" });
      }
      const hPassword = await hash(password, 10);
      // const result = await cloudinary.uploader.upload(file.buffer, {
      //   resource_type: "auto",
      // });
      await userModel.create({
        name,
        email,
        password: hPassword,
        // image: result.url,
      });
      RegisterEmail({
        from: "umerak877@gmail.com",
        to: user.email,
        subject: "Register Verification",
        text: "Welcome to our social media application",
      });
      return res.status(201).json({ msg: "User Registerd" });
    } catch (error) {
      return res.status(400).json({ error: "Something went wrong" });
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await userModel.findOne({
        where: {
          email,
        },
      });
      if (!user) {
        return res
          .status(400)
          .json({ msg: "Account with this email doesnot exist" });
      }
      const confirmPassword = await compare(password, user.password);
      if (!confirmPassword) {
        return res.status(400).json({ msg: "Invalid Credentials" });
      }
      const payload = {
        id: user.id,
        email,
      };
      const token = await jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "14d",
      });

      //this peace of course does not work
      req.session.token = token;
      req.session.user = payload;
      req.session.save();
      console.log(req.session);

      LoginEmail({
        from: "umerak877@gmail.com",
        to: user.email,
        subject: "Register Verification",
        text: "Welcome to our social media application",
      });

      return res.status(200).json({
        payload,
        token,
        msg: "User login successfuly",
      });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ error: "Something went wrong" });
    }
  },
};

export default AuthController;
