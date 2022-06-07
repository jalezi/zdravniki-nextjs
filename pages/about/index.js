import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import PropTypes from "prop-types";

import LanguagePageMDX from "../../components/LanguagePageMDX";
import MDXLayout from "../../layouts/MDXLayout";

export async function getStaticProps({ locale }) {
  const PUBLIC_URL = process.env.PUBLIC_URL ?? null;

  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
      // Will be passed to the page component as props
      url: PUBLIC_URL,
    },
  };
}

export default function About({ url }) {
  const router = useRouter();
  return (
    <MDXLayout title="About" description="Some Description" url={url}>
      <LanguagePageMDX slug="about" name={router.locale} />
    </MDXLayout>
  );
}

About.propTypes = { url: PropTypes.string.isRequired };
