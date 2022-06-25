import { darken } from "polished";
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
  /* by @bananica */
  .marker-cluster-small div,
  .marker-cluster-medium div,
  .marker-cluster-large div {
    background-color: inherit;
    span {
      background-color: inherit;
      display: block;
      border-radius: 100%;
      text-shadow: 0 0 3px #ffffff90;
    }
  }

  .marker-cluster-accepts-0 {
    background-color: #d32f2f54;
    span {
      color: ${() => darken(0.6, "#d32f2f")};
    }
  }

  .marker-cluster-accepts-25 {
    background-color: #ef741f54;
    span {
      color: ${() => darken(0.6, "#ef741f")};
    }
  }

  .marker-cluster-accepts-50 {
    background-color: #ffa80054;
    span: {
      color: ${() => darken(0.6, "#ffa800")};
    }
  }

  .marker-cluster-accepts-75 {
    background-color: #aeb11854;
    span {
      color: ${() => darken(0.6, "#aeb118")};
    }
  }

  .marker-cluster-accepts-100 {
    background-color: #2e7d3257;
    span {
      color: ${() => darken(0.6, "#2e7d32")};
    }
  }
`;

export const FiltersContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: ${({ theme }) => theme.FILTER.backgroundColor1};
  height: fit-content;
  padding-block: 8px;
  z-index: 20;
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
