import PropTypes from "prop-types";

import { ListContainer } from "../../layouts/HomeLayout/styles";
import { DoctorPropType } from "../../types";
import List from "../List";

const Doctors = function Doctors({ doctorGroups }) {
  return (
    <ListContainer open>
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
