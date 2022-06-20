import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { PropTypes } from "prop-types";
import slugify from "slugify";
import styled from "styled-components";

import { DOCTORS_CSV_URL } from "../../../constants/csvURL";
import {
  createPopulateDoctorWithInstitution,
  fetchAllRaw,
  fetchRawCsv,
  findDoctorByTypeAndSlugifyName,
} from "../../../lib";
import { DoctorFromCsvPropType } from "../../../types";

const Header = dynamic(() => import("../../../components/Header"));
const SEO = dynamic(() => import("../../../components/SEO"));

const StyledMain = styled.main`
  height: calc(100% - 56px);

  @media only screen and (min-width: 768px) {
    max-height: calc(100% - 64px);
  }
`;

export async function getStaticPaths() {
  const doctors = await fetchRawCsv(DOCTORS_CSV_URL);
  const paths = doctors.data
    .map((doctor) => ({
      params: { doctorName: slugify(doctor.doctor, { lower: true }) },
    }))
    .slice(0, 20); // limit to 20 for performance reasons

  return { paths, fallback: "blocking" };
}

export async function getStaticProps({ locale, params }) {
  if (locale === "default") {
    return { notFound: true };
  }

  const { PUBLIC_URL } = process.env;

  const slug = params.doctorName;
  const [doctors, institutions] = await fetchAllRaw();

  const populateWithInstitution =
    createPopulateDoctorWithInstitution(institutions);
  const doctor = findDoctorByTypeAndSlugifyName(doctors, "gp", slug)?.map(
    populateWithInstitution
  );

  if (!doctor || doctor?.length === 0) {
    return { notFound: true };
  }

  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "header"])),
      // Will be passed to the page component as props
      url: PUBLIC_URL,
      doctor,
    },
    revalidate: 1, // find optimum number in seconds
  };
}

export default function DoctorName({ url, doctor }) {
  const { t } = useTranslation("common");
  const { title, description } = t("head", { returnObjects: true });

  const router = useRouter();

  const goBack = () => {
    router.push("/gp", "/gp", { scroll: false });
  };

  return (
    <>
      <SEO title={title} description={description} url={url} />
      <Header />
      <StyledMain>
        <h1>Doctor Name</h1>
        {doctor.map((dr) =>
          Object.entries(dr).map(([key, value]) => (
            <p key={`${value}${key}`}>
              {key}: {value}
            </p>
          ))
        )}
        <button type="button" onClick={goBack}>
          Nazaj
        </button>
      </StyledMain>
    </>
  );
}

DoctorName.propTypes = {
  url: PropTypes.string.isRequired,
  doctor: PropTypes.arrayOf(DoctorFromCsvPropType).isRequired,
};
