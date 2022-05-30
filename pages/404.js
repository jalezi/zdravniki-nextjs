import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";

import SEO from "../components/SEO";
import image from "../public/doctor-404.png";

const StyledHeader = styled.header`
  height: 56px;
  background-color: rgb(38, 197, 237);
  @media only screen and (min-width: 768px) {
    height: 64px;
  }
`;

const StyledMain = styled.main`
  min-height: calc(100% - 56px);
  display: grid;
  justify-content: center;
  align-content: center;
  grid-gap: 0.75em;

  > * {
    margin-inline: auto;
  }

  > h1 {
    font-size: 1.7rem;
    font-weight: 600;
    text-align: center;
  }

  > a {
    text-size-adjust: 100%;
    font-size: 1rem;
    text-align: center;
    outline: none;
    background: rgb(33, 37, 41);
    font-weight: 700;
    color: rgb(255, 255, 255);
    border-radius: 100px;
    padding: 10px 40px;
    cursor: pointer;
  }

  @media only screen and (min-width: 380px) {
    grid-gap: 1.4em;

    > h1 {
      font-size: 2rem;
    }
  }

  @media only screen and (max-height: 420px) and (orientation: landscape) {
    grid-gap: 0.7em;
    font-size: 0.8rem;
    > h1 {
      font-size: 1.5rem;
    }

    > a {
      font-size: 0.8rem;
      padding: 5px 20px;
    }
  }
`;

const StyledImgWrapper = styled.div`
  max-width: 240px;

  @media only screen and (min-width: 420px) {
    max-width: 320px;
  }

  @media only screen and (max-height: 620px) and (orientation: landscape) {
    max-width: 100px;
    font-size: 1.5rem;
  }
`;

export async function getStaticProps({ locale }) {
  const PUBLIC_URL = process.env.PUBLIC_URL ?? null;

  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "pageNotFound"])),
      // Will be passed to the page component as props
      url: PUBLIC_URL,
    },
  };
}

export default function Custom404() {
  const { t: tCommon } = useTranslation("common");
  const { t: tPageNotFound } = useTranslation("pageNotFound");
  const { description } = tCommon("head", { returnObjects: true });
  const { title } = tPageNotFound("seo", { returnObjects: true });

  return (
    <>
      <SEO title={title} description={description} />
      <StyledHeader>Header</StyledHeader>
      <StyledMain>
        <h1>{tPageNotFound("h1")}</h1>
        <p>{tPageNotFound("text")}</p>
        <StyledImgWrapper>
          <Image
            alt="not found"
            src={image}
            srcSet={`/doctor-404.png 1x,/doctor-404@2x.png 2x`}
          />
        </StyledImgWrapper>
        <Link href="/">{tPageNotFound("link")}</Link>
      </StyledMain>
    </>
  );
}
