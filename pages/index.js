import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import styled from "styled-components";

const StyledMain = styled.main`
  background: red;
  height: 100%;
`;

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
      // Will be passed to the page component as props
    },
  };
}
export default function Home() {
  const { t } = useTranslation("common");
  const headTranslations = t("head", { returnObjects: true });

  return (
    <>
      <Head>
        <title>{headTranslations.title} - Sledilnik</title>
        <meta name="description" content={headTranslations.description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <StyledMain>Hello world</StyledMain>
    </>
  );
}
