import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { PropTypes } from "prop-types";
import slugify from "slugify";
import styled from "styled-components";
import useSWR from "swr";

import { DOCTORS_CSV_URL } from "../../../constants/csvURL";
import { fetchRawCsvAndParse, getDoctorData } from "../../../lib";
import { DoctorPropType } from "../../../types";

const Header = dynamic(() => import("../../../components/Header"));
const SEO = dynamic(() => import("../../../components/SEO"));

const StyledMain = styled.main`
  height: calc(100% - 56px);

  @media only screen and (min-width: 768px) {
    max-height: calc(100% - 64px);
  }
`;

export async function getStaticPaths() {
  const doctors = await fetchRawCsvAndParse(DOCTORS_CSV_URL);
  const paths = doctors
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
  const { doctors, updatedAt } = await getDoctorData({
    field: "doctor",
    value: slug,
    isSlug: true,
  });

  if (!doctors) {
    return { notFound: true };
  }

  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "header"])),
      // Will be passed to the page component as props
      url: PUBLIC_URL,
      doctors,
      updatedAt,
    },
    revalidate: 1, // find optimum number in seconds
  };
}

export default function DoctorName({ url, doctors, updatedAt }) {
  const { t } = useTranslation("common");
  const { title, description } = t("head", { returnObjects: true });
  const router = useRouter();

  const {
    query: { doctorName },
  } = router;

  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { data } = useSWR(
    `/api/gp?field=doctor&&value=${doctorName}&&isSlug=true`,
    fetcher,
    {
      fallbackData: { url, doctors, updatedAt },
      refreshInterval: 30_000,
    }
  );

  const goBack = () => {
    router.push("/gp/", "/gp/", { scroll: false });
  };

  return (
    <>
      <SEO title={title} description={description} url={url} />
      <Header />{" "}
      <StyledMain>
        <h1>Doctor Name</h1>
        <p>Updated At: {data.updatedAt}</p>
        {data.doctors.map((dr) =>
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
  doctors: PropTypes.arrayOf(DoctorPropType).isRequired,
  updatedAt: PropTypes.number.isRequired,
};
