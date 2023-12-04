import Joi from "joi";

const userValidator = {
  register: (req, res, next) => {
    try {
      const body = req.body;
      const schema = Joi.object({
        name: Joi.string().min(3).max(10).required(),
        email: Joi.string().email().required(),
        password: Joi.string()
          .pattern(new RegExp(`^(?=.*\\d)(?=.*\\d)[\\s\\S]{5,}$`))
          .required(),
      });
      const { error, value } = schema.validate(body);
      if (error) {
        return res.status(400).json({ error, msg: "Invalid Data" });
      }
      next();
    } catch (error) {
      return res.status(400).json({ error, msg: "something went wrong" });
    }
  },
  login: (req, res, next) => {
    try {
      const body = req.body;
      const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string()
          .pattern(new RegExp(`^(?=.*\\d)(?=.*\\d)[\\s\\S]{5,}$`))
          .required(),
      });
      const { error, value } = schema.validate(body);
      if (error) {
        return res.status(400).json({ error, msg: "Invalid Data" });
      }
      next();
    } catch (error) {
      return res.status(400).json({ error, msg: "something went wrong" });
    }
  },
};

export default userValidator;
