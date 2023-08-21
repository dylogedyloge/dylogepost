import { Editor } from "@tiptap/core";
import {
  BsArrowsCollapse,
  BsArrowsExpand,
  BsCircle,
  BsFilter,
  BsRepeat,
  BsSpellcheck,
  BsTextWrap,
} from "react-icons/bs";
import { BiSolidChevronDown } from "react-icons/bi";
import { Dispatch, FC, SetStateAction } from "react";
import Image from "next/image";
import ReactCountryFlag from "react-country-flag";
import { BsFillFastForwardFill } from "react-icons/bs";

export interface BubbleDylogeMenuItem {
  name: string;
  flagIcon: string;
}

interface DylogeSelectorProps {
  editor: Editor;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  selectedText: string;
}

// const TEXT_COLORS: BubbleDylogeMenuItem[] = [
//   {
//     name: "Default",
//     color: "#000000",
//   },
//   {
//     name: "Purple",
//     color: "#9333EA",
//   },
//   {
//     name: "Red",
//     color: "#E00000",
//   },
//   {
//     name: "Yellow",
//     color: "#EAB308",
//   },
//   {
//     name: "Blue",
//     color: "#2563EB",
//   },
//   {
//     name: "Green",
//     color: "#008A00",
//   },
//   {
//     name: "Orange",
//     color: "#FFA500",
//   },
//   {
//     name: "Pink",
//     color: "#BA4081",
//   },
//   {
//     name: "Gray",
//     color: "#A8A29E",
//   },
// ];
const ACTIONS = [
  { name: "continue", icon: <BsFillFastForwardFill /> },
  { name: "shorten", icon: <BsArrowsCollapse /> },
  { name: "extend", icon: <BsArrowsExpand /> },
  { name: "rephrase", icon: <BsRepeat /> },
  { name: "summarize", icon: <BsFilter /> },
  { name: "TL;DR", icon: <BsTextWrap /> },
  { name: "simplify", icon: <BsCircle /> },
  { name: "grammer & spelling", icon: <BsSpellcheck /> },
];

const LANGUAGES: BubbleDylogeMenuItem[] = [
  {
    name: "English",
    flagIcon: "US",
  },
  {
    name: "Persian",
    flagIcon: "IR",
  },
];

export const DylogeSelector: FC<DylogeSelectorProps> = ({
  editor,
  isOpen,
  setIsOpen,
  selectedText,
}) => {
  const activeColorItem = LANGUAGES.find(({ color }) =>
    editor.isActive("textStyle", { color })
  );

  const activeHighlightItem = LANGUAGES.find(({ color }) =>
    editor.isActive("highlight", { color })
  );

  return (
    <div className="relative h-full">
      <button
        className="flex h-10 items-center gap-1 p-2 text-sm font-medium rounded-md hover:bg-base-300 active:bg-base-300 "
        onClick={() => setIsOpen(!isOpen)}
      >
        <span
          className="rounded-sm p-1 "
          //   style={{
          //     color: activeColorItem?.color,
          //     backgroundColor: activeHighlightItem?.color,
          //   }}
        >
          <Image
            src="/logo4.png"
            width="20"
            height="10"
            alt="dyloge"
            className="h-4 w-4"
          />
        </span>

        <BiSolidChevronDown className="h-4 w-4 " />
      </button>

      {isOpen && (
        <section className="menu bg-base-200 rounded-md fixed top-full z-[99999] mt-1 flex  flex-col overflow-hidden  animate-in fade-in slide-in-from-top-1">
          <ul className="menu bg-base-200 w-56 rounded-box p-0 m-0 ">
            <li>
              <details>
                <summary className="text-xs prose-sm font-semibold">
                  AI Options
                </summary>
                {ACTIONS.map(({ name, icon }, index) => (
                  <button
                    key={index}
                    // onClick={() => {
                    //   editor.commands.unsetColor();
                    //   name !== "Default" &&
                    //     editor.chain().focus().setColor(color).run();
                    //   setIsOpen(false);
                    // }}
                    onClick={() => console.log("selectedtext", selectedText)}
                    className="flex h-full w-full justify-between items-center gap-1 p-2 text-sm font-medium rounded-md hover:bg-base-300 active:bg-base-300"
                  >
                    {icon}
                    <div className="flex items-center space-x-2 ">
                      <span className="text-xs prose-sm capitalize">
                        {name}
                      </span>
                    </div>
                    {/* {editor.isActive("textStyle", { color }) && (
                      <BsCheck2 className="h-4 w-4" />
                    )} */}
                  </button>
                ))}
              </details>
            </li>
            <li>
              <details>
                <summary className="text-xs prose-sm font-semibold">
                  Translate
                </summary>
                {LANGUAGES.map(({ name, flagIcon }, index) => (
                  <button
                    key={index}
                    className="capitalize text-xs prose-sm flex h-full w-full  justify-between items-center gap-1 p-3    rounded-md hover:bg-base-300 active:bg-base-300"
                  >
                    <ReactCountryFlag
                      countryCode={flagIcon}
                      svg
                      style={{
                        width: "0.75rem",
                        height: "0.75rem",
                      }}
                    />
                    {name}
                  </button>
                ))}
              </details>
            </li>
          </ul>
        </section>
      )}
    </div>
  );
};
