import { memo, useCallback, useEffect, useState } from 'react';

import { useTranslation } from 'next-i18next';
import PropTypes from 'prop-types';

import * as FilterGroupsStyled from '../FilterGroups/styles';

const FilterGroup = function FilterGroup({ buttons, onChange, initialValue }) {
  const [value, setValue] = useState(initialValue);
  const { t: tCommon } = useTranslation('common');

  useEffect(() => {
    if (value !== initialValue) {
      onChange(value);
    }
  }, [value, initialValue, onChange]);

  const handleBtnClick = useCallback(
    val => {
      setValue(val);
    },
    [setValue]
  );

  const translations = tCommon('doctor', { returnObjects: true });

  return (
    <FilterGroupsStyled.Filter>
      {buttons.map(btn => (
        <FilterGroupsStyled.FilterItem
          as="button"
          key={btn.value}
          value={btn.value}
          onClick={() => handleBtnClick(btn.value)}
          aria-label={btn.label}
          aria-pressed={value === btn.value}
        >
          <btn.Icon />
          <span>{translations[btn.label]}</span>
        </FilterGroupsStyled.FilterItem>
      ))}
    </FilterGroupsStyled.Filter>
  );
};

export default memo(FilterGroup);

FilterGroup.defaultProps = {
  initialValue: '',
  onChange: () => {},
};

FilterGroup.propTypes = {
  buttons: PropTypes.arrayOf(
    PropTypes.exact({
      value: PropTypes.string,
      label: PropTypes.string,
      Icon: PropTypes.elementType,
    })
  ).isRequired,
  initialValue: PropTypes.string,
  onChange: PropTypes.func,
};
