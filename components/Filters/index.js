import ListViewIcon from "../../assets/svg/icon-list-view.svg";
import MapViewIcon from "../../assets/svg/icon-map-view.svg";
import { useToggleContext } from "../../context/toggleContext";
import { FiltersContainer } from "../../layouts/HomeLayout/styles";
import FilterGroups from "../FilterGroups";
import { Filter as ToggleView, FilterItem } from "../FilterGroups/styles";
import Search from "../Search";

import { FlexContainer } from "./styles";

const Filters = function Filters() {
  const { open, setOpen } = useToggleContext();

  const handleToggle = () => {
    setOpen(!open);
  };

  return (
    <FiltersContainer>
      <FilterGroups />
      <FlexContainer>
        <Search />
        <ToggleView
          upMediumHide
          as="button"
          aria-label={open ? "map" : "list"}
          type="button"
          onClick={handleToggle}
          title={open ? "map" : "list"}
        >
          <FilterItem>{open ? <MapViewIcon /> : <ListViewIcon />}</FilterItem>
        </ToggleView>
      </FlexContainer>
    </FiltersContainer>
  );
};

export default Filters;
