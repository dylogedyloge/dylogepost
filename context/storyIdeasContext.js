import React, { useCallback, useReducer, useState } from "react";

const StoryIdeasContext = React.createContext({});

export default StoryIdeasContext;

function storyIdeasReducer(state, action) {
  switch (action.type) {
    case "addStoryIdeas": {
      const newStoryIdeas = [...state];
      action.storyIdeas.forEach((storyIdea) => {
        const exists = newStoryIdeas.find((si) => si._id === storyIdea._id);
        if (!exists) {
          newStoryIdeas.push(storyIdea);
        }
      });
      return newStoryIdeas;
    }
    case "deleteStoryIdea": {
      const newStoryIdeas = [];
      state.forEach((storyIdea) => {
        if (storyIdea._id !== action.storyIdeaId) {
          newStoryIdeas.push(storyIdea);
        }
      });
      return newStoryIdeas;
    }
    case "editPost": {
      const newStoryIdeas = state.map((storyIdea) => {
        if (storyIdea._id === action.storyIdeaId) {
          return {
            ...storyIdea,
            storyIdeaContent: action.storyIdeaContent,
            title: action.title,
            metaDescription: action.metaDescription,
          };
        }
        return storyIdea;
      });
      return newStoryIdeas;
    }
    default:
      return state;
  }
}

export const StoryIdeasProvider = ({ children }) => {
  const [storyIdeas, dispatch] = useReducer(storyIdeasReducer, []);
  const [noMoreStoryIdeas, setNoMoreStoryIdeas] = useState(false);

  const deleteStoryIdea = useCallback((storyIdeaId) => {
    dispatch({
      type: "deleteStoryIdea",
      storyIdeaId,
    });
  }, []);

  const editStoryIdea = useCallback(
    (toryIdeaId, storyIdeaContent, title, metaDescription) => {
      dispatch({
        type: "editStoryIdea",
        storyIdeaId,
        storyIdeaContent,
        title,
        metaDescription,
      });
    },
    []
  );

  const setStoryIdeasFromSSR = useCallback((storyIdeasFromSSR = []) => {
    dispatch({
      type: "addStoryIdeas",
      storyIdeas: storyIdeasFromSSR,
    });
  }, []);

  const getStoryIdeas = useCallback(
    async ({ lastPostDate, getNewerStoryIdeas = false }) => {
      const result = await fetch(`/api/getStoryIdeas`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ lastStoryIdeaDate, getNewerStoryIdeas }),
      });
      const json = await result.json();
      const storyIdeasResult = json.storyIdeas || [];
      if (storyIdeasResult.length < 5) {
        setNoMoreStoryIdeas(true);
      }
      dispatch({
        type: "addStoryIdeas",
        storyIdeas: storyIdeasResult,
      });
    },
    []
  );

  return (
    <StoryIdeasContext.Provider
      value={{
        storyIdeas,
        setStoryIdeasFromSSR,
        getStoryIdeas,
        noMoreStoryIdeas,
        deleteStoryIdea,
        editStoryIdea,
      }}
    >
      {children}
    </StoryIdeasContext.Provider>
  );
};
