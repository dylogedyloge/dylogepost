import { getSession, withApiAuthRequired } from "@auth0/nextjs-auth0";
import clientPromise from "../../../lib/mongodb";

console.log("shortttttttttttttttttttttttttt");
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
    const { lastShortStoryDate, getNewerShortStories } = req.body;

    const shortStories = await db
      .collection("shortStories")
      .find({
        userId: userProfile._id,
        create: {
          [getNewerShortStories ? "$gt" : "$lt"]: new Date(lastShortStoryDate),
        },
      })
      .limit(getNewerShortStories ? 0 : 5)
      .sort({ create: -1 })
      .toArray();

    res.status(200).json({ shortStories });
    console.log("fapi", shortStories);
    return;
  } catch (e) {
    console.log(e, "ErRor");
    res.status(500).json({ error: "An error occurred." });
  }
});
