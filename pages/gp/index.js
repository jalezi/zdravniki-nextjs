import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import dynamic from "next/dynamic";
import { PropTypes } from "prop-types";
import styled from "styled-components";
import useSWR from "swr";

import { PER_PAGE } from "../../constants/common";
import { getDoctorData } from "../../lib";
import { DoctorPropType } from "../../types";

const DoctorCards = dynamic(import("../../components/DoctorCards"));
const Error = dynamic(() => import("../_error"));
const Header = dynamic(() => import("../../components/Header"));
const SEO = dynamic(() => import("../../components/SEO"));

const StyledMain = styled.main`
  height: calc(100% - 56px);
  br {
    margin-block: 0.5rem;
  }

  @media only screen and (min-width: 768px) {
    max-height: calc(100% - 64px);
  }
`;

export async function getStaticProps({ locale }) {
  if (locale === "default") {
    return { notFound: true };
  }

  const { PUBLIC_URL } = process.env;
  const { doctors, updatedAt } = await getDoctorData({ type: "gp" });

  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "header"])),
      // Will be passed to the page component as props
      url: PUBLIC_URL,
      doctors: doctors.slice(0, PER_PAGE),
      updatedAt,
    },
    revalidate: 1,
  };
}

const fetcher = async (fetchUrl) => {
  const res = await fetch(fetchUrl);
  const data = await res.json();

  if (res.status !== 200) {
    throw new Error(data.message);
  }
  return data;
};

export default function Gp({ url, doctors, updatedAt }) {
  const { t } = useTranslation("common");

  const { data } = useSWR("/api/gp", fetcher, {
    fallbackData: { url, doctors, updatedAt },
    refreshInterval: 30_000,
  });

  if (!doctors && data.doctors) {
    return <Error statusCode={500} url={url} />;
  }

  const { title, description } = t("head", { returnObjects: true });

  return (
    <>
      <SEO title={title} description={description} url={url} />
      <Header noAnimation />
      <StyledMain>
        <h1>General Practicians</h1>
        <p>Updated At: {data.updatedAt}</p>
        <br />
        <DoctorCards doctors={data.doctors} />
        <br />
      </StyledMain>
    </>
  );
}

Gp.propTypes = {
  url: PropTypes.string.isRequired,
  doctors: PropTypes.arrayOf(DoctorPropType.isRequired).isRequired,
  updatedAt: PropTypes.number.isRequired,
};
