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

    const { shortStoryId } = req.query;

    // Retrieve the shortStory based on shortStoryId and userId
    const shortStory = await db.collection("shortStories").findOne({
      _id: shortStoryId,
      userId: userProfile._id,
    });

    if (!shortStory) {
      // Handle case when the shortStory doesn't exist or doesn't belong to the user
      res.status(404).json({ error: "ShortStory not found" });
      return;
    }

    res.status(200).json({ shortStory });
    return;
  } catch (e) {
    console.log(e, "Error");
    res.status(500).json({ error: "Internal server error" });
  }
});
