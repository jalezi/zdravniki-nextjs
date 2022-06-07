import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { PropTypes } from "prop-types";
import styled from "styled-components";

import Header from "../../components/Header";
import SEO from "../../components/SEO";

const StyledMain = styled.main`
  height: calc(100% - 56px);

  @media only screen and (min-width: 768px) {
    max-height: calc(100% - 64px);
  }
`;
export async function getStaticProps({ locale }) {
  if (locale === "default") {
    return { notFound: true };
  }

  const PUBLIC_URL = process.env.PUBLIC_URL ?? null;

  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "header"])),
      // Will be passed to the page component as props
      url: PUBLIC_URL,
    },
  };
}
export default function GP({ url }) {
  const { t } = useTranslation("common");
  const { title, description } = t("head", { returnObjects: true });

  return (
    <>
      <SEO title={title} description={description} url={url} />
      <Header />
      <StyledMain>GP</StyledMain>
    </>
  );
}

GP.propTypes = { url: PropTypes.string.isRequired };
