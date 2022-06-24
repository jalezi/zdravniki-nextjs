import { useTranslation } from "next-i18next";
import PropTypes from "prop-types";
import styled from "styled-components";

const LeafletControlContainer = styled.div.attrs(() => ({
  className: "leaflet-control-container",
}))`
  pointer-events: none;
  @media screen and (min-width: 768px) {
    display: none;
  }
`;

const MapTotalResults = function MapTotalResults({ number }) {
  const { t } = useTranslation("map");

  return (
    <LeafletControlContainer>
      <div className="leaflet-top leaflet-right">
        <div className="leaflet-control-attribution">
          <span>{t("totalResults", { count: number })}</span>
        </div>
      </div>
    </LeafletControlContainer>
  );
};

export default MapTotalResults;

MapTotalResults.propTypes = PropTypes.number.isRequired;
