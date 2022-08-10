import Link from 'next/link';

import { memo, useCallback, useEffect, useState } from 'react';

import { useTranslation } from 'next-i18next';
import PropTypes from 'prop-types';

import { LinkHrefObjectPropType } from '../../types';
import * as FilterGroupsStyled from '../FilterGroups/styles';

const FilterGroup = function FilterGroup({
  buttons,
  onChange,
  initialValue,
  as = 'button',
  nextjsLink,
}) {
  const [value, setValue] = useState();
  const { t: tCommon } = useTranslation('common');

  useEffect(() => {
    if (!value) {
      setValue(initialValue);
      return;
    }

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
      {nextjsLink
        ? buttons.map(btn => (
            <Link
              key={btn.label}
              href={btn.href}
              passHref={as === 'a' ? true : undefined}
            >
              <FilterGroupsStyled.FilterItem
                as={as}
                value={btn.value}
                onClick={() => handleBtnClick(btn.value)}
                aria-label={btn.label}
                aria-pressed={as === 'a' ? undefined : value === btn.value}
                href={undefined}
                data-active={value === btn.value}
              >
                <btn.Icon />
                <span>{translations[btn.label]}</span>
              </FilterGroupsStyled.FilterItem>
            </Link>
          ))
        : buttons.map(btn => (
            <FilterGroupsStyled.FilterItem
              as={as}
              key={btn.label}
              value={btn.value}
              onClick={() => handleBtnClick(btn.value)}
              aria-label={btn.label}
              aria-pressed={as === 'a' ? undefined : value === btn.value}
              href={as === 'a' ? btn.href : undefined}
              data-active={value === btn.value}
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
  as: 'button',
  nextjsLink: undefined,
};

FilterGroup.propTypes = {
  buttons: PropTypes.arrayOf(
    PropTypes.exact({
      value: PropTypes.string,
      label: PropTypes.string,
      Icon: PropTypes.elementType,
      href: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.shape(LinkHrefObjectPropType),
      ]),
    })
  ).isRequired,
  initialValue: PropTypes.string,
  onChange: PropTypes.func,
  as: PropTypes.oneOf(['button', 'a']),
  nextjsLink: PropTypes.bool,
};
