import PropTypes from 'prop-types';

import { useToggleContext } from '../../context/toggleContext';
import { ListContainer } from '../../layouts/HomeLayout/styles';
import { DoctorPropType } from '../../types';
import DoctorCards from '../DoctorCards';

const Doctors = function Doctors({ doctors }) {
  const [open] = useToggleContext();

  return (
    <ListContainer open={open || undefined}>
      <DoctorCards doctors={doctors} />
    </ListContainer>
  );
};

export default Doctors;

Doctors.propTypes = {
  doctors: PropTypes.arrayOf(DoctorPropType.isRequired).isRequired,
};
