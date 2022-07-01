import { useTranslation } from 'next-i18next';
import PropTypes from 'prop-types';

import { BanRedIcon, CheckCircleGreenIcon } from '../Shared/Icons';

const Accepts = function Accepts({ accepts }) {
  const { t: tCommon } = useTranslation('common');
  const text =
    accepts === 'y'
      ? tCommon('doctor.accepts').toUpperCase()
      : tCommon('doctor.rejects').toUpperCase();

  return (
    <>
      {accepts === 'y' ? <CheckCircleGreenIcon /> : <BanRedIcon />}
      {text}
    </>
  );
};

Accepts.propTypes = {
  accepts: PropTypes.oneOf(['y', 'n']).isRequired,
};

export default Accepts;
