import React, { useCallback, useReducer, useState } from "react";

const ShortStoriesContext = React.createContext({});

export default ShortStoriesContext;

function shortStoriesReducer(state, action) {
  switch (action.type) {
    case "addShortStories": {
      const newShortStories = [...state];
      action.shortStories.forEach((shortStory) => {
        const exists = newShortStories.find((ss) => ss._id === shortStory._id);
        if (!exists) {
          newShortStories.push(shortStory);
        }
      });
      return newShortStories;
    }
    case "deleteShortStory": {
      const newShortStories = [];
      state.forEach((shortStory) => {
        if (shortStory._id !== action.shortStoryId) {
          newShortStories.push(shortStory);
        }
      });
      return newShortStories;
    }
    case "editShortStory": {
      const newShortStories = state.map((shortStory) => {
        if (shortStory._id === action.shortStoryId) {
          return {
            ...shortStory,
            shortStoryContent: action.shortStoryContent,
            // title: action.title,
            // metaDescription: action.metaDescription,
          };
        }
        return shortStory;
      });
      return newShortStories;
    }
    default:
      return state;
  }
}

export const ShortStoriesProvider = ({ children }) => {
  const [shortStories, dispatch] = useReducer(shortStoriesReducer, []);
  const [noMoreShortStories, setNoMoreShortStories] = useState(false);

  const deleteShortStory = useCallback((shortStoryId) => {
    dispatch({
      type: "deleteShortStory",
      shortStoryId,
    });
  }, []);

  const editShortStory = useCallback((shortStoryId, shortStoryContent) => {
    dispatch({
      type: "editShortStory",
      shortStoryId,
      shortStoryContent,
      // title,
      // metaDescription,
    });
  }, []);

  const setShortStoriesFromSSR = useCallback((shortStoriesFromSSR = []) => {
    dispatch({
      type: "addShortStories",
      shortStories: shortStoriesFromSSR,
    });
  }, []);

  const getShortStories = useCallback(
    async ({ lastShortStoryDate, getNewerShortStories = false }) => {
      const result = await fetch(`/api/shortStories/getShortStories`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ lastShortStoryDate, getNewerShortStories }),
      });
      const json = await result.json();
      const shortStoriesResult = json.shortStories || [];
      // console.log("shortStoriesResult", shortStoriesResult);
      if (shortStoriesResult.length < 5) {
        setNoMoreShortStories(true);
      }
      dispatch({
        type: "addShortStories",
        shortStories: shortStoriesResult,
      });
    },
    []
  );

  return (
    <ShortStoriesContext.Provider
      value={{
        shortStories,
        setShortStoriesFromSSR,
        getShortStories,
        noMoreShortStories,
        deleteShortStory,
        editShortStory,
      }}
    >
      {children}
    </ShortStoriesContext.Provider>
  );
};
