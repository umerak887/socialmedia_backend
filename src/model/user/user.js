import sequelize from "../../db/config.js";
import { DataTypes } from "sequelize";
import postModel from "../post/post.js";

const userModel = sequelize.define("user", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

userModel.hasMany(postModel);
postModel.belongsTo(userModel);

export default userModel;
