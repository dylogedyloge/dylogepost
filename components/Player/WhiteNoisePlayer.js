import { useState } from "react";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { BsPlayFill, BsPauseFill } from "react-icons/bs";

const WhiteNoisePlayer = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
    setIsPlaying(true);
  };

  const handlePlayPause = () => {
    setIsPlaying((prevState) => !prevState);
  };

  return (
    <div>
      <button
        className="btn btn-neutral btn-sm outline outline-1 fixed bottom-4 right-14 prose-sm text-xs"
        onClick={handlePlayPause}
      >
        {isPlaying ? (
          <BsPauseFill size={24} className="prose-sm text-xs" />
        ) : (
          <BsPlayFill size={24} className="prose-sm text-xs" />
        )}
      </button>
      {!isPlaying && (
        <div className="fixed bottom-4 right-32 prose-sm text-xs">
          <select
            className="select select-ghost outline outline-1 select-sm max-w-xs prose-sm text-sm"
            value={selectedOption}
            onChange={handleOptionChange}
          >
            <option disabled selected className="text-xs prose-sm">
              White Noise
            </option>
            <option
              value="https://ia802805.us.archive.org/31/items/relaxingsounds/FIRE%201%2010h%20CracklingCampfire%2CCrickets%2CRainOrRiver-Night.mp3"
              className="text-xs prose-sm"
            >
              Capmfire
            </option>
            <option
              value="https://ia802805.us.archive.org/31/items/relaxingsounds/Waves%201%2010h%20Beach-Sunset%20into%20Night.mp3"
              className="text-xs prose-sm"
            >
              Beach Sunset
            </option>
            <option
              value="https://ia902805.us.archive.org/31/items/relaxingsounds/Rain%207%20%28Lightest%29%208h%20DripsOnTrees-no%20thunder.mp3"
              className="text-xs prose-sm"
            >
              Lightest Rain
            </option>
          </select>
        </div>
      )}
      {isPlaying && selectedOption && (
        <AudioPlayer
          src={selectedOption}
          autoPlay
          showJumpControls={false}
          customAdditionalControls={[]}
          customProgressBarSection={[]}
          customControlsSection={[]}
          style={{ display: "none" }}
        />
      )}
    </div>
  );
};

export default WhiteNoisePlayer;
