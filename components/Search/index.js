import { useRef, useState } from "react";

import CloseIcon from "../../assets/svg/icon-close.svg";
import SearchIcon from "../../assets/svg/icon-search.svg";

import * as Styled from "./styles";

const Search = function Search() {
  const inputRef = useRef();
  const [value, setValue] = useState("");

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleClear = () => {
    setValue("");
    inputRef.current.focus();
  };

  return (
    <Styled.SearchContainer>
      <Styled.SearchPrefixIcon>
        <SearchIcon />
      </Styled.SearchPrefixIcon>
      <Styled.InputSearch
        ref={inputRef}
        type="search"
        name="Search"
        placeholder="Search..."
        onChange={handleChange}
        value={value}
      />
      {value && (
        <Styled.SearchSuffixIcon onClick={handleClear}>
          <CloseIcon />
        </Styled.SearchSuffixIcon>
      )}
    </Styled.SearchContainer>
  );
};

export default Search;
