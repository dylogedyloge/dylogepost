import { UserProvider } from "@auth0/nextjs-auth0/client";
import "../styles/globals.css";
import { IntlProvider } from "react-intl";
import en from "../i18n/en.json";
import fa from "../i18n/fa.json";
import { useRouter } from "next/router";
import { PostsProvider } from "../context/postsContext";
import { ShortStoriesProvider } from "../context/shortStoriesContext";

import { Toaster } from "sonner";
import Loading from "../components/Loading/Loading";
import { useEffect, useState } from "react";

const messages = {
  en,
  fa,
};
function getDirection(locale) {
  if (locale === "fa") {
    return "rtl";
  }
  return "ltr";
}

export default function App({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page);
  const router = useRouter();
  // loading for navigation between routes
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const handleStart = () => {
      setLoading(true);
    };

    const handleComplete = () => {
      setLoading(false);
    };

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  }, [router]);

  const isPersian = router.locale === "fa";
  return (
    <UserProvider>
      <PostsProvider>
        <ShortStoriesProvider>
          <main className={`${isPersian ? "font-sans-fa" : "font-sans-en"} `}>
            <IntlProvider
              locale={router.locale}
              messages={messages[router.locale]}
            >
              <Toaster closeButton />
              {loading && <Loading />}
              {getLayout(
                <Component {...pageProps} dir={getDirection(router.locale)} />,
                pageProps
              )}
            </IntlProvider>
          </main>
        </ShortStoriesProvider>
      </PostsProvider>
    </UserProvider>
  );
}
