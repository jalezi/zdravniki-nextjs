import { compiler } from "markdown-to-jsx";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import dynamic from "next/dynamic";
import PropTypes from "prop-types";
import { Suspense, useEffect } from "react";

import MDXLayout from "../../layouts/MDXLayout";
import * as MDXLayoutStyles from "../../layouts/MDXLayout/styles";
import { GlossaryPropType, QuestionPropType } from "../../types";
import Error from "../_error";

const Section = dynamic(() => import("../../components/Section"));

const Waiting = function Waiting() {
  return <div>Loading...</div>;
};

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

const convertDataDefinition = (definition) => {
  if (definition?.props?.children) {
    return definition.props.children.map((child) =>
      convertDataDefinition(child)
    );
  }

  return definition;
};

export default function Faq({ url, data, errorCode }) {
  const { t: tCommon } = useTranslation("common");
  const { t: tFaq } = useTranslation("faq");

  useEffect(() => {
    document.querySelectorAll("main a").forEach((el) => {
      if (/^(https?:)?\/\//.test(el.getAttribute("href"))) {
        el.setAttribute("target", "_blank");
      }
    });
  }, []);

  useEffect(() => {
    document.querySelectorAll("span[data-term]").forEach((el) => {
      // eslint-disable-next-line no-restricted-syntax
      for (const term of data.glossary) {
        if (term.slug === el.getAttribute("data-term")) {
          el.setAttribute(
            "data-definition",
            compiler(term.definition)
              .props.children.map((child) => convertDataDefinition(child))
              .flat(Infinity)
              .join("")
          );
          el.setAttribute("tabindex", 0);
        }
      }
    });
  }, [data.glossary]);

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
      <Suspense fallback={<Waiting />}>
        <Section sectionData={data.faq} title={headings.general} />
      </Suspense>
      <Suspense fallback={<Waiting />}>
        <Section sectionData={data.glossary} title={headings.glossary} />
      </Suspense>
      {/* {data.glossary.map((term) => (
        <Markdown key={`${term.slug}-glossary`} id={term.slug} hidden>
          {term.definition}
        </Markdown>
      ))} */}
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
