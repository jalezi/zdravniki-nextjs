import { CircleMarker as ReactLeafletCM, Popup } from "react-leaflet";

import { theme } from "../../constants/theme";
import { DoctorPropType } from "../../types";

export const CircleMarker = ReactLeafletCM;

export const DoctorMarker = function DoctorMarker({ doctor }) {
  const fillColor =
    doctor.accepts.toLowerCase() === "y" ? theme.success : theme.error;

  return (
    <CircleMarker
      center={[doctor.lat, doctor.lon]}
      fillColor={fillColor}
      fillOpacity={0.7}
      radius={12}
      stroke={false}
    >
      <Popup>{doctor.doctor}</Popup>
    </CircleMarker>
  );
};

DoctorMarker.propTypes = {
  doctor: DoctorPropType.isRequired
}