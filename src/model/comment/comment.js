import { DataTypes } from "sequelize";
import sequelize from "../../db/config.js";
import postModel from "../post/post.js";
import userModel from "../user/user.js";

const commentModel = sequelize.define("comments", {
  author: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

postModel.hasMany(commentModel);
commentModel.belongsTo(postModel);
userModel.hasMany(commentModel);
commentModel.belongsTo(userModel);

export default commentModel;
