// import { BsFillPlayCircleFill } from "react-icons/bs";
// import Player from "@madzadev/audio-player";
// import "@madzadev/audio-player/dist/index.css";

// const tracks = [
//   {
//     url: "https://audioplayer.madza.dev/Madza-Chords_of_Life.mp3",
//     title: "Madza - Chords of Life",
//     tags: ["house"],
//   },
//   {
//     url: "https://audioplayer.madza.dev/Madza-Late_Night_Drive.mp3",
//     title: "Madza - Late Night Drive",
//     tags: ["dnb"],
//   },
//   {
//     url: "https://audioplayer.madza.dev/Madza-Persistence.mp3",
//     title: "Madza - Persistence",
//     tags: ["dubstep"],
//   },
// ];
// const Player1 = () => {
//   return (
//     <div className="">
//       <Player trackList={tracks} />
//       {/* <div
//         className="radial-progress fixed bottom-4 right-14"
//         style={{ "--value": "70", "--size": "3rem", "--thickness": "2px" }}
//       > */}
//       <div className="dropdown dropdown-top dropdown-end fixed bottom-3 right-14 prose">
//         <label tabIndex={0} className="btn btn-ghost btn-circle">
//           <BsFillPlayCircleFill className="w-10 h-10 object-cover" />
//         </label>

//         <ul
//           tabIndex={0}
//           className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
//         >
//           <li>
//             <a>Item 1</a>
//           </li>
//           <li>
//             <a>Item 2</a>
//           </li>
//         </ul>
//       </div>
//       {/* </div> */}
//     </div>
//   );
// };

// export default Player1;
import React, { useState } from "react";
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
          {/* <select
            className="border border-gray-300 rounded-md px-2 py-1 focus:outline-none"
            value={selectedOption}
            onChange={handleOptionChange}
          >
            <option value="">Select Music</option>
            <option value="/audio/audio1.mp3">Music 1</option>
            <option value="/audio/audio2.mp3">Music 2</option>
          </select> */}
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
