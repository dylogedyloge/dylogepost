// import { getSession, withApiAuthRequired } from "@auth0/nextjs-auth0";
// import { Configuration, OpenAIApi } from "openai";
// import clientPromise from "../../../lib/mongodb";

// export default withApiAuthRequired(async function handler(req, res) {
//   const { user } = await getSession(req, res);
//   const client = await clientPromise;
//   const db = client.db("BlogStandard");
//   const userProfile = await db.collection("users").findOne({
//     auth0Id: user.sub,
//   });

//   if (!userProfile?.availableTokens) {
//     res.status(403);
//     return;
//   }

//   const config = new Configuration({
//     apiKey: process.env.OPENAI_API_KEY,
//   });
//   const openai = new OpenAIApi(config);

//   const { conversationId, messages } = req.body;
//   let { prompt } = await req.json();

//   if (!conversationId || !messages) {
//     res.status(422);
//     return;
//   }

//   const continuationResult = await openai.createChatCompletion({
//     model: "gpt-3.5-turbo",
//     messages: [
//       ...messages,
//       {
//         role: "assistant",
//         content:
//           "You are an AI writing assistant that continues existing text based on context from prior text. " +
//           "Give more weight/priority to the later characters than the beginning ones. " +
//           "Limit your response to no more than 200 characters, but make sure to construct complete sentences.",
//       },
//       {
//         role: "user",
//         content: prompt,
//       },
//     ],
//     temperature: 0,
//   });

//   const continuationContent =
//     continuationResult.data.choices[0]?.message.content;

//   /*await db.collection('users').updateOne(
//   {
//     auth0Id: user.sub,
//   },
//   {
//     $inc: {
//       availableTokens: -1,
//     },
//   }
// );*/

//   res.status(200).json({
//     continuation: continuationContent,
//   });
// });
export default function handler(req, res) {
  if (req.method === "POST") {
    const { selectedText } = req.body;

    console.log("API:", "continue");
    console.log("Selected Text:", selectedText);

    // You can add your own logic here to process the request

    res.status(200).json({ message: "API call successful" });
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
