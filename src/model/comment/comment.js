import { DataTypes } from "sequelize";
import sequelize from "../../db/config.js";
import postModel from "../post/post.js";

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

export default commentModel;
