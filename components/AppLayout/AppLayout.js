// "use client";
import { useUser } from "@auth0/nextjs-auth0/client";
// import {
//   faAnglesLeft,
//   faAnglesRight,
//   faArrowDown,
//   faArrowDownAZ,
//   faArrowRightFromBracket,
//   faCircleHalfStroke,
//   faCode,
//   faCoins,
//   faFile,
//   faFileImage,
//   faFileUpload,
//   faHouse,
//   faImage,
//   faInfo,
//   faLanguage,
//   faMessage,
//   faMoon,
//   faPhone,
//   faPlus,
//   faQuoteRight,
//   faSun,
//   faTrash,
//   faUpload,
//   faUser,
//   faVideoCamera,
//   faXmark,
// } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import PostsContext from "../../context/postsContext";
import { useLocalStorage } from "usehooks-ts";
// import Flag from "react-world-flags";
import { useIntl } from "react-intl";
import { useRouter } from "next/router";
import {
  BsChevronDoubleLeft,
  BsChevronDoubleRight,
  BsDashCircleFill,
  BsFileMusicFill,
  BsFillFileTextFill,
  BsFillMoonStarsFill,
  BsFillPersonFill,
  BsFillSunFill,
  BsFillVolumeMuteFill,
  BsFillVolumeOffFill,
  BsFillWalletFill,
  BsPalette2,
} from "react-icons/bs";
// import Chat from "../Chat/Chat";
// import Player from "../Player/Player1";

// import Options from "../Options/Options";
import Player1 from "../Player/Player1";

export const AppLayout = ({
  children,
  availableTokens,
  posts: postsFromSSR,
  postId,
  postCreated,
}) => {
  const { user } = useUser();

  const { setPostsFromSSR, posts, getPosts, noMorePosts } =
    useContext(PostsContext);

  useEffect(() => {
    setPostsFromSSR(postsFromSSR);
    if (postId) {
      const exists = postsFromSSR.find((post) => post._id === postId);
      if (!exists) {
        getPosts({ getNewerPosts: true, lastPostDate: postCreated });
      }
    }
  }, [postsFromSSR, setPostsFromSSR, postId, postCreated, getPosts]);
  // Drawer
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };
  // Theme Change
  const [theme, setTheme] = useLocalStorage();
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };
  useEffect(() => {
    const body = document.body;
    body.setAttribute("data-theme", theme);
  }, [theme]);
  // i18n
  const { locale, locales, push, asPath } = useRouter();
  const intl = useIntl();

  // Remove html tags and quotations from title
  function removeHtmlTagsAndQuotation(str) {
    // Remove HTML tags
    const withoutTags = str.replace(/(<([^>]+)>)/gi, "");

    // Remove quotation marks
    const withoutQuotation = withoutTags.replace(/['"]/g, "");

    return withoutQuotation;
  }

  return (
    <div className="flex ">
      <div className="drawer drawer-open ">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content ">
          <div className="flex justify-between">
            <label
              htmlFor="my-drawer-2"
              className="btn drawer-button border border-1 m-4 "
              onClick={toggleDrawer}
            >
              <BsChevronDoubleRight onClick={toggleDrawer} className="" />
            </label>
            {/* <Options /> */}
          </div>

          <div className="">{children}</div>
        </div>
        <div className="drawer-side bg-base-100 sm:w-3/4 lg:w-1/5 flex flex-col p-4 border border-1 border-t-0 border-b-0 border-l-0">
          <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
          <div className="flex flex-col gap-10 w-full">
            <div className="flex gap-2 w-full justify-between items-center">
              {/* <Link href="/post/new" className="btn flex-auto">
                <FontAwesomeIcon icon={faPlus} />
                New post
              </Link> */}
              <div className="flex justify-center items-center">
                <Image src="/logo4.svg" width={45} height={15} alt="dyloge" />
                <div className="flex flex-col ">
                  <p className="font-bold text-lg">Dyloge</p>
                </div>
              </div>

              <label
                htmlFor="my-drawer-2"
                className="btn drawer-button "
                onClick={toggleDrawer}
              >
                {/* <FontAwesomeIcon
                  icon={faAnglesLeft}
                  onClick={toggleDrawer}
                  className=""
                /> */}
                <BsChevronDoubleLeft onClick={toggleDrawer} className="" />
              </label>
            </div>

            <progress
              className={`progress
              ${
                availableTokens >= 50
                  ? "progress-success"
                  : availableTokens <= 25 && availableTokens > 10
                  ? "progress-warning"
                  : availableTokens < 10
                  ? " progress-error"
                  : ""
              }`}
              value={availableTokens}
              max="50"
            ></progress>
          </div>

          <ul className="menu  w-full mt-10">
            {posts.map((post) => (
              <li key={post._id} className="flex justify-between flex-row">
                <div className="flex-1 overflow-hidden items-center">
                  {/* <FontAwesomeIcon icon={faFile} /> */}
                  <BsFillFileTextFill />
                  <Link href={`/post/${post._id}/editor`} className="truncate ">
                    {post.title
                      ? removeHtmlTagsAndQuotation(post.title)
                      : post.topic}
                  </Link>
                </div>
              </li>
            ))}
            {!noMorePosts && (
              <div
                onClick={() => {
                  getPosts({
                    lastPostDate: posts[posts.length - 1].create,
                  });
                }}
                className="btn btn-xs mt-10 capitalize"
              >
                <div>Load more posts</div>
              </div>
            )}
          </ul>
          <div className="divider"></div>
          <ul className="menu w-full">
            <li className="">
              <div>
                <BsFillWalletFill />
                <div className="">Buy Tokens</div>
                <Link href="/token-topup">
                  <div
                    className={`font-bold ${
                      availableTokens >= 50
                        ? "text-success"
                        : availableTokens <= 25 && availableTokens > 10
                        ? "text-warning"
                        : availableTokens < 10
                        ? " text-error"
                        : ""
                    }`}
                  >
                    {availableTokens}
                  </div>
                </Link>
              </div>
            </li>
            <li>
              <div>
                <BsPalette2 />
                <div className="">Theme</div>
                {/* Choose Theme */}
                <label className="swap swap-rotate">
                  <input type="checkbox" onChange={toggleTheme} />
                  <BsFillSunFill className="w-4 h-4 swap-off prose" />
                  <BsFillMoonStarsFill className="w-4 h-4 swap-on prose" />
                </label>
              </div>
            </li>
            <li>
              <div>
                <BsFileMusicFill />
                <div className="">Sound</div>
                <label className="swap">
                  <input type="checkbox" />
                  <BsFillVolumeOffFill className="w-4 h-4 swap-on" />
                  <BsFillVolumeMuteFill className="w-4 h-4 swap-off" />
                </label>
              </div>
            </li>
            <li>
              {!!user ? (
                <div>
                  <BsFillPersonFill />
                  <div className="">{user.name}</div>
                  <Link href="/api/auth/logout">
                    {/* <FontAwesomeIcon icon={faArrowRightFromBracket} /> */}
                    <BsDashCircleFill className="text-error" />
                  </Link>
                </div>
              ) : (
                <Link href="/api/auth/login">Login</Link>
              )}
            </li>
          </ul>
        </div>
      </div>
      {/* <Chat /> */}
      <Player1 />
    </div>
  );
};
