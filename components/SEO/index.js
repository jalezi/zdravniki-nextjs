import Head from "next/head";
import PropTypes from "prop-types";

const SEO = function SEO({ title, description, url }) {
  const socialImgUrl = `${url}/share-card-photo.png`;
  // console.log({ title, description, url });
  return (
    <Head>
      <title>{title} - Sledilnik</title>
      <meta name="description" content={description} />
      <link rel="icon" href="/favicon.ico" />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
      <link rel="manifest" href="/manifest.json" />
      <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#09AFDA" />
      <meta name="msapplication-TileColor" content="#09AFDA" />
      <meta name="theme-color" content="#09AFDA" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@sledilnik" />
      <meta name="twitter:creator" content="@sledilnik" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={socialImgUrl} />
      <meta property="og:image" content={socialImgUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <link rel="canonical" href="https://zdravniki.sledilnik.org/" />
    </Head>
  );
};

SEO.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  url: PropTypes.string,
};

export default SEO;