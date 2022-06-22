import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import dynamic from "next/dynamic";
import { PropTypes } from "prop-types";
import useSWR from "swr";

import { MAP, PER_PAGE } from "../../constants/common";
import * as Styled from "../../layouts/HomeLayout/styles";
import { getDoctorData } from "../../lib";
import { DoctorPropType } from "../../types";

const Error = dynamic(() => import("../_error"));
const HomeLayout = dynamic(() => import("../../layouts/HomeLayout"));

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
  const MapWithNoSSR = dynamic(() => import("../../components/Map"), {
    ssr: false,
  });

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
    <HomeLayout title={title} description={description} url={url}>
      <Styled.MapContainer>
        <MapWithNoSSR
          center={MAP.GEO_LOCATION.SL_CENTER}
          zoom={MAP.ZOOM}
          style={{ height: "100%", width: "100%" }}
        />
      </Styled.MapContainer>
      <Styled.ListContainer>
        <h2>List</h2>
      </Styled.ListContainer>
    </HomeLayout>
  );
}

Gp.propTypes = {
  url: PropTypes.string.isRequired,
  doctors: PropTypes.arrayOf(DoctorPropType.isRequired).isRequired,
  updatedAt: PropTypes.number.isRequired,
};
