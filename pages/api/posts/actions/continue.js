import { getSession, withApiAuthRequired } from "@auth0/nextjs-auth0";
import { Configuration, OpenAIApi } from "openai";
import clientPromise from "../../../../lib/mongodb";
import { toast } from "sonner";

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
  if (selectedText === "") {
    toast.error("Select the text you want to handle!");
  } else {
    const continueContentResult = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are an AI writing assistant that continues existing text based on context from prior text.",
        },
        {
          role: "user",
          content: `continue and compelete this text: "${selectedText}" .limit your response to around 400 characters`,
        },
      ],
      temperature: 0,
    });

    const continueContent =
      continueContentResult.data.choices[0]?.message.content;

    //  res.status(200).json({ generatedContent: continueContent });
    // res.status(200).json({ generatedContent: continueContent });
    res.status(200).json({ selectedText, generatedContent: continueContent });
  }
});
