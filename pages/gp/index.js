import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import dynamic from "next/dynamic";
import Link from "next/link";
import { PropTypes } from "prop-types";
import styled from "styled-components";

import {
  createPopulateDoctorWithInstitution,
  fetchAllRaw,
  findDoctorByType,
  toSlug,
} from "../../lib";
import { DoctorFromCsvPropType } from "../../types";

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
  const [doctors, institutions] = await fetchAllRaw();
  const populateWithInstitution =
    createPopulateDoctorWithInstitution(institutions);

  const gpDoctors = findDoctorByType(doctors, "gp")?.map(
    populateWithInstitution
  );

  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "header"])),
      // Will be passed to the page component as props
      url: PUBLIC_URL,
      doctors: gpDoctors,
    },
  };
}

export default function Gp({ url, doctors }) {
  const { t } = useTranslation("common");

  if (!doctors) {
    return <Error statusCode={500} url={url} />;
  }

  const { title, description } = t("head", { returnObjects: true });

  const drJsx = (dr) => (
    <div key={dr.doctor + dr.id_inst}>
      <br />
      {Object.entries(dr).map(([key, value]) => {
        if (key === "doctor") {
          return (
            <p key={`${value}${key}S`}>
              <span>{key}: </span>
              <Link href={`/gp/${toSlug(value)}`} key={`${value}${key}L`}>
                {value}
              </Link>
            </p>
          );
        }
        return (
          <p key={`${value}${key}M`}>
            {key}: {value}
          </p>
        );
      })}
      <br />
    </div>
  );

  return (
    <>
      <SEO title={title} description={description} url={url} />
      <Header />
      <StyledMain>
        <h1>General Practicians</h1>
        <br />
        {doctors.map(drJsx)}
        <br />
      </StyledMain>
    </>
  );
}

Gp.propTypes = {
  url: PropTypes.string.isRequired,
  doctors: PropTypes.arrayOf(DoctorFromCsvPropType).isRequired,
};
