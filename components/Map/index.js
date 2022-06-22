import PropTypes from "prop-types";
import { AttributionControl, TileLayer, MapContainer } from "react-leaflet";

import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";

import { MAP } from "../../constants/common";
import {
  ChildrenPropType,
  DoctorPropType,
  StylePropType,
} from "../../types/index";

import { DoctorMarker } from "./Markers";

export function Map({ children, center, zoom, style }) {
  return (
    <MapContainer
      center={center}
      zoom={zoom}
      attributionControl={false}
      style={style}
    >
      <AttributionControl prefix="" />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {children}
    </MapContainer>
  );
}

Map.defaultProps = {
  children: undefined,
  center: MAP.GEO_LOCATION.SL_CENTER,
  style: undefined,
  zoom: MAP.ZOOM,
};

Map.propTypes = {
  children: ChildrenPropType,
  center: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.number),
    PropTypes.shape({
      lat: PropTypes.number,
      lng: PropTypes.number,
      alt: PropTypes.number,
    }),
  ]),
  style: StylePropType,
  zoom: PropTypes.number,
};

const withMap = function withMap(Component) {
  const DoctorsMap = function DoctorsMap({ center, zoom, doctors }) {
    const markers = doctors?.map((doctor) => {
      const key = doctor.doctor + doctor.inst_id + Math.random() * Date.now();
      return (
        <DoctorMarker
          key={key}
          center={[doctor.lat, doctor.lon]}
          doctor={doctor}
        />
      );
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
