
//let currentMapName = 'SL1';
let currentMapName = 'DLC2';

var tileMinSet = 0;
var tileMaxSet = 4;
var tileSize   = {x: 512, y: 512};
var mapMinZoom = 0;
var mapMaxZoom = 6;
var mapMaxResolution = 1.00000000;
var mapMinResolution = Math.pow(2, tileMaxSet) * mapMaxResolution;

if (currentMapName == 'SL1') {
  //let mapSize = {width: 8192, height: 8192}
  //let pxTrans = {dx: -74515, dy: -85540, m: 21.3678}
  var tilePath   = 'img/SL1_tiles/{z}/{x}/{y}.png';
  var mapExtent  = {topLeft: {x: -74515, y: -85540}, bottomRight: {x: 85540, y: 100528}};
  var mapScale   = {x: 1/21.3678, y: 1/21.3678};
  var mapOrigin  = {x: 74515 * mapScale.x, y: 89504 * mapScale.y};
}

if (currentMapName=='DLC2') {
  //let mapSize = {width: 8192, height: 5500}
  //let pxTrans = { dx: -73730, dy: -29880, m: 18 }
  var tilePath   = 'img/DLC2_tiles/{z}/{x}/{y}.png';
  var mapExtent  = {topLeft: {x: -74515, y: -85540}, bottomRight: {x: 85540, y: 100528}};
  var mapScale   = {x: 1/18.0, y: 1/18.0};
  var mapOrigin  = {x: 73730 * mapScale.x, y: 93354 * mapScale.y};
}



var mapLayers = {};


// Create a coordinate system for the map
var crs = L.CRS.Simple;
crs.transformation = new L.Transformation(mapScale.x, mapOrigin.x, mapScale.y, mapOrigin.y);
crs.scale = function (zoom) { return Math.pow(2, zoom) / mapMinResolution; };
crs.zoom = function (scale) { return Math.log(scale * mapMinResolution) / Math.LN2; };


//Create the map
var map = new L.Map('map', {
    maxZoom: mapMaxZoom,
    minZoom: mapMinZoom,
    zoomSnap: 0.1,
    zoomDelta: 0.5,
    crs: crs,
    fullscreenControl: true,
    fullscreenControlOptions: {
        position: 'topleft'
    },
    fadeAnimation: false,
    contextmenu: true,
    contextmenuWidth: 140,
  contextmenuItems: [{
      text: 'Show coordinates',
      callback: showCoordinates
  }, {
      text: 'Center map here',
      callback: centerMap
  }, '-', {
      text: 'Zoom in',
      icon: 'img/zoom-in.png',
      callback: zoomIn
  }, {
      text: 'Zoom out',
      icon: 'img/zoom-out.png',
      callback: zoomOut
  }]
});


//Create the map image base layer
var map_image_layer = L.tileLayer.canvas(tilePath, {
    //minZoom: mapMinZoom,
    //maxZoom: mapMaxZoom,
    tileSize: L.point(tileSize.x, tileSize.y),
    noWrap: true,
    tms: false,
    updateInterval: -1,
    keepBuffer: 16,
    maxNativeZoom: 4,
    nativeZooms: [0, 1, 2, 3, 4],
    edgeBufferTiles: 2,
    attribution: '<a href="https://github.com/joric/supraland" target="_blank">Joric</a>',
}).addTo(map);

mapLayers.baseImage = map_image_layer;


// Adjust map for initial view
map.fitBounds([
        crs.unproject(L.point(mapExtent.bottomRight.y, mapExtent.bottomRight.x)),
        crs.unproject(L.point(mapExtent.topLeft.y, mapExtent.topLeft.x))
    ]);
  


// tried to get rid of 0/-1/0.png net::ERR_FILE_NOT_FOUND
//let mapSW = [1, 16384];
//let mapNE = [16384, 1];
//map.setMaxBounds(new L.LatLngBounds(map.unproject(mapSW, map.getMaxZoom()),map.unproject(mapNE, map.getMaxZoom())));


var sidebar = L.control.sidebar('sidebar').addTo(map);
L.control.mousePosition().addTo(map);


// Context menu functions
function showCoordinates (e) {
  let ll = e.latlng;
  alert("X = " + ll.lat + "\nY = " + ll.lng);
}

function centerMap (e) {
  map.panTo(e.latlng);
}

function zoomIn (e) {
  map.zoomIn();
}

function zoomOut (e) {
  map.zoomOut();
}