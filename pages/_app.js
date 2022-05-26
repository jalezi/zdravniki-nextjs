import { appWithTranslation } from "next-i18next";
import Head from "next/head";

import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <style>
          @import
          url(https://fonts.googleapis.com/css2?family=Roboto&display=swap);
        </style>
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default appWithTranslation(MyApp);
