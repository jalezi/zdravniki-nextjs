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
  const DoctorsMap = function DoctorsMap({ doctors }) {
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
      <Component
        center={MAP.GEO_LOCATION.SL_CENTER}
        maxZoom={MAP.MAX_ZOOM}
        minZoom={MAP.MIN_ZOOM}
        zoom={MAP.ZOOM}
      >
        <MarkerClusterGroup
          iconCreateFunction={createClusterCustomIcon}
          maxClusterRadius={40}
        >
          {markers}
        </MarkerClusterGroup>
      </Component>
    );
  };

  DoctorsMap.propTypes = {
    doctors: PropTypes.arrayOf(DoctorPropType.isRequired).isRequired,
  };

  return DoctorsMap;
};

export default withMap(Map);
