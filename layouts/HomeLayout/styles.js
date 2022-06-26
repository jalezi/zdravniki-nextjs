import { darken } from "polished";
import styled from "styled-components";

/*
.container {  display: grid;
  grid-template-columns: 1fr 450px;
  grid-template-rows: 300px 1fr;
  gap: 0px 0px;
  grid-auto-flow: row;
  grid-template-areas:
    "filters filters"
    "map list";
}

.filters { grid-area: filters; }

.map { grid-area: map; }

.list { grid-area: list; }

*/

export const Main = styled.main`
  position: fixed;
  top: ${({ theme }) => theme.mobileHeaderHeight};
  left: 0;
  height: calc(100% - ${({ theme }) => theme.mobileHeaderHeight});
  width: 100%;

  @media only screen and (min-width: 768px) {
    top: calc(${({ theme }) => theme.headerHeight});
    height: 100%;
    display: grid;
    grid-template-columns: auto 450px;
    grid-template-rows: 64px 1fr;
    gap: 0px 0px;
    grid-auto-flow: row;
    grid-template-areas:
      "filters filters"
      "map list";
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

  @media only screen and (min-width: 768px) {
    position: initial;
    grid-area: map;
  }

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
  background: ${({ theme }) => theme.bgColor1};
  height: fit-content;
  padding-block: 8px;
  z-index: 20;

  @media only screen and (min-width: 768px) {
    position: initial;
    grid-area: filters;
    z-index: 1;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-between;
    background: ${({ theme }) => theme.white};
  }
`;
export const ListContainer = styled.div`
  position: absolute;
  top: 0px;
  left: 0;
  right: 0;
  bottom: 64px;
  height: ${({ open }) => (open ? "auto" : "0px")};
  /* padding-block: ${({ open }) => (open ? "8px" : "0px")}; */

  background: ${({ theme }) => theme.bgColor1};
  transition: height 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  z-index: 10;

  @media only screen and (min-width: 768px) {
    height: 100%;
    grid-area: list;
    z-index: 1;
  }
`;
