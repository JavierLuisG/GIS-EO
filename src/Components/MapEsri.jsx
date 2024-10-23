// Uncomment to work with local assets
// import { setArcgisAssetPath as setMapAssetPath} from '@arcgis/map-components/dist/components';
// setMapAssetPath(`${location.origin}${location.pathname}assets`);

import "@arcgis/map-components/dist/components/arcgis-map";
import "@arcgis/map-components/dist/components/arcgis-search";
import "@arcgis/map-components/dist/components/arcgis-legend";
import {
  ArcgisMap,
  ArcgisSearch,
  ArcgisLegend,
} from "@arcgis/map-components-react";

const MapEsri = () => {
  return (
    <ArcgisMap
      itemId="d5dda743788a4b0688fe48f43ae7beb9"
        onArcgisViewReadyChange={(event) => {
          console.log("MapView ready", event);
        }}
    >
      <ArcgisSearch position="top-right"></ArcgisSearch>
      <ArcgisLegend position="bottom-left"></ArcgisLegend>
    </ArcgisMap>
  );
};

export default MapEsri;
