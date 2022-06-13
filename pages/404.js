import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Image from "next/image";
import Link from "next/link";
import PropTypes from "prop-types";

import ErrorLayout from "../layouts/ErrorLayout";
import * as Styled from "../layouts/ErrorLayout/styles";
import image from "../public/doctor-404.png";

export async function getStaticProps({ locale }) {
  const PUBLIC_URL = process.env.PUBLIC_URL ?? null;

  return {
    props: {
      ...(await serverSideTranslations(locale, [
        "common",
        "header",
        "pageNotFound",
      ])),
      // Will be passed to the page component as props
      url: PUBLIC_URL,
    },
  };
}

export default function Custom404({ url }) {
  const { t: tCommon } = useTranslation("common");
  const { t: tPageNotFound } = useTranslation("pageNotFound");
  const { description } = tCommon("head", { returnObjects: true });
  const { title } = tPageNotFound("seo", { returnObjects: true });

  return (
    <ErrorLayout title={title} description={description} url={url}>
      <h1>{tPageNotFound("h1")}</h1>
      <p>{tPageNotFound("text")}</p>
      <Styled.ImgWrapper>
        <Image
          alt="not found"
          src={image}
          srcSet="/doctor-404.png 1x,/doctor-404@2x.png 2x"
        />
      </Styled.ImgWrapper>
      <Link href="/">{tPageNotFound("link")}</Link>
    </ErrorLayout>
  );
}

Custom404.propTypes = { url: PropTypes.string.isRequired };
