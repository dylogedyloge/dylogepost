import { getSession, withApiAuthRequired } from "@auth0/nextjs-auth0";
import clientPromise from "../../../../lib/mongodb";

export default withApiAuthRequired(async function handler(req, res) {
  try {
    const {
      user: { sub },
    } = await getSession(req, res);
    const client = await clientPromise;
    const db = client.db("BlogStandard");
    const userProfile = await db.collection("users").findOne({
      auth0Id: sub,
    });

    const { longStoryId } = req.query;

    // Retrieve the longStory based on longStoryId and userId
    const longStory = await db.collection("longStories").findOne({
      _id: longStoryId,
      userId: userProfile._id,
    });

    if (!longStory) {
      // Handle case when the longStory doesn't exist or doesn't belong to the user
      res.status(404).json({ error: "LongStory not found" });
      return;
    }

    res.status(200).json({ longStory });
    return;
  } catch (e) {
    console.log(e, "Error");
    res.status(500).json({ error: "Internal server error" });
  }
});
