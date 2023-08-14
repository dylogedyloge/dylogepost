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
    const { lastMovieScriptDate, getNewerMovieScripts } = req.body;

    const movieScripts = await db
      .collection("movieScripts")
      .find({
        userId: userProfile._id,
        create: {
          [getNewerMovieScripts ? "$gt" : "$lt"]: new Date(lastMovieScriptDate),
        },
      })
      .limit(getNewerMovieScripts ? 0 : 5)
      .sort({ create: -1 })
      .toArray();

    res.status(200).json({ movieScripts });
    return;
  } catch (e) {
    console.log(e, "ErRor");
    res.status(500).json({ error: "An error occurred." });
  }
});
