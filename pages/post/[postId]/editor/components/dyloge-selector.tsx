import { Editor } from "@tiptap/core";
import {
  BsArrowsCollapse,
  BsArrowsExpand,
  BsCircle,
  BsEmojiDizzy,
  BsEmojiExpressionless,
  BsEmojiHeartEyes,
  BsEmojiLaughing,
  BsEmojiSmileUpsideDown,
  BsEmojiSunglasses,
  BsEmojiWink,
  BsFilter,
  BsRepeat,
  BsSpellcheck,
  BsTextWrap,
} from "react-icons/bs";
import { BiSolidChevronDown } from "react-icons/bi";
import { Dispatch, FC, SetStateAction, useState } from "react";
import Image from "next/image";
import ReactCountryFlag from "react-country-flag";
import { BsFillFastForwardFill } from "react-icons/bs";
import Loading from "@/components/Loading/Loading";

export interface BubbleDylogeMenuItem {
  name: string;
  flagIcon?: string;
  icon?: JSX.Element;
}

interface DylogeSelectorProps {
  editor: Editor;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  selectedText: string;
}

const ACTIONS = [
  { name: "continue", icon: <BsFillFastForwardFill />, api: "/continue" },
  { name: "shorten", icon: <BsArrowsCollapse />, api: "/shorten" },
  { name: "extend", icon: <BsArrowsExpand />, api: "/extend" },
  { name: "rephrase", icon: <BsRepeat />, api: "/rephrase" },
  { name: "summarize", icon: <BsFilter />, api: "/summarize" },
  { name: "TL;DR", icon: <BsTextWrap />, api: "/tl;dr" },
  { name: "simplify", icon: <BsCircle />, api: "/simplify" },
  {
    name: "grammer & spelling",
    icon: <BsSpellcheck />,
    api: "/grammer&spelling",
  },
];

const LANGUAGES: BubbleDylogeMenuItem[] = [
  {
    name: "English",
    flagIcon: "US",
  },
  {
    name: "Spanish",
    flagIcon: "ES",
  },
  {
    name: "French",
    flagIcon: "FR",
  },
  {
    name: "Portuguese",
    flagIcon: "PT",
  },
  {
    name: "Deutsch",
    flagIcon: "DE",
  },
];

const TONES: BubbleDylogeMenuItem[] = [
  {
    name: "formal",
    icon: <BsEmojiExpressionless />,
  },
  {
    name: "casual",
    icon: <BsEmojiWink />,
  },
  {
    name: "excited",
    icon: <BsEmojiHeartEyes />,
  },
  {
    name: "confident",
    icon: <BsEmojiSunglasses />,
  },
  {
    name: "dramatic",
    icon: <BsEmojiDizzy />,
  },
  {
    name: "sarcastic",
    icon: <BsEmojiSmileUpsideDown />,
  },
];

export const DylogeSelector: FC<DylogeSelectorProps> = ({
  editor,
  isOpen,
  setIsOpen,
  selectedText,
}) => {
  const [generating, setGenerating] = useState(false);
  const [generatingIndex, setGeneratingIndex] = useState(-1);

  // call actions api
  const handleAction = async (api: string, index: number) => {
    try {
      setGenerating(true);
      setGeneratingIndex(index);
      const response = await fetch(`/api/posts/actions${api}`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({ selectedText }),
      });

      const json = await response.json();
      const generatedText = json.generatedContent;
      if (api === "/continue") {
        if (response.ok) {
          if (generatedText) {
            const newText = `${selectedText} ${generatedText}`;
            editor.chain().focus().insertContent(newText).run();
            editor?.commands.setTextSelection({
              from: editor.state.selection.from - generatedText.length,
              to: editor.state.selection.from,
            });
          }
        } else {
          console.error("API call failed");
        }
      } else {
        if (response.ok) {
          if (generatedText) {
            const newText = editor
              .getHTML()
              .replace(selectedText, generatedText);
            editor.commands.setContent(newText);
            editor?.commands.setTextSelection({
              from: editor.state.selection.from - generatedText.length,
              to: editor.state.selection.from,
            });
          }
        } else {
          console.error("API call failed");
        }
      }
    } catch (error) {
      console.error("An error occurred", error);
    } finally {
      setGenerating(false);
      setGeneratingIndex(-1);
      setIsOpen(false);
    }
  };
  // call translate api
  const handleTranslate = async (name: string) => {
    try {
      setGenerating(true);
      const response = await fetch(`/api/posts/translate`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({ selectedText, name }),
      });

      if (response.ok) {
        console.log("API call successful");
      } else {
        console.error("API call failed");
      }
    } catch (error) {
      console.error("An error occurred", error);
    } finally {
      setGenerating(false);
      setIsOpen(false);
    }
  };
  // call tone api
  const handleTone = async (name: string) => {
    try {
      setGenerating(true);
      const response = await fetch(`/api/posts/tone`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({ selectedText, name }),
      });

      if (response.ok) {
        console.log("API call successful");
      } else {
        console.error("API call failed");
      }
    } catch (error) {
      console.error("An error occurred", error);
    } finally {
      setGenerating(false);
      setIsOpen(false);
    }
  };

  return (
    <div className="relative h-full">
      <button
        className="flex h-10 items-center gap-1 p-2 text-sm font-medium rounded-md hover:bg-base-300 active:bg-base-300 "
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="rounded-sm p-1 ">
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
                  Operations
                </summary>
                {ACTIONS.map(({ name, icon, api }, index) => (
                  <button
                    key={index}
                    onClick={() => handleAction(api, index)}
                    className="flex h-full w-full justify-between items-center gap-1 p-2 text-sm font-medium rounded-md hover:bg-base-300 active:bg-base-300"
                    disabled={generating}
                  >
                    {generating && generatingIndex === index ? (
                      <span className="loading loading-ring loading-sm"></span>
                    ) : (
                      <div>{icon}</div>
                    )}

                    <div className="flex items-center space-x-2 ">
                      <span className="text-xs prose-sm capitalize">
                        {name}
                      </span>
                    </div>
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
                    onClick={() => handleTranslate(name)}
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
            <li>
              <details>
                <summary className="text-xs prose-sm font-semibold">
                  Tone
                </summary>
                {TONES.map(({ name, icon }, index) => (
                  <button
                    key={index}
                    onClick={() => handleTone(name)}
                    className="flex h-full w-full justify-between items-center gap-1 p-2 text-sm font-medium rounded-md hover:bg-base-300 active:bg-base-300"
                  >
                    {icon}
                    <div className="flex items-center space-x-2 ">
                      <span className="text-xs prose-sm capitalize">
                        {name}
                      </span>
                    </div>
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
