import { memo } from 'react';

import PropTypes from 'prop-types';
import { AttributionControl, TileLayer, MapContainer } from 'react-leaflet';

import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import 'leaflet-defaulticon-compatibility';

import { MAP } from '../../constants/common';
import {
  ChildrenPropType,
  GeoLocationType,
  StylePropType,
} from '../../types/index';

const Map = function Map({
  center,
  children,
  maxBounds,
  maxZoom,
  minZoom,
  style,
  zoom,
}) {
  return (
    <MapContainer
      attributionControl={false}
      center={center}
      maxBounds={maxBounds}
      maxZoom={maxZoom}
      minZoom={minZoom}
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
};

Map.defaultProps = {
  center: MAP.GEO_LOCATION.SL_CENTER,
  children: undefined,
  maxBounds: undefined,
  maxZoom: MAP.MAX_ZOOM,
  minZoom: MAP.MIN_ZOOM,
  style: undefined,
  zoom: MAP.ZOOM,
};

Map.propTypes = {
  maxBounds: PropTypes.exact({
    _northEast: GeoLocationType,
    _southWest: GeoLocationType,
  }),
  center: GeoLocationType,
  children: ChildrenPropType,
  maxZoom: PropTypes.number,
  minZoom: PropTypes.number,
  style: StylePropType,
  zoom: PropTypes.number,
};

export default memo(Map);
