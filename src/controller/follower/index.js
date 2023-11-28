import followerModel from "../../model/follower/follower.js";
import userModel from "../../model/user/user.js";
const followerController = {
  create: async (req, res) => {
    try {
      const { userId, followeeId } = req.params;
      const user1 = await userModel.findByPk(userId);
      if (!user1) {
        return res.status(404).json({ error: "no such user exist" });
      }
      const user2 = await userModel.findByPk(followeeId);
      if (!user2) {
        return res.status(404).json({ error: "no such user exist" });
      }
      const follower = await followerModel.create({
        followerId: userId,
        followeeId,
      });
      return res.status(200).json({ message: "user followed" });
    } catch (error) {}
  },
};

export default followerController;
