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
    <Styled.OuterContainer ref={ref} onClick={handleClick}>
      <Styled.Filters ref={forwardedRef} open={open}>
        <Styled.Filter role="group">
          <Styled.FilterItem
            value="gp"
            aria-label="general practitioner"
            as="button"
          >
            družinski zdravnik
          </Styled.FilterItem>
          <Styled.FilterItem value="ped" aria-label="pediatrician" as="button">
            pediater
          </Styled.FilterItem>
          <Styled.FilterItem value="gyn" aria-label="gynecologist" as="button">
            ginekolog
          </Styled.FilterItem>
          <Styled.FilterItem value="den" aria-label="dentist" as="button">
            zobozdravnik
          </Styled.FilterItem>
        </Styled.Filter>
        <Styled.Filter role="group">
          <Styled.FilterItem value="adults" aria-label="adults" as="button">
            odrasli
          </Styled.FilterItem>
          <Styled.FilterItem value="youth" aria-label="youth" as="button">
            otroci
          </Styled.FilterItem>
          <Styled.FilterItem value="students" aria-label="students" as="button">
            študenti
          </Styled.FilterItem>
        </Styled.Filter>
        <Styled.Filter role="group">
          <Styled.FilterItem
            value="y"
            aria-label="accepting new patients"
            as="button"
          >
            sprejema
          </Styled.FilterItem>
          <Styled.FilterItem
            value="n"
            aria-label="rejecting new patients"
            as="button"
          >
            ne sprejema
          </Styled.FilterItem>
          <Styled.FilterItem value="all" as="button">
            vsi
          </Styled.FilterItem>
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
