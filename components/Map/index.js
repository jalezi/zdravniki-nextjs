import { createRef } from 'react';

import L from 'leaflet';
import PropTypes from 'prop-types';
import { Popup } from 'react-leaflet';

import { MAP } from '../../constants/common';
import { DoctorPropType } from '../../types/index';
import LocateControl from './LocateControl';
import { Map } from './Map';
import MapTotalResults from './MapTotalResults';
import MarkerClusterGroup, {
  createClusterCustomIcon,
} from './MarkerClusterGroup';
import { DoctorMarker } from './Markers';

const withMap = function withMap(Component) {
  const DoctorsMap = function DoctorsMap({ doctors }) {
    const markers = doctors?.map(doctor => {
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

    const corner1 = L.latLng(...Object.values(MAP.BOUNDS.southWest));
    const corner2 = L.latLng(...Object.values(MAP.BOUNDS.northEast));
    const bounds = L.latLngBounds(corner1, corner2);

    /*
      Safari does not not work with Leaflet 1.7.1
      https://github.com/domoritz/leaflet-locatecontrol#safari-does-not-work-with-leaflet-171
    */
    const isSafari = () => {
      const ua = navigator.userAgent.toLowerCase();
      return (
        ua.indexOf('safari') !== -1 &&
        ua.indexOf('chrome') === -1 &&
        ua.indexOf('android') === -1
      );
    };

    return (
      <Component
        center={MAP.GEO_LOCATION.SL_CENTER}
        maxBounds={bounds}
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
        <MapTotalResults number={doctors.length} />

        {!isSafari && (
          <LocateControl flyTo initialZoomLevel={13} returnToPrevBounds />
        )}
      </Component>
    );
  };

  DoctorsMap.propTypes = {
    doctors: PropTypes.arrayOf(DoctorPropType.isRequired).isRequired,
  };

  return DoctorsMap;
};

export default withMap(Map);
