import PropTypes from "prop-types";
import { AttributionControl, TileLayer, MapContainer } from "react-leaflet";

import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";

import { MAP } from "../../constants/common";
import {
  ChildrenPropType,
  GeoLocationType,
  StylePropType,
} from "../../types/index";

export function Map({ children, center, zoom, style }) {
  return (
    <MapContainer
      attributionControl={false}
      center={center}
      style={style}
      zoom={zoom}
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
  center: MAP.GEO_LOCATION.SL_CENTER,
  children: undefined,
  style: undefined,
  zoom: MAP.ZOOM,
};

Map.propTypes = {
  children: ChildrenPropType,
  center: GeoLocationType,
  style: StylePropType,
  zoom: PropTypes.number,
};
