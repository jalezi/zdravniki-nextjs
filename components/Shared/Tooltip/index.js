import { useTranslation } from 'next-i18next';
import PropTypes from 'prop-types';

import * as Styled from './styles';

export const HeadQuotient = function HeadQuotient({
  load,
  note,
  date,
  hasOverride,
}) {
  const { t: tCommon } = useTranslation('common');

  return (
    <Styled.HeadQuotientContainer>
      <Styled.P>{tCommon('doctor.headQuotient')}</Styled.P>
      <Styled.Load>{parseFloat(load)}</Styled.Load>
      {hasOverride && (
        <>
          <Styled.TooltipDivider />
          {note && <Styled.P>{note}</Styled.P>}
          {date && (
            <Styled.P>
              {tCommon('doctor.changedOn')} {date}
            </Styled.P>
          )}
        </>
      )}
    </Styled.HeadQuotientContainer>
  );
};

HeadQuotient.defaultProps = {
  date: undefined,
  hasOverride: undefined,
  note: undefined,
};

HeadQuotient.propTypes = {
  date: PropTypes.string,
  hasOverride: PropTypes.bool,
  load: PropTypes.string.isRequired,
  note: PropTypes.string,
};

export const Availability = function Availability({ date, hasOverride }) {
  const { t: tCommon } = useTranslation('common');

  return (
    <div>
      <Styled.P>{tCommon('doctor.doctorAvailability')}</Styled.P>
      {hasOverride && (
        <>
          <Styled.TooltipDivider />
          <Styled.P>
            {tCommon('doctor.changedOn')} {date}
          </Styled.P>
        </>
      )}
    </div>
  );
};

Availability.propTypes = {
  date: PropTypes.string,
  hasOverride: PropTypes.bool,
};

Availability.defaultProps = {
  date: undefined,
  hasOverride: undefined,
};

export const Phone = function Phone({ phone }) {
  const { t: tCommon } = useTranslation('common');

  return <Styled.P>{phone || tCommon('doctorCard.noPhone')}</Styled.P>;
};

Phone.propTypes = {
  phone: PropTypes.string,
};

Phone.defaultProps = {
  phone: undefined,
};
