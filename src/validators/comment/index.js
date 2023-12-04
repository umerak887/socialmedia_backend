import Joi from "joi";

const PostValidator = {
  create: (req, res, next) => {
    try {
      const body = req.body;
      const schema = Joi.object({
        author: Joi.string().min(3).max(10).required(),
        content: Joi.string().min(3).max(100).required(),
      });
      const { error, value } = schema.validate(body);
      if (error) {
        return res.status(400).json({ error, msg: "Invalid Data" });
      }
      next();
    } catch (error) {
      return res
        .status(400)
        .json({ error, msg: "something went wrong with validation" });
    }
  },
};

export default PostValidator;
