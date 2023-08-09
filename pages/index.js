import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";
import { useIntl } from "react-intl";
import ReactCountryFlag from "react-country-flag";
import { useEffect } from "react";
import { useLocalStorage } from "usehooks-ts";
import {
  BsFacebook,
  BsFillCameraReelsFill,
  BsFillChatFill,
  BsFillFileTextFill,
  BsFillMoonStarsFill,
  BsFillPenFill,
  BsFillSunFill,
  BsTwitter,
  BsVectorPen,
  BsYoutube,
} from "react-icons/bs";
import { FaGamepad } from "react-icons/fa";

export default function Home({ dir }) {
  // Theme Change
  const [theme, setTheme] = useLocalStorage();
  const toggleTheme = () => {
    setTheme(theme === "business" ? "lofi" : "business");
  };
  useEffect(() => {
    const body = document.body;
    body.setAttribute("data-theme", theme);
  }, [theme]);

  // i18n
  const { locale, locales, push, asPath } = useRouter();
  const intl = useIntl();
  const logo = intl.formatMessage({
    id: "page.home.logo",
  });
  const getStartedButton = intl.formatMessage({
    id: "page.home.button.getStarted",
  });
  const navItemProducts = intl.formatMessage({
    id: "page.home.navItem.products",
  });
  const navItemPricing = intl.formatMessage({
    id: "page.home.navItem.pricing",
  });
  const navItemAbout = intl.formatMessage({
    id: "page.home.navItem.about",
  });
  const navItemAboutTeam = intl.formatMessage({
    id: "page.home.navItem.about.team",
  });
  const navItemAboutMethod = intl.formatMessage({
    id: "page.home.navItem.about.method",
  });
  const heroTitle = intl.formatMessage({
    id: "page.home.hero.title",
  });
  const heroDescription = intl.formatMessage({
    id: "page.home.hero.description",
  });
  const featuresCodingTitle = intl.formatMessage({
    id: "page.home.features.coding.title",
  });
  const featuresCodingDescription = intl.formatMessage({
    id: "page.home.features.coding.description",
  });
  const featuresWritingTitle = intl.formatMessage({
    id: "page.home.features.writing.title",
  });
  const featuresWritingDescription = intl.formatMessage({
    id: "page.home.features.writing.description",
  });
  const featuresImagesTitle = intl.formatMessage({
    id: "page.home.features.images.title",
  });
  const featuresImagesDescription = intl.formatMessage({
    id: "page.home.features.images.description",
  });
  const featuresLearningTitle = intl.formatMessage({
    id: "page.home.features.learning.title",
  });
  const featuresLearningDescription = intl.formatMessage({
    id: "page.home.features.learning.description",
  });
  const featuresFilesTitle = intl.formatMessage({
    id: "page.home.features.files.title",
  });
  const featuresFilesDescription = intl.formatMessage({
    id: "page.home.features.files.description",
  });
  const featuresOthersTitle = intl.formatMessage({
    id: "page.home.features.others.title",
  });
  const featuresOthersDescription = intl.formatMessage({
    id: "page.home.features.others.description",
  });
  const ourservicesTitle = intl.formatMessage({
    id: "page.home.ourservices.title",
  });
  const testimonialsTitle = intl.formatMessage({
    id: "page.home.testimonials.title",
  });
  const testimonialsDescription1 = intl.formatMessage({
    id: "page.home.testimonials.description1",
  });
  const testimonialsAuthor1 = intl.formatMessage({
    id: "page.home.testimonials.author1",
  });
  const testimonialsPosition1 = intl.formatMessage({
    id: "page.home.testimonials.position1",
  });
  const testimonialsCompany1 = intl.formatMessage({
    id: "page.home.testimonials.company1",
  });
  const testimonialsDescription2 = intl.formatMessage({
    id: "page.home.testimonials.description2",
  });
  const testimonialsAuthor2 = intl.formatMessage({
    id: "page.home.testimonials.author2",
  });
  const testimonialsPosition2 = intl.formatMessage({
    id: "page.home.testimonials.position2",
  });
  const testimonialsCompany2 = intl.formatMessage({
    id: "page.home.testimonials.company2",
  });
  const testimonialsDescription3 = intl.formatMessage({
    id: "page.home.testimonials.description3",
  });
  const testimonialsAuthor3 = intl.formatMessage({
    id: "page.home.testimonials.author3",
  });
  const testimonialsPosition3 = intl.formatMessage({
    id: "page.home.testimonials.position3",
  });
  const testimonialsCompany3 = intl.formatMessage({
    id: "page.home.testimonials.company3",
  });
  const copyright = intl.formatMessage({
    id: "page.home.footer.copyright",
  });

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
    {
      title: "Game Script",
      description:
        "Craft immersive game scenarios effortlessly with AI assistance.",
      icon: <FaGamepad />,
      buttonText: "Creat New Game Script",
      link: "gameScript/new",
    },
    {
      title: "Conversation",
      description: "Chat with AI for expert writing guidance at every step.",
      icon: <BsFillChatFill />,
      buttonText: "Start Conversation",
      link: "conversation/new",
    },
  ];
  // Testimonials Data
  // const testimonialsData = [
  //   {
  //     text: testimonialsDescription1,
  //     name: testimonialsAuthor1,
  //     avatar: "/avatar1.jpg",
  //     position: testimonialsPosition1,
  //     company: testimonialsCompany1,
  //     companyLogo: faAnchor,
  //   },
  //   {
  //     text: testimonialsDescription2,
  //     name: testimonialsAuthor2,
  //     avatar: "/avatar2.jpg",
  //     position: testimonialsPosition2,
  //     company: testimonialsCompany2,
  //     companyLogo: faBabyCarriage,
  //   },
  //   {
  //     text: testimonialsDescription3,
  //     name: testimonialsAuthor3,
  //     avatar: "/avatar3.jpg",
  //     position: testimonialsPosition3,
  //     company: testimonialsCompany3,
  //     companyLogo: faAppleWhole,
  //   },
  // ];

  return (
    <main className="min-w-fit" dir={dir}>
      {/* Navbar */}
      <div className="navbar bg-base-100 sm:px-36">
        <div className="flex-1">
          <div className="flex justify-center items-center ">
            <Image src="/logo4.svg" width={45} height={15} alt="dyloge" />
            <div className="flex flex-col ">
              <p className="font-bold text-lg">Dyloge</p>
            </div>
          </div>
        </div>
        <div className="navbar-end gap-3">
          <div className="flex gap-4">
            <div
              className={`${
                locale === "fa" ? "dropdown-right" : "dropdown-left"
              } dropdown dropdown-bottom flex gap-4`}
            >
              <label tabIndex={0} className="cursor-pointer">
                {/* <ReactCountryFlag
                  countryCode={locale === "fa" ? "IR" : "US"}
                  svg
                /> */}
                <ReactCountryFlag
                  countryCode={locale === "fa" ? "IR" : "US"}
                  svg
                  style={{
                    width: "1rem",
                    height: "1rem",
                  }}
                  title="US"
                />
              </label>
              <ul
                tabIndex={0}
                className="dropdown-content menu p-2 shadow bg-base-100 w-32  gap-6 rounded-md z-[1]"
              >
                {locales.map((locale) => (
                  <Link
                    href={asPath}
                    key={locale}
                    locale={locale}
                    className="flex justify-between items-center"
                  >
                    <div className="text-xs prose-sm ">
                      {locale === "fa" ? "فارسی" : "English"}
                    </div>
                    <ReactCountryFlag
                      countryCode={locale === "fa" ? "IR" : "US"}
                      svg
                      style={{
                        width: "1rem",
                        height: "1rem",
                      }}
                      title="US"
                    />
                  </Link>
                ))}
              </ul>
            </div>
            <label className="swap swap-rotate">
              <input type="checkbox" onChange={toggleTheme} />
              <BsFillMoonStarsFill size={10} className=" swap-on prose-sm" />
              <BsFillSunFill size={10} className=" swap-off prose-sm" />
            </label>
          </div>
        </div>
      </div>
      {/* Hero */}
      <div className="hero bg-base-100 px-6">
        <div className="hero-content max-w-5xl flex-col lg:flex-row-reverse">
          <Image src="/logo4.svg" width={500} height={500} alt="hero" />
          <div>
            <h1 className="text-2xl font-semibold mb-10 ">{heroTitle}</h1>
            <h1 className="text-8xl font-bold ">{logo}</h1>
            <div className="py-6 prose-sm">{heroDescription}</div>

            <Link href="/options" className="btn   capitalize">
              {getStartedButton}
            </Link>
          </div>
        </div>
      </div>
      {/* Features */}
      <div className="grid place-items-center w-full ">
        <div className="max-w-5xl py-24 content-center justify-center">
          <h1 className="text-4xl  text-center font-bold">
            {ourservicesTitle}
          </h1>
          <div className="grid  md:grid-cols-3 grid-cols-1 gap-8 px-6">
            {optionsData.map((i, k) => {
              return (
                <div
                  key={k}
                  className="card mx-2 bg-base-200 hover:bg-base-300  hover:shadow-2xl hover:shadow-slate-50 hover:animate-pulse cursor-pointer"
                >
                  <Link href={i.link}>
                    <div className="card-body  items-center text-center">
                      <h2 className="card-title flex justify-between items-center">
                        <figure>{i.icon}</figure>
                        <div className="prose">{i.title}</div>
                      </h2>
                      <div className="prose text-sm">{i.description}</div>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      {/* Tetimonilas */}
      {/* <div className="grid place-items-center w-full bg-base-100">
        <div className="max-w-5xl content-center justify-center">
          <h1 className="text-4xl  text-center font-bold prose-heading">
            {testimonialsTitle}
          </h1>
          <div className="grid mt-12 md:grid-cols-3 grid-cols-1 gap-8 px-6">
            {testimonialsData.map((t, k) => {
              return (
                <div
                  key={k}
                  className="card w-full h-96 bg-base-100 border border-1 py-4 px-6 justify-between "
                >
                  <div className="grid place-items-center">
                    <div className="avatar w-20 h-20 mb-10 ">
                      <Image
                        src={t.avatar}
                        alt="author"
                        width={50}
                        height={50}
                        className="grayscale rounded"
                      />
                    </div>

                    <div className="prose text-center">{t.text}</div>
                  </div>
                  <div className=" items-center text-center">
                    <div className="">
                      <div className="grid place-items-center">
                        <div className="flex gap-1">
                          <div className="prose text-sm font-bold">
                            {t.name}
                          </div>
                          <div className="prose text-sm font-bold">
                            -{t.position}
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2 items-baseline justify-center">
                        <FontAwesomeIcon icon={t.companyLogo} className="" />
                        <div className="prose">{t.company}</div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div> */}
      {/* Footer */}
      <div className="divider"></div>
      <footer className="footer footer-center p-10 mt-10 bg-base-100  ">
        <div className="flex flex-col gap-0">
          <div className="flex justify-center items-center">
            <Image src="/logo4.svg" width={30} height={10} alt="dyloge" />
            <div className="flex flex-col ">
              <p className="font-bold text-lg prose-sm">{logo}</p>
            </div>
          </div>
          <div className="prose-sm text-xs">{copyright}</div>
        </div>

        <div>
          <div className="grid grid-flow-col gap-4 -mt-10">
            <Link href="/">
              <BsTwitter />
            </Link>
            <Link href="/">
              <BsYoutube />
            </Link>
            <Link href="/">
              <BsFacebook />
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
