import PropTypes from "prop-types";
import { AttributionControl, TileLayer, MapContainer } from "react-leaflet";

import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";

import { MAP } from "../../constants/common";
import { ChildrenPropType, StylePropType } from "../../types/index";

export default function Map({ children, center, zoom, style }) {
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
  center: PropTypes.oneOf([
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