import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="true"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,400;0,600;1,700&display=swap"
        rel="stylesheet"
      ></link>

      <link
        href="https://fonts.googleapis.com/css2?family=Courier+Prime&display=swap"
        rel="stylesheet"
      ></link>

      {/* <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="true"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Noto+Sans+Arabic:wght@400;600;700&display=swap"
        rel="stylesheet"
      ></link>  */}

      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="description" content="Your description goes here." />

      <title>Dyloge</title>
      <link rel="icon" href="/logo4.svg" />

      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
