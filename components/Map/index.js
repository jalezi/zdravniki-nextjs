/* eslint-disable no-underscore-dangle */
import PropTypes from "prop-types";
import { createRef } from "react";
import { Popup } from "react-leaflet";

import { MAP } from "../../constants/common";
import { DoctorPropType } from "../../types/index";

import { Map } from "./Map";
import MarkerClusterGroup, {
  createClusterCustomIcon,
} from "./MarkerClusterGroup";
import { DoctorMarker } from "./Markers";

const withMap = function withMap(Component) {
  const DoctorsMap = function DoctorsMap({ center, zoom, doctors }) {
    const markers = doctors?.map((doctor) => {
      const key = doctor.doctor + doctor.inst_id + Math.random() * Date.now();
      const ref = createRef();
      const accepts = doctor.accepts_override || doctor.accepts;
      return (
        <DoctorMarker
          key={key}
          ref={ref}
          accepts={accepts}
          center={[parseFloat(doctor.lat), parseFloat(doctor.lon)]}
          Popup={<Popup>{doctor.doctor}</Popup>}
        />
      );
    });

    return (
      <Component center={center} zoom={zoom}>
        <MarkerClusterGroup
          iconCreateFunction={createClusterCustomIcon}
          maxClusterRadius={40}
        >
          {markers}
        </MarkerClusterGroup>
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
