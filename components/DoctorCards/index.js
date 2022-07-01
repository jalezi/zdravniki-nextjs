import Link from 'next/link';

import PropTypes from 'prop-types';

import { toPercent } from '../../lib/helpers';
import { DoctorPropType } from '../../types';
import { PhoneBigIcon, PhoneNoneBigIcon } from '../Shared/Icons';
import Accepts from './Accepts';
import CircleChart from './CircleChart';
import * as Styled from './styles';

const DoctorCards = function DoctorCards({ doctors }) {
  const drJsx = dr => (
    <Styled.InfoContainer as="article" key={dr.name + dr.instId}>
      <Styled.InfoContent>
        <Styled.Name as="h3">
          <Link href={`/gp/${dr.nameSlug}`}>{dr.name}</Link>
        </Styled.Name>
        <Styled.Provider>{dr.provider}</Styled.Provider>
        <Styled.Address>{dr.fullAddress}</Styled.Address>
        <Styled.InfoSubContent>
          <Styled.AcceptsContainer>
            <Accepts accepts={dr.accepts} />
          </Styled.AcceptsContainer>
          <CircleChart size="26px" percent={dr.availability} />
          <Styled.AvailabilityText>
            {toPercent(dr.availability)}
          </Styled.AvailabilityText>
        </Styled.InfoSubContent>
      </Styled.InfoContent>
      <Styled.InfoActions>
        <Styled.IconButtonBase>E</Styled.IconButtonBase>
        <Styled.IconButtonBase
          phone={dr.phone}
          disabled={dr.phone ? undefined : true}
        >
          {dr.phone ? <PhoneBigIcon /> : <PhoneNoneBigIcon />}
        </Styled.IconButtonBase>
      </Styled.InfoActions>
    </Styled.InfoContainer>
  );
  return <>{doctors.map(drJsx)}</>;
};

DoctorCards.propTypes = {
  doctors: PropTypes.arrayOf(DoctorPropType.isRequired).isRequired,
};

export default DoctorCards;
