import followerModel from "../../model/follower/follower.js";
import userModel from "../../model/user/user.js";
const followerController = {
  create: async (req, res) => {
    try {
      const id = req.session.user.id;
      const { followeeId } = req.params;
      const followerUser = await userModel.findByPk(id);
      if (!followerUser) {
        return res.status(404).json({ error: "no such user exist" });
      }
      const followee = await userModel.findByPk(followeeId);
      if (!followee) {
        return res.status(404).json({ error: "no such user exist" });
      }
      const follower = await followerModel.create({
        followerId: id,
        followeeId,
      });
      return res.status(200).json({ message: "user followed" });
    } catch (error) {}
  },
};

export default followerController;
