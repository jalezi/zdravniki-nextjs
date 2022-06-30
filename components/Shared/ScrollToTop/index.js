import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';

import useEventListener from '../../../hooks/useEventListener';

import { IconContainer } from './styles';

const ScrollToTop = function ScrollToTop({ Component, element }) {
  const [show, setShow] = useState(false);
  const componentRef = useRef();
  const scrollYRef = useRef(0);

  const scrollMargin = 200;
  const handler = e => {
    scrollYRef.current = e.currentTarget.scrollY;
    if (e.currentTarget.scrollY > scrollMargin) {
      setShow(true);
    }

    if (e.currentTarget.scrollY <= scrollMargin) {
      setShow(false);
    }
  };

  useEventListener('scroll', handler, element);

  useEffect(() => {
    if (scrollYRef > scrollMargin) {
      componentRef.current.classList.remove('first');
    }
  }, []);

  const handleClick = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  };

  return (
    <Component
      ref={componentRef}
      role="button"
      onClick={handleClick}
      show={show}
      className={scrollYRef.current > 1 ? '' : 'first'}
    >
      <IconContainer>^</IconContainer>
    </Component>
  );
};

ScrollToTop.defaultProps = {
  element: undefined,
};

ScrollToTop.propTypes = {
  Component: PropTypes.elementType.isRequired,
  element: PropTypes.element,
};

export default ScrollToTop;
