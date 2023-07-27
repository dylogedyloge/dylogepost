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
  BsFolder2Open,
  BsFolderFill,
  BsPalette2,
} from "react-icons/bs";
// import Chat from "../Chat/Chat";
// import Player from "../Player/Player1";

// import Options from "../Options/Options";
import Player1 from "../Player/Player1";
import { RxAvatar } from "react-icons/rx";

export const AppLayout = ({
  children,
  availableTokens,
  posts: postsFromSSR,
  postId,
  postCreated,
}) => {
  const { user } = useUser();
  // console.log(user);

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
      <div className="drawer">
        <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col">
          {/* Navbar */}
          <div className="w-full navbar bg-base-100">
            <div className="flex-none lg:hidden">
              <label htmlFor="my-drawer-3" className="btn btn-square btn-ghost">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block w-6 h-6 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  ></path>
                </svg>
              </label>
            </div>
            {/* <div className="flex-1 px-2 mx-2">Navbar Title</div> */}
            {/* <div className="flex-none hidden lg:block"> */}
            <div className="navbar bg-base-100 hidden lg:flex">
              <div className="flex-1">
                <a className="btn btn-ghost normal-case text-xl">
                  <div className="flex justify-center items-center ">
                    <Image
                      src="/logo4.svg"
                      width={45}
                      height={15}
                      alt="dyloge"
                    />
                    <div className="flex flex-col ">
                      <p className="font-bold text-lg">Dyloge</p>
                    </div>
                  </div>
                </a>
              </div>
              <div className="flex-none">
                <div className="dropdown dropdown-end">
                  <label
                    tabIndex={0}
                    className="btn btn-link no-underline hover:no-underline text-base-content btn-circle capitalize"
                  >
                    <div className="flex">
                      {" "}
                      <BsFolder2Open size={10} />
                      <div>Posts</div>
                    </div>
                  </label>
                  <div
                    tabIndex={0}
                    className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow"
                  >
                    <div className="card-body">
                      {posts.map((post) => (
                        <li
                          key={post._id}
                          className="flex justify-between flex-row"
                        >
                          <div className="flex-1 overflow-hidden items-center">
                            <BsFillFileTextFill />
                            <Link
                              href={`/post/${post._id}/editor`}
                              className="truncate "
                            >
                              {post.title
                                ? removeHtmlTagsAndQuotation(post.title)
                                : post.topic}
                            </Link>
                          </div>
                        </li>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="dropdown dropdown-end">
                  <label tabIndex={0} className="btn btn-circle avatar">
                    <div className="w-10 rounded-full">
                      {!!user ? (
                        <Image
                          src={user.picture}
                          width={30}
                          height={30}
                          alt="image"
                        />
                      ) : (
                        <RxAvatar size={18} />
                      )}
                      <Image
                        src={user.picture}
                        width={30}
                        height={30}
                        alt="image"
                      />
                    </div>
                  </label>
                  <ul
                    tabIndex={0}
                    className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
                  >
                    <li>
                      <div>
                        <BsPalette2 />
                        <div className="">Theme</div>

                        <label className="swap swap-rotate">
                          <input type="checkbox" onChange={toggleTheme} />
                          <BsFillSunFill className="w-4 h-4 swap-off prose" />
                          <BsFillMoonStarsFill className="w-4 h-4 swap-on prose" />
                        </label>
                      </div>
                    </li>
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
            </div>
            {/* </div> */}
          </div>
          {/* Page content here */}
          <div>{children}</div>
        </div>
        <div className="drawer-side ">
          <label htmlFor="my-drawer-3" className="drawer-overlay"></label>

          {/* Sidebar content here */}
          <ul className="menu p-4 w-80 h-full bg-base-100 ">
            {/* <li>
              <a>Posts</a>
            </li>
            <li>
              <a>Settings</a>
            </li> */}
            {posts.map((post) => (
              <li key={post._id} className="flex justify-between flex-row">
                <div className="flex-1 overflow-hidden items-center">
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
      {/* <div className="drawer ">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content ">
          <div className="flex justify-between">
            <label
              htmlFor="my-drawer-2"
              className="btn drawer-button border border-1 m-4 "
              onClick={toggleDrawer}
            >
              <BsChevronDoubleRight onClick={toggleDrawer} className="" />
            </label> */}
      {/* <Options /> */}
      {/* </div>

          <div className="">{children}</div>
        </div> */}
      {/* <div className="drawer-side lg:drawer-open bg-base-100  flex flex-col p-4 outline bg-yellow-300">
          <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
          <div className="bg-red-900 ">
            <div className="flex flex-col gap-10 w-full ">
              <div className="flex gap-2 w-full justify-between items-center "> */}
      {/* <Link href="/post/new" className="btn flex-auto">
                <FontAwesomeIcon icon={faPlus} />
                New post
              </Link> */}
      {/* <div className="flex justify-center items-center ">
                  <Image src="/logo4.svg" width={45} height={15} alt="dyloge" />
                  <div className="flex flex-col ">
                    <p className="font-bold text-lg">Dyloge</p>
                  </div>
                </div>

                <label
                  htmlFor="my-drawer-2"
                  className="btn drawer-button "
                  onClick={toggleDrawer}
                > */}
      {/* <FontAwesomeIcon
                  icon={faAnglesLeft}
                  onClick={toggleDrawer}
                  className=""
                /> */}
      {/* <BsChevronDoubleLeft onClick={toggleDrawer} className="" />
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
            </div> */}

      {/* <ul className="menu  w-full mt-10">
              {posts.map((post) => (
                <li key={post._id} className="flex justify-between flex-row">
                  <div className="flex-1 overflow-hidden items-center"> */}
      {/* <FontAwesomeIcon icon={faFile} /> */}
      {/* <BsFillFileTextFill />
                    <Link
                      href={`/post/${post._id}/editor`}
                      className="truncate "
                    >
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
                  <div className="">Theme</div> */}

      {/* <label className="swap swap-rotate">
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
                    <Link href="/api/auth/logout"> */}

      {/* <BsDashCircleFill className="text-error" />
                    </Link>
                  </div>
                ) : (
                  <Link href="/api/auth/login">Login</Link>
                )}
              </li>
            </ul>
          </div> */}
      {/* </div>
      </div> */}
      {/* <Chat /> */}
      <Player1 />
    </div>
  );
};
