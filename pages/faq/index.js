import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import PropTypes from "prop-types";

import Section from "../../components/Section";
import MDXLayout from "../../layouts/MDXLayout";
import * as MDXLayoutStyles from "../../layouts/MDXLayout/styles";
import { GlossaryPropType, QuestionPropType } from "../../types";

export async function getStaticProps({ locale }) {
  const PUBLIC_URL = process.env.PUBLIC_URL ?? null;
  if (locale === "default") {
    return { notFound: true };
  }

  const response = await fetch(
    `${process.env.CONTENT_ENDPOINT_BASE}/faq/3/?lang=${locale}`
  );
  const data = await response.json();

  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "header"])),
      // Will be passed to the page component as props
      url: PUBLIC_URL,
      data,
    },
    revalidate: 10,
  };
}

export default function Faq({ url, data }) {
  return (
    <MDXLayout title="FAQ" description="Some description" url={url}>
      <MDXLayoutStyles.H1>Pogosta vprašanja in odgovori</MDXLayoutStyles.H1>
      <MDXLayoutStyles.P>
        V primeru, da potrebujete nujno medicinsko pomoč, se obrnite na lokalno
        urgentno službo oz. pokličite 112.
      </MDXLayoutStyles.P>
      <MDXLayoutStyles.H2>Splošno</MDXLayoutStyles.H2>
      <Section sectionData={data.faq} />
      <MDXLayoutStyles.H2>Slovar izrazov</MDXLayoutStyles.H2>
      <Section sectionData={data.glossary} />
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
};
