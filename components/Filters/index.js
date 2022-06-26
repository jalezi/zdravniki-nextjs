import PropTypes from "prop-types";
import { forwardRef, useState } from "react";

import AllIcon from "../../assets/svg/icon-all.svg";
import GPIcon from "../../assets/svg/icon-family-dr.svg";
import FilterIcon from "../../assets/svg/icon-filter.svg";

import * as Styled from "./styles";

const Filters = forwardRef(({ forwardedRef }, ref) => {
  const [open, setOpen] = useState();

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <Styled.OuterContainer ref={ref} onClick={handleClick} open={open}>
      <Styled.Filters ref={forwardedRef} open={open}>
        <Styled.Filter as="ul">
          <Styled.FilterItem>družinski zdravnik</Styled.FilterItem>
        </Styled.Filter>
        <Styled.Filter>
          <Styled.FilterItem>neki</Styled.FilterItem>
        </Styled.Filter>
        <Styled.Filter>
          <Styled.FilterItem>neki</Styled.FilterItem>
        </Styled.Filter>
      </Styled.Filters>
      <Styled.Summary open={open}>
        <Styled.FlexBase>
          <FilterIcon />
          <span>Filter</span>
        </Styled.FlexBase>
        <Styled.Info>
          <GPIcon />
          <span>družinski zdravnik</span>
          <Styled.VerticalSeparator />
          <AllIcon />
        </Styled.Info>
      </Styled.Summary>
    </Styled.OuterContainer>
  );
});

export default Filters;

Filters.defaultProps = { forwardedRef: undefined };

Filters.propTypes = {
  forwardedRef: PropTypes.exact({ current: PropTypes.any }),
};
