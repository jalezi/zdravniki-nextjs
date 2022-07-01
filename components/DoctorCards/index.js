import { useTranslation } from 'next-i18next';
import PropTypes from 'prop-types';

import { DoctorPropType } from '../../types';
import Info from '../DoctorCard/Info';
import * as Styled from './styles';

const DoctorCards = function DoctorCards({ doctors }) {
  const { t: tMap } = useTranslation('map');

  const drJsx = dr => <Info doctor={dr} />;

  const groupedByLetter = doctors.reduce((acc, doctor) => {
    const firstLetter = doctor.name.charAt(0).toUpperCase();

    if (!acc[firstLetter]) {
      acc[firstLetter] = [];
    }

    acc[firstLetter].push(doctor);

    return acc;
  }, {});

  const count = doctors.length;

  return (
    <>
      <Styled.Header>
        <span>{tMap('totalResults', { count })}</span>
      </Styled.Header>
      <Styled.DoctorsContainer>
        {Object.entries(groupedByLetter).map(([letter, drGroup]) => (
          <section key={letter}>
            <Styled.HeadingBase as="h2">{letter}</Styled.HeadingBase>
            {drGroup.map(drJsx)}
          </section>
        ))}
      </Styled.DoctorsContainer>
    </>
  );
};

DoctorCards.propTypes = {
  doctors: PropTypes.arrayOf(DoctorPropType.isRequired).isRequired,
};

export default DoctorCards;
