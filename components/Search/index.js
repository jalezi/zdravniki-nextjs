import { useRef, useState } from 'react';

import { useFilteredDoctors } from '../../context/filteredDoctorsContext';
import useDebounce from '../../hooks/useDebounce';
import { SearchIcon } from '../Shared/Icons';
import * as Styled from './styles';

const Search = function Search() {
  const inputRef = useRef();
  const { setSearchValue } = useFilteredDoctors();
  const [value, setValue] = useState('');

  useDebounce(() => setSearchValue(value), 500, [value]);

  const handleChange = e => {
    setValue(e.target.value);
  };

  const handleClear = () => {
    setValue('');
    inputRef.current.focus();
  };

  return (
    <Styled.SearchContainer>
      <Styled.SearchPrefixIcon as="span">
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
          <Styled.CloseIcon />
        </Styled.SearchSuffixIcon>
      )}
    </Styled.SearchContainer>
  );
};

export default Search;
