/* eslint-disable jsx-a11y/anchor-is-valid */
import Link from 'next/link';
import { useRouter } from 'next/router';

import { useEffect, useRef, useState } from 'react';

import { useTranslation } from 'next-i18next';
import PropTypes from 'prop-types';

import useEventListener from '../../hooks/useEventListener';
import LanguageSelector from '../LanguageSelector';
import { FbIcon, LogoIcon, TwIcon } from '../Shared/Icons';
import Backdrop from './Backdrop';
import Hamburger from './Hamburger';
import * as Styled from './styles';

const Header = function Header({ noAnimation }) {
  const { query } = useRouter();
  const { type } = query;
  const headerRef = useRef();
  const bodyRef = useRef();
  const timeoutRef = useRef();
  const [open, setOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(null);
  const router = useRouter();
  const { t: tHeader } = useTranslation('header');

  const handler = e => {
    if (noAnimation) {
      return;
    }

    const scrollMargin = 100;

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    if (e.currentTarget.scrollY > scrollMargin) {
      setIsScrolled(true);
      timeoutRef.current = setTimeout(() => setIsScrolled(false), 400);
    }

    if (e.currentTarget.scrollY <= scrollMargin) {
      setIsScrolled(false);
    }
  };

  useEventListener('scroll', handler, bodyRef.current);

  useEffect(() => {
    bodyRef.current = window;
  }, []);

  const onHamburgerClick = () => {
    setOpen(prev => !prev);

    if (open) {
      headerRef.current.classList.add('closingMenu');
      headerRef.current.classList.remove('menuOpen');
    }

    if (!open) {
      headerRef.current.classList.remove('closingMenu');
      headerRef.current.classList.add('menuOpen');
    }
  };

  if (isScrolled) {
    headerRef.current?.classList.add('scrolled');
  }
  if (!isScrolled) {
    headerRef.current?.classList.remove('scrolled');
  }

  const onLinkClick = e => {
    e.stopPropagation();
    e.target.blur();
    setOpen(false);
    headerRef.current.classList.remove('menuOpen');
  };

  const homePath = `/${type ?? 'gp'}`; // there is an error if user switch from not /[type] page to /[type] (if 'logo' or 'home' is clicked with href set to '/gp')

  return (
    <Styled.Header ref={headerRef}>
      <Link href={homePath}>
        <Styled.Logo role="link" aria-label="link to home">
          <LogoIcon role="link" aria-label="link to home" />
        </Styled.Logo>
      </Link>
      <Hamburger onClick={onHamburgerClick} isOpen={open} />
      <Styled.Nav isOpen={open}>
        <Styled.Heading>Menu</Styled.Heading>
        <Styled.List>
          <li>
            <Link href={homePath} passHref>
              <Styled.A
                onClick={onLinkClick}
                className={router.pathname === '/[type]' ? 'active' : ''}
              >
                {tHeader('home')}
              </Styled.A>
            </Link>
          </li>
          <li>
            <Link href="/faq" passHref>
              <Styled.A
                onClick={onLinkClick}
                className={router.pathname === '/faq' ? 'active' : ''}
              >
                {tHeader('faq')}
              </Styled.A>
            </Link>
          </li>
          <li>
            <Link href="/about" passHref>
              <Styled.A
                onClick={onLinkClick}
                className={router.pathname === '/about' ? 'active' : ''}
              >
                {tHeader('about')}
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
              {tHeader('support')}
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
        </Styled.List>
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
                  <FbIcon role="link" aria-label="link to facebook" />
                </a>
              </li>
              <li>
                <a
                  href="https://twitter.com/sledilnik"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={onLinkClick}
                >
                  <TwIcon role="link" aria-label="link to twitter" />
                </a>
              </li>
            </Styled.SocialIcons>
          </li>
          <li>
            <LanguageSelector />
          </li>
        </Styled.SocialAndLangContainer>
      </Styled.Nav>
      <Backdrop />
    </Styled.Header>
  );
};

export default Header;

Header.defaultProps = { noAnimation: false };

Header.propTypes = {
  noAnimation: PropTypes.bool,
};
