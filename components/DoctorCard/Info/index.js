import Link from 'next/link';
import { useRouter } from 'next/router';

import { forwardRef } from 'react';

import Tooltip from '@material-ui/core/Tooltip';

import { toPercent, formatDateToLocale } from '../../../lib/helpers';
import { DoctorPropType } from '../../../types';
import { PhoneBigIcon, PhoneNoneBigIcon } from '../../Shared/Icons';
import { Availability, HeadQuotient, Phone } from '../../Shared/Tooltip';
import Accepts from '../Accepts';
import CircleChart from '../CircleChart';
import * as Styled from './styles';

const Info = forwardRef(({ doctor }, ref) => {
  const { locale } = useRouter();

  const hasAcceptsOverride =
    doctor.acceptsOverride || doctor.note ? true : undefined;
  const hasAvailabilityOverride = doctor.availabilityOverride
    ? true
    : undefined;
  const updatedAt =
    doctor.updatedAt && formatDateToLocale(doctor.updatedAt, locale);

  // see Link dynamic locale: https://github.com/isaachinman/next-i18next/issues/413#issuecomment-579284859

  return (
    <Styled.InfoContainer
      ref={ref}
      as="article"
      key={doctor.name + doctor.instId}
    >
      <Styled.InfoContent>
        <Styled.Name as="h3">
          <Link
            href={{
              pathname: '/[type]/[doctorName]',
              query: { doctorName: doctor.nameSlug, type: doctor.type },
            }}
            as={`/${doctor.type}/${doctor.nameSlug}`}
          >
            {doctor.name}
          </Link>
        </Styled.Name>
        <Styled.Provider>{doctor.provider}</Styled.Provider>
        <Styled.Address>{doctor.fullAddress}</Styled.Address>
        <Styled.InfoSubContent>
          <Tooltip
            title={
              <HeadQuotient
                accepts={doctor.accepts}
                date={updatedAt}
                hasOverride={hasAcceptsOverride}
                load={doctor.load}
                note={doctor.note}
              />
            }
            leaveTouchDelay={3000}
            enterTouchDelay={50}
          >
            <Styled.AcceptsContainer tabIndex={0}>
              <Accepts accepts={doctor.accepts} />
            </Styled.AcceptsContainer>
          </Tooltip>
          <Tooltip
            title={
              <Availability
                date={updatedAt}
                hasOverride={hasAvailabilityOverride}
              />
            }
            leaveTouchDelay={3000}
            enterTouchDelay={50}
          >
            <Styled.CirclePercentContainer tabIndex={0}>
              <CircleChart size="26px" percent={doctor.availability} />
              <Styled.AvailabilityText>
                {toPercent(doctor.availability)}
              </Styled.AvailabilityText>
            </Styled.CirclePercentContainer>
          </Tooltip>
        </Styled.InfoSubContent>
      </Styled.InfoContent>
      <Styled.InfoActions>
        <Styled.IconButtonBase ariaLabel="More">E</Styled.IconButtonBase>
        <Tooltip
          title={<Phone phone={doctor.phone} />}
          leaveTouchDelay={3000}
          enterTouchDelay={50}
        >
          <Styled.IconButtonBase
            as={doctor.phone ? 'a' : 'button'}
            href={doctor.phone ? `tel:${doctor.phone}` : undefined}
            phone={doctor.phone}
            ariaLabel={doctor.phone ? 'Click to call' : 'No phone number'}
            ariaDisabled={!doctor.phone}
          >
            {doctor.phone ? <PhoneBigIcon /> : <PhoneNoneBigIcon />}
          </Styled.IconButtonBase>
        </Tooltip>
      </Styled.InfoActions>
    </Styled.InfoContainer>
  );
});

export default Info;

Info.propTypes = { doctor: DoctorPropType.isRequired };
