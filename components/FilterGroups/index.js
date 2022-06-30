import { useTranslation } from 'next-i18next';
import { useCallback, useState } from 'react';

import {
  ACCEPTS_ICON_MAP,
  AGE_GROUP_ICON_MAP,
  DR_TYPES_I18_MAP,
  DR_TYPES_ICON_MAP,
} from '../../constants/common';
import { useToggleFiltersContext } from '../../context/toggleFiltersContext';
import FilterGroup from '../FilterGroup/index';
import { FilterIcon } from '../Shared/Icons';

import { ACCEPTS_GROUP, AGE_GROUP, DR_GROUP } from './groups';
import * as Styled from './styles';

const Filters = function Filters() {
  const [expandFilters, setExpandFilters] = useState();
  const [filterState, setFilterState] = useToggleFiltersContext();
  const { t: tCommon } = useTranslation('common');

  const handleOpenClick = useCallback(() => {
    setExpandFilters(prev => !prev);
  }, [setExpandFilters]);

  const { drType, ageGroup, accepts } = filterState;

  const onDrTypeChange = useCallback(
    val => setFilterState(prev => ({ ...prev, drType: val })),
    [setFilterState]
  );
  const onAgeGroupChange = useCallback(
    val => setFilterState(prev => ({ ...prev, ageGroup: val })),
    [setFilterState]
  );
  const onAcceptsChange = useCallback(
    val => setFilterState(prev => ({ ...prev, accepts: val })),
    [setFilterState]
  );

  const DrTypeIcon = DR_TYPES_ICON_MAP[filterState.drType];
  const AgeGroupIcon = AGE_GROUP_ICON_MAP[filterState.ageGroup];
  const AcceptsIcon = ACCEPTS_ICON_MAP[filterState.accepts];
  const doctorTranslation = tCommon(
    `doctor.${DR_TYPES_I18_MAP[filterState.drType]}`
  );

  return (
    <Styled.OuterContainer onClick={handleOpenClick} open={expandFilters}>
      <Styled.Filters open={expandFilters}>
        <FilterGroup
          buttons={DR_GROUP}
          onChange={onDrTypeChange}
          initialValue={drType ?? ''}
        />
        {filterState.drType?.includes('den') && (
          <FilterGroup
            buttons={AGE_GROUP}
            onChange={onAgeGroupChange}
            initialValue={ageGroup ?? ''}
          />
        )}
        <FilterGroup
          buttons={ACCEPTS_GROUP}
          onChange={onAcceptsChange}
          initialValue={accepts ?? ''}
        />
      </Styled.Filters>
      <Styled.Summary open={expandFilters}>
        <Styled.FlexBase>
          <FilterIcon />
          <span>{tCommon('filter')}</span>
        </Styled.FlexBase>
        <Styled.Info>
          <DrTypeIcon />
          <span>{doctorTranslation}</span>
          {filterState.drType?.includes('den') && (
            <>
              <Styled.VerticalSeparator />
              <AgeGroupIcon />
            </>
          )}
          <Styled.VerticalSeparator />
          <AcceptsIcon />
        </Styled.Info>
      </Styled.Summary>
    </Styled.OuterContainer>
  );
};

export default Filters;
