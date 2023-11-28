import { DataTypes } from "sequelize";
import sequelize from "../../db/config.js";

const postModel = sequelize.define("post", {
  author: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  like: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 0,
  },
});

export default postModel;
