import PropTypes from "prop-types";

import * as Styled from "./styles";

const Hamburger = function Hamburger({ onClick, isOpen }) {
  return (
    <Styled.Container onClick={onClick} isOpen={isOpen} className="🍔">
      <Styled.Line />
      <Styled.Line />
      <Styled.Line />
    </Styled.Container>
  );
};

Hamburger.propTypes = {
  onClick: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
};

export default Hamburger;
