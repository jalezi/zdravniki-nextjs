import { useTranslation } from 'next-i18next';
import PropTypes from 'prop-types';

export const HeadQuotient = function HeadQuotient({
  load,
  note,
  date,
  hasOverride,
}) {
  const { t: tCommon } = useTranslation('common');

  return (
    <div>
      <p>{tCommon('doctor.headQuotient')}</p>
      <p>{parseFloat(load)}</p>
      {hasOverride && (
        <>
          <br />
          <div>
            {note && <p>{note}</p>}
            {date && (
              <p>
                {tCommon('doctor.changedOn')} {date}
              </p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

HeadQuotient.defaultProps = {
  hasOverride: undefined,
};

HeadQuotient.propTypes = {
  load: PropTypes.string.isRequired,
  note: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(undefined)])
    .isRequired,
  date: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(undefined)])
    .isRequired,
  hasOverride: PropTypes.bool,
};

export const Availability = function Availability({ date, hasOverride }) {
  const { t: tCommon } = useTranslation('common');

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <p>{tCommon('doctor.doctorAvailability')}</p>
      {hasOverride && (
        <>
          <br />
          <p>
            {tCommon('doctor.changedOn')} {date}
          </p>
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
