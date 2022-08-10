import { createRef, memo } from 'react';

import L from 'leaflet';
import { Popup } from 'react-leaflet';

import { MAP } from '../../constants/common';
import { useFilteredDoctors } from '../../context/filteredDoctorsContext';
import LocateControl from './LocateControl';
import Map from './Map';
import MapEvents from './MapEvents';
import MapTotalResults from './MapTotalResults';
import MarkerClusterGroup, {
  createClusterCustomIcon,
} from './MarkerClusterGroup';
import { DoctorMarker } from './Markers';

const withMap = function withMap(Component) {
  const DoctorsMap = function DoctorsMap() {
    const { filteredDoctors, error } = useFilteredDoctors();
    const { setMap } = useFilteredDoctors();

    if (error) {
      if (error.status === 429) {
        return <div>Too many requests. Wait a second.....</div>;
      }
      return <div>Somethin went wrong!</div>;
    }

    const markers = filteredDoctors?.map(doctor => {
      const key = doctor.name + doctor.instId + Math.random() * Date.now();
      const ref = createRef();
      const accepts = doctor.accepts_override || doctor.accepts;
      const { geoLocation, name } = doctor;
      return (
        <DoctorMarker
          key={key}
          ref={ref}
          accepts={accepts}
          center={geoLocation}
          Popup={<Popup>{name}</Popup>}
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
        setMap={setMap}
      >
        <MarkerClusterGroup
          iconCreateFunction={createClusterCustomIcon}
          maxClusterRadius={40}
        >
          {markers}
        </MarkerClusterGroup>
        <MapTotalResults number={filteredDoctors.length} />

        {!isSafari() && (
          <LocateControl flyTo initialZoomLevel={13} returnToPrevBounds />
        )}
        <MapEvents />
      </Component>
    );
  };

  return DoctorsMap;
};

export default memo(withMap(Map));
