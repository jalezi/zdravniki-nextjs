import L from 'leaflet';

export function normalize(value) {
  // Replace all non ASCII chars and replace them with closest equivalent (č => c)
  return value
    .trim()
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036F]/g, '');
}
export default function filterBySearchValueInMapBounds({
  searchValue = '',
  filtered = [],
  bounds,
}) {
  const sortedQuery = normalize(searchValue)
    .split(' ')
    .sort((a, b) => b.length - a.length);

  return filtered?.filter(doctor => {
    const { lat, lon } = doctor.geoLocation;
    const corner = L.latLng(lat, lon);
    const calculatedBounds = L.latLngBounds(corner, corner);

    if (!searchValue) {
      return bounds.intersects(calculatedBounds);
    }

    let normalizedName = normalize(doctor.name);

    const isNameSearchValue = sortedQuery.every(q => {
      const includesQuery = normalizedName.includes(q);
      if (includesQuery) {
        normalizedName = normalizedName.replace(q, '');
      }
      return includesQuery;
    });

    const isAddressOrProviderSearchValue = [
      normalize(doctor.searchAddress),
      normalize(doctor.provider),
    ].some(v => v.includes(normalize(searchValue)));

    return (
      bounds.intersects(calculatedBounds) &&
      (isNameSearchValue || isAddressOrProviderSearchValue)
    );
  });
}
