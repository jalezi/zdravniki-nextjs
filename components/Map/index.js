import PropTypes from "prop-types";

import { MAP } from "../../constants/common";
import { DoctorPropType } from "../../types/index";

import { Map } from "./Map";
import { DoctorMarker } from "./Markers";

const withMap = function withMap(Component) {
  const DoctorsMap = function DoctorsMap({ center, zoom, doctors }) {
    const markers = doctors?.map((doctor) => {
      const key = doctor.doctor + doctor.inst_id + Math.random() * Date.now();
      return <DoctorMarker key={key} doctor={doctor} />;
    });

    return (
      <Component center={center} zoom={zoom}>
        {markers}
      </Component>
    );
  };

  DoctorsMap.defaultProps = {
    center: MAP.GEO_LOCATION.SL_CENTER,
    zoom: MAP.ZOOM,
  };

  DoctorsMap.propTypes = {
    center: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.number),
      PropTypes.shape({
        lat: PropTypes.number,
        lng: PropTypes.number,
        alt: PropTypes.number,
      }),
    ]),
    doctors: PropTypes.arrayOf(DoctorPropType.isRequired).isRequired,
    zoom: PropTypes.number,
  };

  return DoctorsMap;
};

export default withMap(Map);
