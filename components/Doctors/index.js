import { useFilteredDoctors } from '../../context/filteredDoctorsContext';
import { useToggleContext } from '../../context/toggleContext';
import { ListContainer } from '../../layouts/HomeLayout/styles';
import DoctorCards from '../DoctorCards';

const Doctors = function Doctors() {
  const [open] = useToggleContext();

  const { filteredDoctors, error } = useFilteredDoctors();

  if (error) {
    return <div>Error!</div>;
  }

  return (
    <ListContainer open={open || undefined}>
      <DoctorCards doctors={filteredDoctors} />
    </ListContainer>
  );
};

export default Doctors;
