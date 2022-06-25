import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import dynamic from "next/dynamic";
import { PropTypes } from "prop-types";
import useSWR from "swr";

import Search from "../../components/Search";
// import { PER_PAGE } from "../../constants/common";
import * as Styled from "../../layouts/HomeLayout/styles";
import { getDoctorData, sortByField } from "../../lib";
import { DoctorPropType } from "../../types";

const Error = dynamic(() => import("../_error"));
const HomeLayout = dynamic(() => import("../../layouts/HomeLayout"));

export async function getStaticProps({ locale }) {
  if (locale === "default") {
    return { notFound: true };
  }

  const { PUBLIC_URL } = process.env;
  const { updatedAt } = await getDoctorData({ type: "gp" });

  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "header", "map"])),
      // Will be passed to the page component as props
      url: PUBLIC_URL,
      doctors: [],
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

  const { data, error } = useSWR("/api/gp", fetcher, {
    fallbackData: { doctors, updatedAt },
    refreshInterval: 30_000,
    // ? use onErrorRetry
  });

  const sortedDoctors = data.doctors.sort(sortByField("doctor"));

  if (error) {
    // TODO use some kind of logger for error.status
    return <Error statusCode={500} url={url} />;
  }

  const { title, description } = t("head", { returnObjects: true });

  return (
    <HomeLayout title={title} description={description} url={url}>
      <Styled.MapContainer>
        {data.doctors.length === 0 ? (
          <div>Loading...</div>
        ) : (
          <MapWithNoSSR doctors={sortedDoctors} />
        )}
      </Styled.MapContainer>
      <Styled.FilterContainer>
        <Search />
      </Styled.FilterContainer>
      <Styled.ListContainer>
        <h2>List</h2>
        {sortedDoctors.map((doctor) => (
          <p key={doctor.doctor + doctor.inst_id + Math.random() * Date.now()}>
            {doctor.doctor}
          </p>
        ))}
      </Styled.ListContainer>
    </HomeLayout>
  );
}

Gp.propTypes = {
  url: PropTypes.string.isRequired,
  doctors: PropTypes.arrayOf(DoctorPropType.isRequired).isRequired,
  updatedAt: PropTypes.number.isRequired,
};
