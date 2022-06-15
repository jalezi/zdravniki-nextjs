import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";

import useEventListener from "../../../hooks/useEventListener";

const ScrollToTop = function ScrollToTop({ Component }) {
  const [show, setShow] = useState(false);
  const componentRef = useRef();
  const scrollYRef = useRef(0);

  const scrollMargin = 100;
  const handler = (e) => {
    scrollYRef.current = e.currentTarget.scrollY;
    if (e.currentTarget.scrollY > scrollMargin) {
      setShow(true);
    }

    if (e.currentTarget.scrollY <= scrollMargin) {
      setShow(false);
    }
  };

  useEventListener("scroll", handler);

  useEffect(() => {
    if (scrollYRef > 100) {
      componentRef.current.classList.remove("first");
    }
  }, []);

  const handleClick = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  return (
    <Component
      ref={componentRef}
      role="button"
      onClick={handleClick}
      show={show}
      className={scrollYRef.current > 1 ? "" : "first"}
    >
      Up
    </Component>
  );
};

ScrollToTop.propTypes = { Component: PropTypes.elementType.isRequired };

export default ScrollToTop;
