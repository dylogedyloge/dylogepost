import { getSession, withApiAuthRequired } from "@auth0/nextjs-auth0";
import clientPromise from "../../../lib/mongodb";

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
    const { lastLongStoryDate, getNewerLongStories } = req.body;

    const longStories = await db
      .collection("longStories")
      .find({
        userId: userProfile._id,
        create: {
          [getNewerLongStories ? "$gt" : "$lt"]: new Date(lastLongStoryDate),
        },
      })
      .limit(getNewerLongStories ? 0 : 5)
      .sort({ create: -1 })
      .toArray();

    res.status(200).json({ longStories });
    return;
  } catch (e) {
    console.log(e, "ErRor");
    res.status(500).json({ error: "An error occurred." });
  }
});
