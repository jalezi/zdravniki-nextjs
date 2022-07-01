import Link from 'next/link';

import { forwardRef } from 'react';

import { toPercent } from '../../../lib/helpers';
import { DoctorPropType } from '../../../types';
import { PhoneBigIcon, PhoneNoneBigIcon } from '../../Shared/Icons';
import Accepts from '../Accepts';
import CircleChart from '../CircleChart';
import * as Styled from './styles';

const Info = forwardRef(({ doctor }, ref) => (
  <Styled.InfoContainer
    ref={ref}
    as="article"
    key={doctor.name + doctor.instId}
  >
    <Styled.InfoContent>
      <Styled.Name as="h3">
        <Link href={`/gp/${doctor.nameSlug}`}>{doctor.name}</Link>
      </Styled.Name>
      <Styled.Provider>{doctor.provider}</Styled.Provider>
      <Styled.Address>{doctor.fullAddress}</Styled.Address>
      <Styled.InfoSubContent>
        <Styled.AcceptsContainer>
          <Accepts accepts={doctor.accepts} />
        </Styled.AcceptsContainer>
        <CircleChart size="26px" percent={doctor.availability} />
        <Styled.AvailabilityText>
          {toPercent(doctor.availability)}
        </Styled.AvailabilityText>
      </Styled.InfoSubContent>
    </Styled.InfoContent>
    <Styled.InfoActions>
      <Styled.IconButtonBase>E</Styled.IconButtonBase>
      <Styled.IconButtonBase
        as={doctor.phone ? 'a' : 'button'}
        href={doctor.phone ? `tel:${doctor.phone}` : undefined}
        phone={doctor.phone}
      >
        {doctor.phone ? <PhoneBigIcon /> : <PhoneNoneBigIcon />}
      </Styled.IconButtonBase>
    </Styled.InfoActions>
  </Styled.InfoContainer>
));

export default Info;

Info.propTypes = { doctor: DoctorPropType.isRequired };
