import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import dynamic from "next/dynamic";
import PropTypes from "prop-types";
import { Suspense } from "react";

import MDXLayout from "../../layouts/MDXLayout";
import * as MDXLayoutStyles from "../../layouts/MDXLayout/styles";
import { GlossaryPropType, QuestionPropType } from "../../types";
import Error from "../_error";

const Sections = dynamic(() => import("../../components/Sections"), {
  suspense: true,
});

export async function getStaticProps({ locale }) {
  const PUBLIC_URL = process.env.PUBLIC_URL ?? null;
  if (locale === "default") {
    return { notFound: true };
  }

  const response = await fetch(
    `${process.env.CONTENT_ENDPOINT_BASE}/faq/3/?lang=${locale}`
  );
  const errorCode = response.ok ? false : response.statusCode;
  const data = await response.json();

  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "header", "faq"])),
      // Will be passed to the page component as props
      url: PUBLIC_URL,
      data,
      errorCode,
    },
    revalidate: 10,
  };
}

export default function Faq({ url, data, errorCode }) {
  const { t: tCommon } = useTranslation("common");
  const { t: tFaq } = useTranslation("faq");

  if (errorCode) {
    return <Error statusCode={errorCode} url={url} />;
  }

  const title = tFaq("seo.title");
  const description = tCommon("head.description");
  const noticeText = tFaq("notice");
  const headings = tFaq("headings", { returnObjects: true });

  return (
    <MDXLayout title={title} description={description} url={url}>
      <MDXLayoutStyles.H1>{headings.title}</MDXLayoutStyles.H1>
      <MDXLayoutStyles.P>{noticeText}</MDXLayoutStyles.P>
      <Suspense fallback={<div>Waiting</div>}>
        <Sections data={data} />
      </Suspense>
    </MDXLayout>
  );
}

Faq.propTypes = {
  url: PropTypes.string.isRequired,
  data: PropTypes.shape({
    faq: PropTypes.arrayOf(PropTypes.shape(QuestionPropType)),
    glossary: PropTypes.arrayOf(PropTypes.shape(GlossaryPropType)),
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    resource_uri: PropTypes.string.isRequired,
  }).isRequired,
  errorCode: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]).isRequired,
};
