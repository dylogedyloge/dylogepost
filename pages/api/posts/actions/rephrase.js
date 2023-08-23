import { getSession, withApiAuthRequired } from "@auth0/nextjs-auth0";
import { Configuration, OpenAIApi } from "openai";
import clientPromise from "../../../../lib/mongodb";

export default withApiAuthRequired(async function handler(req, res) {
  const { user } = await getSession(req, res);
  const client = await clientPromise;
  const db = client.db("BlogStandard");
  const userProfile = await db.collection("users").findOne({
    auth0Id: user.sub,
  });

  if (!userProfile?.availableTokens) {
    res.status(403);
    return;
  }

  const config = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(config);

  const { selectedText } = req.body;
  const rephraseContentResult = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: "You are a blog editor",
      },
      {
        role: "user",
        content: `rephrase this text: ${selectedText}.`,
      },
    ],
    temperature: 0,
  });

  const rephraseContent =
    rephraseContentResult.data.choices[0]?.message.content;
  console.log(rephraseContent);

  res.status(200).json({ message: "API call successful" });
});
