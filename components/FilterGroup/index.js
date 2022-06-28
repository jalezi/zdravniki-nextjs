import PropTypes from "prop-types";

import { useToggleContext } from "../../context/toggleContext";
import * as FilterGroupsStyled from "../FilterGroups/styles";

const FilterGroup = function FilterGroup({ buttons }) {
  const [value, setValue] = useToggleContext();

  const handleBtnClick = (val) => {
    setValue(val);
  };

  return (
    <FilterGroupsStyled.Filter>
      {buttons.map((btn) => (
        <FilterGroupsStyled.FilterItem
          as="button"
          key={btn.value}
          value={btn.value}
          onClick={() => handleBtnClick(btn.value)}
          aria-label={btn.label}
          aria-pressed={value === btn.value}
        >
          <btn.Icon />
          <span>{btn.label}</span>
        </FilterGroupsStyled.FilterItem>
      ))}
    </FilterGroupsStyled.Filter>
  );
};

export default FilterGroup;

FilterGroup.propTypes = {
  buttons: PropTypes.arrayOf(
    PropTypes.exact({
      value: PropTypes.string,
      label: PropTypes.string,
      Icon: PropTypes.elementType,
    })
  ).isRequired,
};
