import React, { useCallback, useReducer, useState } from "react";

const MovieScriptsContext = React.createContext({});

export default MovieScriptsContext;

function movieScriptsReducer(state, action) {
  switch (action.type) {
    case "addMovieScripts": {
      const newMovieScripts = [...state];
      action.movieScripts.forEach((movieScript) => {
        const exists = newMovieScripts.find((ss) => ss._id === movieScript._id);
        if (!exists) {
          newMovieScripts.push(movieScript);
        }
      });
      return newMovieScripts;
    }
    case "deleteMovieScript": {
      const newMovieScripts = [];
      state.forEach((movieScript) => {
        if (movieScript._id !== action.movieScriptId) {
          newMovieScripts.push(movieScript);
        }
      });
      return newMovieScripts;
    }
    case "editMovieScript": {
      const newMovieScripts = state.map((movieScript) => {
        if (movieScript._id === action.movieScriptId) {
          return {
            ...movieScript,
            movieScriptContent: action.movieScriptContent,
            // title: action.title,
            // metaDescription: action.metaDescription,
          };
        }
        return movieScript;
      });
      return newMovieScripts;
    }
    default:
      return state;
  }
}

export const MovieScriptsProvider = ({ children }) => {
  const [movieScripts, dispatch] = useReducer(movieScriptsReducer, []);
  const [noMoreMovieScripts, setNoMoreMovieScripts] = useState(false);

  const deleteMovieScript = useCallback((movieScriptId) => {
    dispatch({
      type: "deleteMovieScript",
      movieScriptId,
    });
  }, []);

  const editMovieScript = useCallback((movieScriptId, movieScriptContent) => {
    dispatch({
      type: "editMovieScript",
      movieScriptId,
      movieScriptContent,
      // title,
      // metaDescription,
    });
  }, []);

  const setMovieScriptsFromSSR = useCallback((movieScriptsFromSSR = []) => {
    dispatch({
      type: "addMovieScripts",
      movieScripts: movieScriptsFromSSR,
    });
  }, []);

  const getMovieScripts = useCallback(
    async ({ lastMovieScriptDate, getNewerMovieScripts = false }) => {
      const result = await fetch(`/api/movieScripts/getMovieScripts`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ lastMovieScriptDate, getNewerMovieScripts }),
      });
      const json = await result.json();
      const movieScriptsResult = json.movieScripts || [];
      // console.log("movieScriptsResult", movieScriptsResult);
      if (movieScriptsResult.length < 5) {
        setNoMoreMovieScripts(true);
      }
      dispatch({
        type: "addMovieScripts",
        movieScripts: movieScriptsResult,
      });
    },
    []
  );

  return (
    <MovieScriptsContext.Provider
      value={{
        movieScripts,
        setMovieScriptsFromSSR,
        getMovieScripts,
        noMoreMovieScripts,
        deleteMovieScript,
        editMovieScript,
      }}
    >
      {children}
    </MovieScriptsContext.Provider>
  );
};
