import { DataTypes } from "sequelize";
import sequelize from "../../db/config.js";
import userModel from "../user/user.js";

const followerModel = sequelize.define("follower", {
  followerId: {
    type: DataTypes.INTEGER,
    references: {
      model: userModel,
      key: "id",
    },
  },
  followeeId: {
    type: DataTypes.INTEGER,
    references: {
      model: userModel,
      key: "id",
    },
  },
});

followerModel.belongsTo(userModel, {
  foreignKey: "followerId",
  as: "follower",
});
followerModel.belongsTo(userModel, {
  foreignKey: "followeeId",
  as: "followee",
});

export default followerModel;
