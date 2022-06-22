import styled from "styled-components";

export const Main = styled.main`
  position: fixed;
  top: ${({ theme }) => theme.mobileHeaderHeight};
  left: 0;
  height: calc(100% - ${({ theme }) => theme.mobileHeaderHeight});
  width: 100%;

  @media only screen and (min-width: 768px) {
    top: ${({ theme }) => theme.headerHeight};
    height: calc(100% - ${({ theme }) => theme.headerHeight});
  }
`;

export const MapContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  background: red;
  height: calc(100% - 64px);
  z-index: 9;

  .leaflet-container {
    height: 100%;
    width: 100%;
  }

  .leaflet-tile-pane {
    filter: hue-rotate(40deg) saturate(0.4) contrast(0.6) brightness(1.2);
  }
`;
export const ListContainer = styled.div`
  position: absolute;
  top: calc(100% - 64px);
  left: 0;
  right: 0;
  background: yellow;
  height: 100%;
  overflow-y: auto;
  z-index: 10;
`;
