import React, { useState } from "react";

const MovieScript = () => {
  const initialScript = `
INT. LIVING ROOM - DAY

JAMES, a young man in his 20s, sits on the couch, reading a book. The room is cozy with soft lighting.

JAMES
(to himself)
I wonder what adventures await me within these pages.

The front door creaks open, and LILY, James' roommate, enters, looking exhausted.

LILY
Hey, James. Long day at work.

JAMES
(looking up, smiling)
Welcome back, Lily. Want me to make some tea?

Lily nods gratefully and collapses onto the couch.

EXT. CAFE - NIGHT

James and Lily sit across from each other at a small table on the cafe patio. Steam rises from their mugs.

LILY
You know, I've always wanted to go on a real adventure.

JAMES
What's stopping you?

They share a meaningful look, and their hands touch briefly.

FADE OUT.
`;

  const [script, setScript] = useState(initialScript);

  const handleScriptChange = (event) => {
    setScript(event.target.value);
  };

  return (
    <div className="flex justify-center items-center min-h-screen ">
      <div className="w-full max-w-screen-md p-8 shadow rounded-lg ">
        <textarea
          className="w-screen overflow-hidden h-screen p-2 bg-transparent border-none resize-none outline-none prose font-sans-en text-center"
          value={script}
          onChange={handleScriptChange}
        />
      </div>
    </div>
  );
};

export default MovieScript;
