import React, { useCallback, useReducer, useState } from "react";

const LongStoriesContext = React.createContext({});

export default LongStoriesContext;

function longStoriesReducer(state, action) {
  switch (action.type) {
    case "addLongStories": {
      const newLongStories = [...state];
      action.longStories.forEach((longStory) => {
        const exists = newLongStories.find((ss) => ss._id === longStory._id);
        if (!exists) {
          newLongStories.push(longStory);
        }
      });
      return newLongStories;
    }
    case "deleteLongStory": {
      const newLongStories = [];
      state.forEach((longStory) => {
        if (longStory._id !== action.longStoryId) {
          newLongStories.push(longStory);
        }
      });
      return newLongStories;
    }
    case "editLongStory": {
      const newLongStories = state.map((longStory) => {
        if (longStory._id === action.longStoryId) {
          return {
            ...longStory,
            longStoryContent: action.longStoryContent,
            // title: action.title,
            // metaDescription: action.metaDescription,
          };
        }
        return longStory;
      });
      return newLongStories;
    }
    default:
      return state;
  }
}

export const LongStoriesProvider = ({ children }) => {
  const [longStories, dispatch] = useReducer(longStoriesReducer, []);
  const [noMoreLongStories, setNoMoreLongStories] = useState(false);

  const deleteLongStory = useCallback((longStoryId) => {
    dispatch({
      type: "deleteLongStory",
      longStoryId,
    });
  }, []);

  const editLongStory = useCallback((longStoryId, longStoryContent) => {
    dispatch({
      type: "editLongStory",
      longStoryId,
      longStoryContent,
      // title,
      // metaDescription,
    });
  }, []);

  const setLongStoriesFromSSR = useCallback((longStoriesFromSSR = []) => {
    dispatch({
      type: "addLongStories",
      longStories: longStoriesFromSSR,
    });
  }, []);

  const getLongStories = useCallback(
    async ({ lastLongStoryDate, getNewerLongStories = false }) => {
      const result = await fetch(`/api/longStories/getLongStories`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ lastLongStoryDate, getNewerLongStories }),
      });
      const json = await result.json();
      const longStoriesResult = json.longStories || [];
      // console.log("longStoriesResult", longStoriesResult);
      if (longStoriesResult.length < 5) {
        setNoMoreLongStories(true);
      }
      dispatch({
        type: "addLongStories",
        longStories: longStoriesResult,
      });
    },
    []
  );

  return (
    <LongStoriesContext.Provider
      value={{
        longStories,
        setLongStoriesFromSSR,
        getLongStories,
        noMoreLongStories,
        deleteLongStory,
        editLongStory,
      }}
    >
      {children}
    </LongStoriesContext.Provider>
  );
};
