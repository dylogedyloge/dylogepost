import { getSession } from "@auth0/nextjs-auth0";
import clientPromise from "../lib/mongodb";

export const getAppProps = async (ctx) => {
  const userSession = await getSession(ctx.req, ctx.res);
  const client = await clientPromise;
  const db = client.db("BlogStandard");
  const user = await db.collection("users").findOne({
    auth0Id: userSession.user.sub,
  });

  if (!user) {
    return {
      availableTokens: 0,
      posts: [],
      shortStories: [],
    };
  }

  const posts = await db
    .collection("posts")
    .find({
      userId: user._id,
    })
    .limit(5)
    .sort({
      create: -1,
    })
    .toArray();
  const shortStories = await db
    .collection("shortStories")
    .find({
      userId: user._id,
    })
    .limit(5)
    .sort({
      create: -1,
    })
    .toArray();
  const longStories = await db
    .collection("longStories")
    .find({
      userId: user._id,
    })
    .limit(5)
    .sort({
      create: -1,
    })
    .toArray();
  const movieScripts = await db
    .collection("movieScripts")
    .find({
      userId: user._id,
    })
    .limit(5)
    .sort({
      create: -1,
    })
    .toArray();

  return {
    availableTokens: user.availableTokens,
    posts: posts.map(({ create, _id, userId, ...rest }) => ({
      _id: _id.toString(),
      create: create.toString(),
      ...rest,
    })),
    postId: ctx.params?.postId || null,
    shortStories: shortStories.map(({ create, _id, userId, ...rest }) => ({
      _id: _id.toString(),
      create: create.toString(),
      ...rest,
    })),
    shortStoryId: ctx.params?.shortStoryId || null,
    longStories: longStories.map(({ create, _id, userId, ...rest }) => ({
      _id: _id.toString(),
      create: create.toString(),
      ...rest,
    })),
    longStoryId: ctx.params?.longStoryId || null,
    movieScripts: movieScripts.map(({ create, _id, userId, ...rest }) => ({
      _id: _id.toString(),
      create: create.toString(),
      ...rest,
    })),
    movieScriptId: ctx.params?.movieScriptId || null,
  };
};
