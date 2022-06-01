import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import styled from "styled-components";

import SEO from "../../components/SEO";
import Header from "../Header";

const StyledMain = styled.main`
  height: calc(100% - 56px);

  @media only screen and (min-width: 768px) {
    max-height: calc(100% - 64px);
  }
`;

export async function getStaticProps({ locale }) {
  const PUBLIC_URL = process.env.PUBLIC_URL ?? null;

  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
      // Will be passed to the page component as props
      url: PUBLIC_URL,
    },
  };
}

export default function Faq() {
  return (
    <>
      <SEO title="About" />
      <Header />
      <StyledMain>Faq</StyledMain>
    </>
  );
}
