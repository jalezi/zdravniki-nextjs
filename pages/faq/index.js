import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import PropTypes from "prop-types";
import styled from "styled-components";

import Header from "../../components/Header";
import SEO from "../../components/SEO";
import { GlossaryPropType, QuestionPropType } from "../../types";

const StyledMain = styled.main`
  height: calc(100% - 56px);

  @media only screen and (min-width: 768px) {
    max-height: calc(100% - 64px);
  }
`;

const Section = function Section({ sectionData }) {
  return sectionData.map((section) => (
    <div key={`${section.position}-faq`}>
      <p>{section.position}</p>
      <h2>{section.question ?? section.term}</h2>
      <p>{section.answer ?? section.definition}</p>
      <p>{section.slug}</p>
    </div>
  ));
};

Section.propTypes = {
  sectionData: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.shape(QuestionPropType)),
    PropTypes.arrayOf(PropTypes.shape(GlossaryPropType)),
  ]),
};

export async function getStaticProps({ locale }) {
  if (locale === "default") {
    return { notFound: true };
  }

  const response = await fetch(
    `${process.env.CONTENT_ENDPOINT_BASE}/faq/3/?lang=${locale}`
  );
  const data = await response.json();

  const PUBLIC_URL = process.env.PUBLIC_URL ?? null;

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
    <>
      <SEO title="FAQ" description="Some description" url={url} />
      <Header />
      <StyledMain>
        {/* <Section sectionData={data.faq} /> */}
        <Section sectionData={data.glossary} />
      </StyledMain>
    </>
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
