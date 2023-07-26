import { getSession, withApiAuthRequired } from "@auth0/nextjs-auth0";
import { Configuration, OpenAIApi } from "openai";
import clientPromise from "../../lib/mongodb";

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

  if (!genre || !characters) {
    res.status(422);
    return;
  }

  if (genre.length > 80 || characters.length > 80) {
    res.status(422);
    return;
  }

  const storyIdeaContentResult = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: "You are a novel writer.",
      },
      {
        role: "user",
        content: `Write 10 story ideas for a story in ${genre} genre, with these characters: ${listOfCharacters}. The response should be formatted in HTML, 
        limited to the following HTML tags: h2,p. don't use li and ul tags`,
      },
    ],
    temperature: 0,
  });

  const storyIdeaContent =
    storyIdeaContentResult.data.choices[0]?.message.content;

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

  const storyIdea = await db.collection("storyIdeas").insertOne({
    storyIdeaContent: storyIdeaContent || "",
    genre,
    characters,
    userId: userProfile._id,
    create: new Date(),
  });

  res.status(200).json({
    storyIdeaId: storyIdea.insertedId,
  });
});
