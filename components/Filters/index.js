import { useCallback } from 'react';

import { useToggleContext } from '../../context/toggleContext';
import { FiltersContainer } from '../../layouts/HomeLayout/styles';
import FilterGroups from '../FilterGroups';
import { Filter as ToggleView, FilterItem } from '../FilterGroups/styles';
import Search from '../Search';
import { ListViewIcon, MapViewIcon } from '../Shared/Icons';

import { FlexContainer } from './styles';

const Filters = function Filters() {
  const [open, setOpen] = useToggleContext();

  const handleToggle = useCallback(() => {
    setOpen(prev => !prev);
  }, [setOpen]);

  return (
    <FiltersContainer>
      <FilterGroups />
      <FlexContainer>
        <Search />
        <ToggleView
          upMediumHide
          as="button"
          aria-label={open ? 'map' : 'list'}
          type="button"
          onClick={handleToggle}
          title={open ? 'map' : 'list'}
        >
          <FilterItem>{open ? <MapViewIcon /> : <ListViewIcon />}</FilterItem>
        </ToggleView>
      </FlexContainer>
    </FiltersContainer>
  );
};

export default Filters;
