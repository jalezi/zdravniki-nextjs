import { useRef } from 'react';

import { useFilteredDoctors } from '../../context/filteredDoctorsContext';
import useDebounce from '../../hooks/useDebounce';
import { SearchIcon } from '../Shared/Icons';
import * as Styled from './styles';

function normalize(value) {
  // Replace all non ASCII chars and replace them with closest equivalent (č => c)
  return value
    .trim()
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036F]/g, '');
}

function mySearchNoLeaflet(searchValue, doctors, bounds) {
  if (!bounds) {
    return doctors;
  }

  const sortedQuery = normalize(searchValue)
    .split(' ')
    .sort((a, b) => b.length - a.length);

  return doctors.filter(doctor => {
    const { lat, lon } = doctor.geoLocation;
    const { _southWest: southWest, _northEast: northEast } = bounds;
    const isInNortheast = northEast.lat >= lat && northEast.lng >= lon;
    const isInSouthwest = southWest.lat <= lat && southWest.lng <= lon;
    const isInBounds = isInNortheast && isInSouthwest;

    if (!searchValue) {
      return isInBounds;
    }

    let normalizedName = normalize(doctor.name);

    const isNameSearchValue = sortedQuery.every(q => {
      const includesQuery = normalizedName.includes(q);
      if (includesQuery) {
        normalizedName = normalizedName.replace(q, '');
      }
      return includesQuery;
    });

    const isAddressOrProviderSearchValue = [
      normalize(doctor.searchAddress),
      normalize(doctor.provider),
    ].some(v => v.includes(normalize(searchValue)));

    return isInBounds && (isNameSearchValue || isAddressOrProviderSearchValue);
  });
}

const Search = function Search() {
  const inputRef = useRef();
  const { doctors, setFilteredDoctors, searchValue, setSearchValue, map } =
    useFilteredDoctors();

  const bounds = map?.getBounds();

  useDebounce(
    () => {
      const foundDoctors = mySearchNoLeaflet(searchValue, doctors, bounds);
      return setFilteredDoctors(foundDoctors);
    },
    500,
    [searchValue]
  );

  const handleChange = e => {
    setSearchValue(e.target.value);
  };

  const handleClear = () => {
    setSearchValue('');
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
        value={searchValue}
      />
      {searchValue && (
        <Styled.SearchSuffixIcon onClick={handleClear}>
          <Styled.CloseIcon />
        </Styled.SearchSuffixIcon>
      )}
    </Styled.SearchContainer>
  );
};

export default Search;
