import styled from "styled-components";

import SEO from "../../components/SEO";
import Header from "../Header";

const StyledMain = styled.main`
  height: calc(100% - 56px);

  @media only screen and (min-width: 768px) {
    max-height: calc(100% - 64px);
  }
`;

export default function About() {
  return (
    <>
      <SEO title="About" />
      <Header />
      <StyledMain>About</StyledMain>
    </>
  );
}