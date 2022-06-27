import { FiltersContainer } from "../../layouts/HomeLayout/styles";
import FilterGroups from "../FilterGroups";
import Search from "../Search";

const Filters = function Filters() {
  return (
    <FiltersContainer>
      <FilterGroups />
      <div style={{ display: "flex" }}>
        <Search />
        <div>mToggleBtn</div>
      </div>
    </FiltersContainer>
  );
};

export default Filters;
