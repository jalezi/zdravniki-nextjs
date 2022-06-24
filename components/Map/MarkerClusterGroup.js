// see: https://github.com/yuzhva/react-leaflet-markercluster/blob/master/src/react-leaflet-markercluster.js
import "leaflet.markercluster";
import { createPathComponent } from "@react-leaflet/core";
import L from "leaflet";

import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";

export const createClusterCustomIcon = (cluster) => {
  let acceptsCnt = 0;

  Object.values(cluster.getAllChildMarkers()).forEach((marker) => {
    acceptsCnt += marker.options.accepts === "y" ? 1 : 0;
  });

  let acceptsPercentage =
    Math.round(((acceptsCnt / cluster.getChildCount()) * 10) / 2.5) * 25;
  if (acceptsPercentage === 100 && acceptsCnt !== cluster.getChildCount()) {
    acceptsPercentage = 75;
  } else if (acceptsPercentage === 0 && acceptsCnt > 0) {
    acceptsPercentage = 25;
  }

  return L.divIcon({
    html: `<div><span>${cluster.getChildCount()}</span></div>`,
    className: `marker-cluster marker-cluster-small marker-cluster-accepts-${acceptsPercentage}`,
    // eslint-disable-next-line no-undef
    iconSize: L.point(40, 40, true),
  });
};

/* 
  There is a next version of react-leaflet-markercluster that supports React 17 and 18
  but not sure if it will be released yet.
  https://www.npmjs.com/package/@changey/react-leaflet-markercluster
*/
// TODO find what is producing warning "listener not found" in console
const MarkerClusterGroup = createPathComponent(
  ({ children: _c, ...props }, ctx) => {
    const clusterProps = {};
    const clusterEvents = {};

    // Splitting props and events to different objects
    Object.entries(props).forEach(([propName, prop]) => {
      if (propName.startsWith("on")) {
        clusterEvents[propName] = prop;
      } else {
        clusterProps[propName] = prop;
      }
    });

    // Creating markerClusterGroup Leaflet element
    const markerClusterGroup = L.markerClusterGroup(clusterProps);

    // Initializing event listeners
    Object.entries(clusterEvents).forEach(([eventAsProp, callback]) => {
      const clusterEvent = `cluster${eventAsProp.substring(2).toLowerCase()}`;
      markerClusterGroup.on(clusterEvent, callback);
    });

    return {
      instance: markerClusterGroup,
      context: { ...ctx, layerContainer: markerClusterGroup },
    };
  }
);

export default MarkerClusterGroup;
