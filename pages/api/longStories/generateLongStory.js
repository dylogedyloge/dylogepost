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
  console.log(listOfCharacters);
  console.log(characters);
  console.log(genre);

  if (!genre || !characters) {
    res.status(422);
    return;
  }

  if (genre.length > 80 || characters.length > 80) {
    res.status(422);
    return;
  }

  const longStoryContentResult = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: "You are a long story writer.",
      },
      {
        role: "user",
        content: `write a long story in horror ${genre} with theses characters: ${listOfCharacters} in html format. only use one single <p> tag`,
      },
    ],
    temperature: 0,
  });
  const longStoryContent =
    longStoryContentResult.data.choices[0]?.message.content;
  const titleResult = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: "You are a long story writer.",
      },
      {
        role: "user",
        content: `write a long story in horror ${genre} with theses characters: ${listOfCharacters} in html format. only use one single <p> tag`,
      },
      {
        role: "assistant",
        content: longStoryContent,
      },
      {
        role: "user",
        content:
          "Generate appropriate title for the above short story.Do Not use <meta> and <title> tag",
      },
    ],
    temperature: 0,
  });

  const title = titleResult.data.choices[0]?.message.content;
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

  const longStory = await db.collection("longStories").insertOne({
    longStoryContent: longStoryContent || "",
    title: title || "",
    genre,
    characters,
    userId: userProfile._id,
    create: new Date(),
  });

  res.status(200).json({
    longStoryId: longStory.insertedId,
  });
});
