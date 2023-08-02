import { useUser } from "@auth0/nextjs-auth0/client";
import Image from "next/image";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import PostsContext from "../../context/postsContext";
import { useLocalStorage } from "usehooks-ts";
import { useIntl } from "react-intl";
import { useRouter } from "next/router";
import {
  BsArrowClockwise,
  BsFillArrowRightSquareFill,
  BsFillFileTextFill,
  BsFillMoonStarsFill,
  BsFillPersonFill,
  BsFillSunFill,
  BsFillWalletFill,
  BsFillFolderFill,
  BsList,
  BsPalette2,
  BsPlusLg,
  BsFillCameraReelsFill,
  BsVectorPen,
  BsFillPenFill,
  BsChevronRight,
  BsChevronDown,
} from "react-icons/bs";
import WhiteNoisePlayer from "../Player/WhiteNoisePlayer";
import { RxAvatar } from "react-icons/rx";

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
      <div className="drawer">
        <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col">
          <div className="w-full navbar bg-base-100">
            <div className="flex-none lg:hidden">
              <label htmlFor="my-drawer-3" className="btn btn-square btn-ghost">
                <BsList />
              </label>
            </div>
            {/* lg screens */}
            <div className="navbar bg-base-100 hidden lg:flex">
              <div className="flex-1">
                <div className="flex justify-center items-center ">
                  <Image src="/logo4.svg" width={45} height={15} alt="dyloge" />
                  <div className="flex flex-col ">
                    <p className="font-bold text-lg">Dyloge</p>
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-center gap-20">
                <div className="dropdown dropdown-end ">
                  <label
                    tabIndex={0}
                    className="btn btn-link no-underline hover:no-underline text-base-content btn-circle capitalize"
                  >
                    <div className="flex justify-between items-center gap-2">
                      <div className="p-1 rounded-md border border-1 border-base-content/50">
                        <BsFillFileTextFill size={10} />
                      </div>
                      <div className="prose-sm text-xs font-bold w-32 text-left">
                        blog posts
                      </div>
                    </div>
                  </label>
                  <div
                    tabIndex={0}
                    className=" z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow"
                  >
                    <div className="h-64 overflow-y-auto whitespace-normal">
                      <ul className="menu">
                        <li>
                          <Link
                            href="/post/new"
                            className="btn btn-neutral grid place-content-center "
                          >
                            <BsPlusLg />
                            <p className="capitalize text-xs prose-sm">
                              Create New post
                            </p>
                          </Link>
                        </li>
                        {posts.map((post) => (
                          <li
                            key={post._id}
                            className="flex justify-between flex-row"
                          >
                            <div className="flex-1 overflow-hidden items-center">
                              <BsFillFileTextFill />
                              <Link
                                href={`/post/${post._id}/editor`}
                                className="truncate prose-sm text-xs"
                              >
                                {post.title
                                  ? removeHtmlTagsAndQuotation(post.title)
                                  : post.topic}
                              </Link>
                            </div>
                          </li>
                        ))}
                        <li>
                          {!noMorePosts && (
                            <div
                              onClick={() => {
                                getPosts({
                                  lastPostDate: posts[posts.length - 1].create,
                                });
                              }}
                              className="cursor-pointer capitalize grid place-content-center"
                            >
                              <div className="prose-sm ">
                                <BsArrowClockwise size={18} />
                              </div>
                            </div>
                          )}
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="dropdown dropdown-end">
                  <label
                    tabIndex={0}
                    className="btn btn-link no-underline hover:no-underline text-base-content btn-circle capitalize"
                  >
                    <div className="flex justify-between items-center gap-2 ">
                      <div className="p-1 rounded-md border border-1 border-base-content/50">
                        <BsFillCameraReelsFill size={10} />
                      </div>
                      <div className="prose-sm text-xs font-bold  w-32 text-left">
                        movie scripts
                      </div>
                    </div>
                  </label>
                  <div
                    tabIndex={0}
                    className=" z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow"
                  >
                    <div className="h-64 overflow-y-auto whitespace-normal">
                      <ul className="menu">
                        <li>
                          <Link
                            href="/post/new"
                            className="btn btn-neutral grid place-content-center "
                          >
                            <BsPlusLg />
                            <p className="capitalize text-xs prose-sm">
                              Create New Movie Script
                            </p>
                          </Link>
                        </li>
                        {posts.map((post) => (
                          <li
                            key={post._id}
                            className="flex justify-between flex-row"
                          >
                            <div className="flex-1 overflow-hidden items-center">
                              <BsFillFileTextFill />
                              <Link
                                href={`/post/${post._id}/editor`}
                                className="truncate prose-sm text-xs"
                              >
                                {post.title
                                  ? removeHtmlTagsAndQuotation(post.title)
                                  : post.topic}
                              </Link>
                            </div>
                          </li>
                        ))}
                        <li>
                          {!noMorePosts && (
                            <div
                              onClick={() => {
                                getPosts({
                                  lastPostDate: posts[posts.length - 1].create,
                                });
                              }}
                              className="cursor-pointer capitalize grid place-content-center"
                            >
                              <div className="prose-sm ">
                                <BsArrowClockwise size={18} />
                              </div>
                            </div>
                          )}
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="dropdown dropdown-end">
                  <label
                    tabIndex={0}
                    className="btn btn-link no-underline hover:no-underline text-base-content btn-circle capitalize"
                  >
                    <div className="flex justify-between items-center gap-2">
                      <div className="p-1 rounded-md border border-1 border-base-content/50">
                        <BsVectorPen size={10} />
                      </div>

                      <div className="prose-sm text-xs font-bold w-32 text-left">
                        long stories
                      </div>
                    </div>
                  </label>
                  <div
                    tabIndex={0}
                    className=" z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow"
                  >
                    <div className="h-64 overflow-y-auto whitespace-normal">
                      <ul className="menu">
                        <li>
                          <Link
                            href="/post/new"
                            className="btn btn-neutral grid place-content-center "
                          >
                            <BsPlusLg />
                            <p className="capitalize text-xs prose-sm">
                              Create New Long Story
                            </p>
                          </Link>
                        </li>
                        {posts.map((post) => (
                          <li
                            key={post._id}
                            className="flex justify-between flex-row"
                          >
                            <div className="flex-1 overflow-hidden items-center">
                              <BsFillFileTextFill />
                              <Link
                                href={`/post/${post._id}/editor`}
                                className="truncate prose-sm text-xs"
                              >
                                {post.title
                                  ? removeHtmlTagsAndQuotation(post.title)
                                  : post.topic}
                              </Link>
                            </div>
                          </li>
                        ))}
                        <li>
                          {!noMorePosts && (
                            <div
                              onClick={() => {
                                getPosts({
                                  lastPostDate: posts[posts.length - 1].create,
                                });
                              }}
                              className="cursor-pointer capitalize grid place-content-center"
                            >
                              <div className="prose-sm ">
                                <BsArrowClockwise size={18} />
                              </div>
                            </div>
                          )}
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="dropdown dropdown-end">
                  <label
                    tabIndex={0}
                    className="btn btn-link no-underline hover:no-underline text-base-content btn-circle capitalize"
                  >
                    <div className="flex justify-between items-center gap-2">
                      <div className="p-1 rounded-md border border-1 border-base-content/50">
                        <BsFillPenFill size={10} />
                      </div>
                      <div className="prose-sm text-xs font-bold w-32 text-left">
                        short stories
                      </div>
                    </div>
                  </label>
                  <div
                    tabIndex={0}
                    className=" z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow"
                  >
                    <div className="h-64 overflow-y-auto whitespace-normal">
                      <ul className="menu">
                        <li>
                          <Link
                            href="/post/new"
                            className="btn btn-neutral grid place-content-center "
                          >
                            <BsPlusLg />
                            <p className="capitalize text-xs prose-sm">
                              Create New Short Story
                            </p>
                          </Link>
                        </li>
                        {posts.map((post) => (
                          <li
                            key={post._id}
                            className="flex justify-between flex-row"
                          >
                            <div className="flex-1 overflow-hidden items-center">
                              <BsFillFileTextFill />
                              <Link
                                href={`/post/${post._id}/editor`}
                                className="truncate prose-sm text-xs"
                              >
                                {post.title
                                  ? removeHtmlTagsAndQuotation(post.title)
                                  : post.topic}
                              </Link>
                            </div>
                          </li>
                        ))}
                        <li>
                          {!noMorePosts && (
                            <div
                              onClick={() => {
                                getPosts({
                                  lastPostDate: posts[posts.length - 1].create,
                                });
                              }}
                              className="cursor-pointer capitalize grid place-content-center"
                            >
                              <div className="prose-sm ">
                                <BsArrowClockwise size={18} />
                              </div>
                            </div>
                          )}
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="dropdown dropdown-end">
                  {!!user ? (
                    <div className="indicator">
                      <span className="indicator-item indicator-bottom indicator-start badge badge-neutral badge-sm prose-sm text-xs">
                        {availableTokens}
                      </span>
                      <label tabIndex={0} className="cursor-pointer avatar">
                        <div className="w-10 rounded-md">
                          <Image
                            src={user.picture}
                            width={30}
                            height={30}
                            alt="image"
                            className="grayscale"
                          />
                        </div>
                      </label>
                    </div>
                  ) : (
                    <div>
                      <RxAvatar size={18} />
                    </div>
                  )}
                  <ul
                    tabIndex={0}
                    className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
                  >
                    <li>
                      <div>
                        <BsPalette2 />
                        <div className="prose-sm text-xs">Theme</div>

                        <label className="swap swap-rotate">
                          <input type="checkbox" onChange={toggleTheme} />
                          <BsFillSunFill
                            size={10}
                            className=" swap-off prose-sm"
                          />
                          <BsFillMoonStarsFill
                            size={10}
                            className=" swap-on prose-sm"
                          />
                        </label>
                      </div>
                    </li>
                    <li className="">
                      <div>
                        <BsFillWalletFill />
                        <div className="prose-sm text-xs">Buy Tokens</div>
                        <Link href="/token-topup">
                          <div
                            className={`font-bold prose-sm text-xs ${
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
                      {!!user ? (
                        <div>
                          <BsFillPersonFill />
                          <div className="prose-sm capitalize text-xs">
                            {user.name}
                          </div>
                          <Link href="/api/auth/logout">
                            <BsFillArrowRightSquareFill size={10} />
                          </Link>
                        </div>
                      ) : (
                        <Link
                          href="/api/auth/login"
                          className=" text-xs prose-sm"
                        >
                          Login
                        </Link>
                      )}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div>{children}</div>
        </div>
        {/* sm screens */}
        <div className="drawer-side h-screen ">
          <label htmlFor="my-drawer-3" className="drawer-overlay"></label>

          <ul className="menu p-2 w-80 bg-base-100 ">
            <div className="flex flex-col mb-10">
              <div className="flex justify-between items-center mb-4 ">
                <div className="flex justify-between items-center">
                  <Image src="/logo4.svg" width={45} height={15} alt="dyloge" />
                  <div className="flex flex-col ">
                    <p className="font-bold text-lg">Dyloge</p>
                  </div>
                </div>

                <Link href="/options" className="btn btn-neutral">
                  <BsPlusLg />
                </Link>
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
            <div className=" flex flex-col gap-1">
              <ul className="menu menu-xs rounded-md max-w-xs w-full bg-base-200 p-2 m-0">
                <li>
                  <details>
                    <summary className="text-xs prose-sm">
                      <div className="p-1 rounded-md border border-1 border-base-content/50">
                        <BsFillFileTextFill size={10} />
                      </div>
                      Blog Posts
                    </summary>
                    <ul>
                      {posts.map((post) => (
                        <li
                          key={post._id}
                          className="flex justify-between flex-row"
                        >
                          <div className="flex-1 overflow-hidden items-center">
                            <BsFillFileTextFill />
                            <Link
                              href={`/post/${post._id}/editor`}
                              className="truncate prose-sm text-xs"
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
                          className="cursor-pointer mt-10 capitalize grid place-content-center"
                        >
                          <div className="prose-sm ">
                            <BsArrowClockwise size={18} />
                          </div>
                        </div>
                      )}
                    </ul>
                  </details>
                </li>
              </ul>
              <ul className="menu menu-xs rounded-md max-w-xs w-full bg-base-200 p-2 m-0">
                <li>
                  <details>
                    <summary className="text-xs prose-sm">
                      <div className="p-1 rounded-md border border-1 border-base-content/50">
                        <BsFillCameraReelsFill size={10} />
                      </div>
                      Movie Scripts
                    </summary>
                    <ul>
                      {posts.map((post) => (
                        <li
                          key={post._id}
                          className="flex justify-between flex-row"
                        >
                          <div className="flex-1 overflow-hidden items-center">
                            <BsFillCameraReelsFill />
                            <Link
                              href={`/post/${post._id}/editor`}
                              className="truncate prose-sm text-xs"
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
                          className="cursor-pointer mt-10 capitalize grid place-content-center"
                        >
                          <div className="prose-sm ">
                            <BsArrowClockwise size={18} />
                          </div>
                        </div>
                      )}
                    </ul>
                  </details>
                </li>
              </ul>
              <ul className="menu menu-xs rounded-md max-w-xs w-full bg-base-200 p-2 m-0">
                <li>
                  <details>
                    <summary className="text-xs prose-sm">
                      <div className="p-1 rounded-md border border-1 border-base-content/50">
                        <BsVectorPen size={10} />
                      </div>
                      Long Stories
                    </summary>
                    <ul>
                      {posts.map((post) => (
                        <li
                          key={post._id}
                          className="flex justify-between flex-row"
                        >
                          <div className="flex-1 overflow-hidden items-center">
                            <BsFillFileTextFill />
                            <Link
                              href={`/post/${post._id}/editor`}
                              className="truncate prose-sm text-xs"
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
                          className="cursor-pointer mt-10 capitalize grid place-content-center"
                        >
                          <div className="prose-sm ">
                            <BsArrowClockwise size={18} />
                          </div>
                        </div>
                      )}
                    </ul>
                  </details>
                </li>
              </ul>
              <ul className="menu menu-xs rounded-md max-w-xs w-full bg-base-200 p-2 m-0">
                <li>
                  <details>
                    <summary className="text-xs prose-sm">
                      <div className="p-1 rounded-md border border-1 border-base-content/50">
                        <BsFillPenFill size={10} />
                      </div>
                      Short Stories
                    </summary>
                    <ul>
                      {posts.map((post) => (
                        <li
                          key={post._id}
                          className="flex justify-between flex-row"
                        >
                          <div className="flex-1 overflow-hidden items-center">
                            <BsFillFileTextFill />
                            <Link
                              href={`/post/${post._id}/editor`}
                              className="truncate prose-sm text-xs"
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
                          className="cursor-pointer mt-10 capitalize grid place-content-center"
                        >
                          <div className="prose-sm ">
                            <BsArrowClockwise size={18} />
                          </div>
                        </div>
                      )}
                    </ul>
                  </details>
                </li>
              </ul>
            </div>

            {/* {posts.map((post) => (
              <li key={post._id} className="flex justify-between flex-row">
                <div className="flex-1 overflow-hidden items-center">
                  <BsFillFileTextFill />
                  <Link
                    href={`/post/${post._id}/editor`}
                    className="truncate prose-sm text-xs"
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
                className="cursor-pointer mt-10 capitalize grid place-content-center"
              >
                <div className="prose-sm ">
                  <BsArrowClockwise size={18} />
                </div>
              </div>
            )} */}
            <li>
              <div className="divider"></div>
            </li>
            <li>
              <div>
                <BsFillWalletFill />
                <div className="prose-sm text-xs">Buy Tokens</div>
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
                <div className="prose-sm text-xs">Theme</div>

                <label className="swap swap-rotate">
                  <input type="checkbox" onChange={toggleTheme} />
                  <BsFillSunFill size={10} className="swap-off prose" />
                  <BsFillMoonStarsFill size={10} className="swap-on prose" />
                </label>
              </div>
            </li>
            <li>
              {!!user ? (
                <div>
                  <BsFillPersonFill />
                  <div className="capitalize prose-sm text-xs">{user.name}</div>
                  <Link href="/api/auth/logout">
                    <BsFillArrowRightSquareFill size={10} />
                  </Link>
                </div>
              ) : (
                <Link href="/api/auth/login">Login</Link>
              )}
            </li>
          </ul>
        </div>
      </div>
      <WhiteNoisePlayer />
    </div>
  );
};
