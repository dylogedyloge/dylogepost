import { getSession, withApiAuthRequired } from "@auth0/nextjs-auth0";
import { Configuration, OpenAIApi } from "openai";
import clientPromise from "../../../lib/mongodb";

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

  const { genre, characters } = req.body;

  function arrayToFormattedString(arr) {
    let result = "";
    for (let i = 0; i < arr.length; i++) {
      const { name, age, description } = arr[i];
      result += `${i + 1}- ${name},${age} years old, ${description}`;
      if (i < arr.length - 1) {
        result += " ";
      }
    }
    return result;
  }
  const listOfCharacters = arrayToFormattedString(req.body.characters);

  if (!genre || !characters) {
    res.status(422);
    return;
  }

  if (genre.length > 80 || characters.length > 80) {
    res.status(422);
    return;
  }

  const shortStoryContentResult = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: "You are a short story writer.",
      },
      {
        role: "user",
        content: `write a short story in horror ${genre} with theses characters: ${listOfCharacters} in html format. only use one single <p> tag`,
      },
    ],
    temperature: 0,
  });

  const shortStoryContent =
    shortStoryContentResult.data.choices[0]?.message.content;

  /*await db.collection('users').updateOne(
  {
    auth0Id: user.sub,
  },
  {
    $inc: {
      availableTokens: -1,
    },
  }
);*/

  const shortStory = await db.collection("shortStories").insertOne({
    shortStoryContent: shortStoryContent || "",
    genre,
    characters,
    userId: userProfile._id,
    create: new Date(),
  });

  res.status(200).json({
    shortStoryId: shortStory.insertedId,
  });
});
