/* eslint-disable jsx-a11y/anchor-is-valid */
import { useTranslation } from "next-i18next";
import Link from "next/link";
import { useRouter } from "next/router";

import FbIcon from "../../assets/svg/icon-fb.svg";
import TwIcon from "../../assets/svg/icon-tw.svg";
import Logo from "../../assets/svg/zdravniki-sledilnik-logo.svg";
import LanguageSelector from "../LanguageSelector";

import * as Styled from "./styles";

const Header = function Header() {
  const router = useRouter();
  const { t: tHeader } = useTranslation("header");
  return (
    <Styled.Header>
      <Link href="/">
        <a>
          <Logo />
        </a>
      </Link>
      <Styled.Nav>
        <Styled.List>
          <li>
            <Link href="/gp" passHref>
              <Styled.A className={router.pathname === "/gp" ? "active" : ""}>
                {tHeader("home")}
              </Styled.A>
            </Link>
          </li>
          <li>
            <Link href="/faq" passHref>
              <Styled.A className={router.pathname === "/faq" ? "active" : ""}>
                {tHeader("faq")}
              </Styled.A>
            </Link>
          </li>
          <li>
            <Link href="/about" passHref>
              <Styled.A
                className={router.pathname === "/about" ? "active" : ""}
              >
                {tHeader("about")}
              </Styled.A>
            </Link>
          </li>
          <li>
            <Styled.A
              href="https://covid-19.sledilnik.org/sl/donate"
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => {
                e.target.blur();
              }}
            >
              {tHeader("support")}
            </Styled.A>
          </li>
          <li>
            <Styled.A
              href="https://covid-19.sledilnik.org/sl"
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => {
                e.target.blur();
              }}
            >
              Sledilnik.org
            </Styled.A>
          </li>
          <Styled.SocialIcons>
            <li>
              <a
                href="https://facebook.com/SledilnikOrg"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FbIcon />
              </a>
            </li>
            <li>
              <a
                href="https://twitter.com/sledilnik"
                target="_blank"
                rel="noopener noreferrer"
              >
                <TwIcon />
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
