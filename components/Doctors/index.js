import PropTypes from "prop-types";

import { useToggleOpenContext } from "../../context/toggleOpenContext";
import { ListContainer } from "../../layouts/HomeLayout/styles";
import { DoctorPropType } from "../../types";
import List from "../List";

const Doctors = function Doctors({ doctorGroups }) {
  const { open } = useToggleOpenContext();

  return (
    <ListContainer open={open || undefined}>
      <List doctorGroups={doctorGroups} />
    </ListContainer>
  );
};

export default Doctors;

Doctors.propTypes = {
  doctorGroups: PropTypes.shape({
    A: PropTypes.arrayOf(DoctorPropType.isRequired),
  }).isRequired,
};
