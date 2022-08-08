import { useMapEvents } from 'react-leaflet';

import { useFilteredDoctors } from '../../context/filteredDoctorsContext';
import filterBySearchValueInMapBounds from '../../lib/filterBySearchValueInMapBounds';

const MapEvents = function MapEvents() {
  const { doctors, setFilteredDoctors, searchValue } = useFilteredDoctors();

  const map = useMapEvents({
    moveend() {
      if (!doctors) return;

      const bounds = map.getBounds();
      const mapDoctors = filterBySearchValueInMapBounds({
        bounds,
        filtered: doctors,
        searchValue,
      });
      setFilteredDoctors(mapDoctors);
    },
  });
  return null;
};

export default MapEvents;
