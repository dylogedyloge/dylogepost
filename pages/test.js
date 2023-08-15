import React, { useState } from "react";

const MovieScript = () => {
  const initialScript = `
  Scene 1: Prologue - Abandoned Warehouse

  [Darkness blankets an abandoned warehouse, where the moon's feeble light struggles to pierce through the windows. The air is heavy with tension, and an eerie silence hangs in the air. The camera moves cautiously through the space, revealing rusted chains hanging from the ceiling and discarded debris strewn across the floor. A single flickering lightbulb casts long, unsettling shadows on the walls.]
  
  [The sound of distant footsteps echoes, growing louder as a shadowy figure emerges from the darkness. The figure's face is obscured, and their movements are deliberate and calculated. The camera focuses on their gloved hands, which hold a gleaming, serrated knife. The blade glints ominously as it catches the faint light.]
  
  [Suddenly, a blood-curdling scream cuts through the silence. The camera jerks, panning to a corner of the warehouse where another shadowy figure is huddled, their face contorted in terror. The figure's hands are bound, and they struggle frantically against their restraints.]
  
  Victim (sobbing):
  Please... please let me go!
  
  [The shadowy figure with the knife approaches, their steps deliberate and unhurried. The victim's cries grow more desperate, but the figure remains unmoved, their presence exuding a palpable malevolence.]
  
  Shadowy Figure (coldly):
  You know why you're here.
  
  [Victim's sobs escalate as the figure looms over them, raising the knife. The camera cuts between close-ups of the victim's fear-stricken eyes and the glinting blade. The tension reaches a fever pitch, and just as the blade descends, the scene cuts to black.]
  
  [Title card appears: "Shadows of Desolation"]
  
  [The prologue sets a chilling tone for the movie, hinting at the horrors that await and the malevolent force that drives the narrative.]
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
