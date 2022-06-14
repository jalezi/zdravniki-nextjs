/* eslint-disable jsx-a11y/anchor-is-valid */
import { useTranslation } from "next-i18next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";

import FbIcon from "../../assets/svg/icon-fb.svg";
import TwIcon from "../../assets/svg/icon-tw.svg";
import Logo from "../../assets/svg/zdravniki-sledilnik-logo.svg";
import LanguageSelector from "../LanguageSelector";

import Backdrop from "./Backdrop";
import Hamburger from "./Hamburger";
import * as Styled from "./styles";

const Header = function Header() {
  const headerRef = useRef();
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { t: tHeader } = useTranslation("header");

  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    if (!open) document.body.style.overflow = "initial";
  }, [open]);

  const onHamburgerClick = () => {
    setOpen((prev) => !prev);

    if (open) {
      headerRef.current.classList.add("closingMenu");
      headerRef.current.classList.remove("menuOpen");
    }

    if (!open) {
      headerRef.current.classList.remove("closingMenu");
      headerRef.current.classList.add("menuOpen");
    }
  };

  const onLinkClick = (e) => {
    e.stopPropagation();
    e.target.blur();
    setOpen(false);
    headerRef.current.classList.remove("menuOpen");
  };

  return (
    <Styled.Header ref={headerRef}>
      <Link href="/">
        <Styled.Logo>
          <Logo />
        </Styled.Logo>
      </Link>
      <Hamburger onClick={onHamburgerClick} isOpen={open} />
      <Styled.Nav isOpen={open}>
        <Styled.Heading>Menu</Styled.Heading>
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
              onClick={onLinkClick}
            >
              {tHeader("support")}
            </Styled.A>
          </li>
          <li>
            <Styled.A
              href="https://covid-19.sledilnik.org/sl"
              target="_blank"
              rel="noopener noreferrer"
              onClick={onLinkClick}
            >
              Sledilnik.org
            </Styled.A>
          </li>
          <Styled.SocialAndLangContainer>
            <li>
              <Styled.SocialIcons>
                <li>
                  <a
                    href="https://facebook.com/SledilnikOrg"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={onLinkClick}
                  >
                    <FbIcon />
                  </a>
                </li>
                <li>
                  <a
                    href="https://twitter.com/sledilnik"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={onLinkClick}
                  >
                    <TwIcon />
                  </a>
                </li>
              </Styled.SocialIcons>
            </li>
            <li>
              <LanguageSelector />
            </li>
          </Styled.SocialAndLangContainer>
        </Styled.List>
      </Styled.Nav>
      <Backdrop />
    </Styled.Header>
  );
};

export default Header;
