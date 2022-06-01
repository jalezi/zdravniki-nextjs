import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";

import LanguageSelector from "../../components/LanguageSelector";
import fbSVG from "../../public/icon-fb.svg";
import twSVG from "../../public/icon-tw.svg";
import logo from "../../public/zdravniki-sledilnik-logo.svg";

const StyledHeader = styled.header`
  top: 0;
  left: auto;
  right: 0;
  height: 56px;
  background-color: rgb(38, 197, 237);

  display: flex;
  padding-inline: 1.5rem;

  @media only screen and (min-width: 768px) {
    height: 64px;
  }
`;

const StyledNav = styled.nav`
  margin-left: auto;
  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 0.875rem;

  > ul {
    display: flex;
    gap: 0.5rem;
  }
`;

const StyledList = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
`;
const StyledSocialIcons = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
`;

const Header = function Header() {
  return (
    <StyledHeader>
      <Image
        layout="fixed"
        src={logo}
        alt="logo zdravniki"
        width={142}
        height={64}
      />
      <StyledNav>
        <StyledList>
          <li>
            <Link href="/">Imenik</Link>
          </li>
          <li>
            <Link href="/faq">Pojasnila</Link>
          </li>
          <li>
            <Link href="/about">O projektu</Link>
          </li>
          <li>Podpri</li>
          <li>Sledilnik.org</li>
          <StyledSocialIcons>
            <li>
              <a
                href="https://facebook.com/SledilnikOrg"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  layout="fixed"
                  src={fbSVG}
                  alt="facebook logo"
                  width={24}
                  height={24}
                />
              </a>
            </li>
            <li>
              <a
                href="https://twitter.com/sledilnik"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  layout="fixed"
                  src={twSVG}
                  alt="twitter logo"
                  width={24}
                  height={24}
                />
              </a>
            </li>
          </StyledSocialIcons>
          <li>
            <LanguageSelector />
          </li>
        </StyledList>
      </StyledNav>
    </StyledHeader>
  );
};

export default Header;
