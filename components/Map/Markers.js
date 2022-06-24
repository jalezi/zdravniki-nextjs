import PropTypes from "prop-types";
import { forwardRef } from "react";
import { CircleMarker as ReactLeafletCM } from "react-leaflet";

import { theme } from "../../constants/theme";
import { AcceptsPropType, GeoLocationType } from "../../types";

export const CircleMarker = ReactLeafletCM;

/* 
  DoctorMarker has to be created with forwardRef
  to be able to get "accepts" prop in MarkerClusterGroup 
*/
export const DoctorMarker = forwardRef(({ accepts, center, Popup }, ref) => {
  const isDrAccepting = accepts === "y";
  const fillColor = isDrAccepting ? theme.success : theme.error;

  return (
    <CircleMarker
      ref={ref}
      center={center}
      fillColor={fillColor}
      fillOpacity={0.7}
      radius={12}
      stroke={false}
      accepts={accepts}
    >
      {Popup}
    </CircleMarker>
  );
});

DoctorMarker.defaultProps = { Popup: undefined };

DoctorMarker.propTypes = {
  accepts: AcceptsPropType.isRequired,
  center: GeoLocationType.isRequired,
  Popup: PropTypes.element,
};
