import Image from "next/image";
import Link from "next/link";
import {
  BsVectorPen,
  BsFillFileTextFill,
  BsFillCameraReelsFill,
  BsFillPenFill,
  BsFillChatFill,
} from "react-icons/bs";
import { FaGamepad } from "react-icons/fa";
import { AppLayout } from "../../components/AppLayout";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { getAppProps } from "../../utils/getAppProps";

//   Options Data
const optionsData = [
  {
    title: "Blog Post",
    description:
      "Create SEO-friendly blog posts with AI, edit in-app, and download instantly.",
    icon: <BsFillFileTextFill />,
    buttonText: "Creat New Blog Post",
    link: "post/new",
  },
  {
    title: "Movie Script",
    description:
      "AI-powered movie scriptwriting: Create, edit, and download your film script effortlessly.",
    icon: <BsFillCameraReelsFill />,
    buttonText: "create new Movie Script",
    link: "movieScript/new",
  },
  {
    title: "Long Story",
    description:
      "Experience effortless storytelling with AI: Write, edit, and download your masterpiece.",
    icon: <BsVectorPen />,
    buttonText: "Create New Long Story",
    link: "longStory/new",
  },
  {
    title: "Short Story",
    description:
      "AI-powered short story writing: Spark your creativity effortlessly.",
    icon: <BsFillPenFill />,
    buttonText: "Creat New Short Story",
    link: "shortStory/new",
  },
  // {
  //   title: "Game Script",
  //   description:
  //     "Craft immersive game scenarios effortlessly with AI assistance.",
  //   icon: <FaGamepad />,
  //   buttonText: "Creat New Game Script",
  //   link: "gameScript/new",
  // },
  // {
  //   title: "Conversation",
  //   description: "Chat with AI for expert writing guidance at every step.",
  //   icon: <BsFillChatFill />,
  //   buttonText: "Start Conversation",
  //   link: "conversation/new",
  // },
];

const Options = () => {
  return (
    <div className="min-h-screen grid place-items-center overflow-auto">
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2  mx-1">
        {optionsData.map((i, k) => {
          return (
            <div
              key={k}
              className="card mx-2 bg-base-200 hover:bg-base-300  hover:shadow-2xl hover:shadow-slate-50   cursor-pointer"
            >
              <Link href={i.link} className="">
                <div className="card-body  items-center text-center ">
                  <h2 className="card-title flex justify-between items-center ">
                    <figure>{i.icon}</figure>
                    <div className="prose-sm">{i.title}</div>
                  </h2>
                  <div className="prose-sm text-xs">{i.description}</div>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Options;

Options.getLayout = function getLayout(page, pageProps) {
  return <AppLayout {...pageProps}>{page}</AppLayout>;
};

export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps(ctx) {
    const props = await getAppProps(ctx);
    if (!props.availableTokens) {
      return {
        redirect: {
          destination: "/token-topup",
          permanent: false,
        },
      };
    }
    return {
      props,
    };
  },
});
