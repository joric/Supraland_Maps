var mapExtent = [0.00000000, -8192.00000000, 8192.00000000, 0.00000000];
var mapMinZoom = 0;
var mapMaxZoom = 4;
var mapMaxResolution = 1.00000000;
var tileExtent = [0.00000000, -8192.00000000, 8192.00000000, 0.00000000];
var tileWidth = 512;
var tileHeight = 512;

var mapResolutions = [];
for (var z = 0; z <= mapMaxZoom; z++) {
  mapResolutions.push(Math.pow(2, mapMaxZoom - z) * mapMaxResolution);
}

var mapTileGrid = new ol.tilegrid.TileGrid({
  tileSize: [tileWidth, tileHeight],
  extent: tileExtent,
  minZoom: mapMinZoom,
  resolutions: mapResolutions
});

var layer = new ol.layer.Tile({
  source: new ol.source.XYZ({
    projection: 'PIXELS',
    tileGrid: mapTileGrid,
    tilePixelRatio: 1.00000000,
    url: "{z}/{x}/{y}.png",
  })
});

var map = new ol.Map({
  target: 'map',
  layers: [
    layer,
  ],
  view: new ol.View({
    projection: ol.proj.get('PIXELS'),
    extent: mapExtent,
    maxResolution: mapTileGrid.getResolution(mapMinZoom)
  })
});
map.getView().fit(mapExtent, map.getSize());