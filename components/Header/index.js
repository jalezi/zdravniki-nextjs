import Image from "next/image";
import Link from "next/link";

import fbSVG from "../../public/icon-fb.svg";
import twSVG from "../../public/icon-tw.svg";
import logo from "../../public/zdravniki-sledilnik-logo.svg";
import LanguageSelector from "../LanguageSelector";

import * as Styled from "./styles";

const Header = function Header() {
  return (
    <Styled.Header>
      <Image
        layout="fixed"
        src={logo}
        alt="logo zdravniki"
        width={142}
        height={64}
      />
      <Styled.Nav>
        <Styled.List>
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
          <Styled.SocialIcons>
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
          </Styled.SocialIcons>
          <li>
            <LanguageSelector />
          </li>
        </Styled.List>
      </Styled.Nav>
    </Styled.Header>
  );
};

export default Header;
