import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import styled from "styled-components";

import SEO from "../components/SEO";

const StyledMain = styled.main`
  background: red;
  height: 100%;
`;

export async function getStaticProps({ locale }) {
  if (locale === "default") {
    return { notFound: true };
  }

  const PUBLIC_URL = process.env.PUBLIC_URL ?? null;

  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
      // Will be passed to the page component as props
      url: PUBLIC_URL,
    },
  };
}
export default function Home({ url }) {
  const { t } = useTranslation("common");
  const { title, description } = t("head", { returnObjects: true });

  return (
    <>
      <SEO title={title} description={description} url={url} />
      <StyledMain>Hello world</StyledMain>
    </>
  );
}
