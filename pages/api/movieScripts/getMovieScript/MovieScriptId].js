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

    const { movieScriptId } = req.query;

    // Retrieve the movieScript based on movieScriptId and userId
    const movieScript = await db.collection("movieScripts").findOne({
      _id: movieScriptId,
      userId: userProfile._id,
    });

    if (!movieScript) {
      // Handle case when the movieScript doesn't exist or doesn't belong to the user
      res.status(404).json({ error: "MovieScript not found" });
      return;
    }

    res.status(200).json({ movieScript });
    return;
  } catch (e) {
    console.log(e, "Error");
    res.status(500).json({ error: "Internal server error" });
  }
});
