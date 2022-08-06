import { useTranslation } from 'next-i18next';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { useTimestamps } from '../../context/timestampsContext';

export const FooterInfo = styled('footer')(({ theme }) => ({
  fontSize: '0.75rem',
  padding: '0 24px 50px',
  color: theme.textColor4,

  '&.is-dr-page': {
    borderTop: '1px dashed #CDCDCD',
    marginTop: '24px',
    paddingTop: '16px',
    paddingBottom: '16px',
    width: '100%',
  },

  strong: {
    color: theme.textColor3,
    fontWeight: 600,
  },

  a: {
    color: theme.brand,
    fontWeight: 600,
    textDecoration: 'none',
  },
}));

const FooterInfoCard = function FooterInfoCard({ isDrPage = false }) {
  const { t: tCommon } = useTranslation('common');
  const { timestamp } = useTimestamps();

  if (!timestamp) {
    return null;
  }

  const date = tCommon('timestamps.datetime', {
    val: new Date(timestamp),
    formatParams: {
      val: {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      },
    },
  });

  const time = tCommon('timestamps.datetime', {
    val: new Date(timestamp),
    formatParams: {
      val: { hour: 'numeric', minute: 'numeric', hour12: false },
    },
  });

  const updatedAt = `${date} ${tCommon('timestamps.at')} ${time}`;

  return (
    <FooterInfo className={(isDrPage && 'is-dr-page') || ''}>
      {tCommon('footer.dataSource')}:{' '}
      <a href="https://www.zzzs.si" target="_blank" rel="noreferrer">
        ZZZS
      </a>
      ,{' '}
      <a
        href="https://www.gov.si/drzavni-organi/organi-v-sestavi/geodetska-uprava/"
        target="_blank"
        rel="noreferrer"
      >
        GURS
      </a>
      <br />
      {tCommon('footer.lastChange')}: <strong>{updatedAt}</strong>.
      <br />© 2021-{new Date().getFullYear()} <strong>Sledilnik.org</strong>
    </FooterInfo>
  );
};

FooterInfoCard.defaultProps = {
  isDrPage: false,
};

FooterInfoCard.propTypes = {
  isDrPage: PropTypes.bool,
};

export default FooterInfoCard;
