import PropTypes from "prop-types";
import { forwardRef, useState } from "react";

import { ToggleProvider } from "../../context/toggleContext";
import FilterGroup from "../FilterGroup/index";
import { FilterIcon, GPIcon, AllIcon } from "../Shared/Icons";

import { ACCEPTS_GROUP, AGE_GROUP, DR_GROUP } from "./groups";
import * as Styled from "./styles";

const Filters = forwardRef(({ forwardedRef }, ref) => {
  const [open, setOpen] = useState();

  const handleOpenClick = () => {
    setOpen(!open);
  };

  return (
    <Styled.OuterContainer ref={ref} onClick={handleOpenClick}>
      <Styled.Filters ref={forwardedRef} open={open}>
        <ToggleProvider initialValue="gp">
          <FilterGroup buttons={DR_GROUP} />
        </ToggleProvider>
        <ToggleProvider initialValue="">
          <FilterGroup buttons={AGE_GROUP} />
        </ToggleProvider>
        <ToggleProvider initialValue="">
          <FilterGroup buttons={ACCEPTS_GROUP} />
        </ToggleProvider>
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
