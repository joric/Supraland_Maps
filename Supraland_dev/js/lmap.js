var tilePath   = 'img/SL1_tiles/{z}/{x}/{y}.png';
var tileSize   = {x: 512, y: 512};
var mapExtent  = {topLeft: {x: -74515, y: -85540}, bottomRight: {x: 85540, y: 100528}};
var mapScale   = {x: 1/21.3678, y: 1/21.3678};
var mapOrigin  = {x: 74515 * mapScale.x, y: 89504 * mapScale.y};
var mapMinZoom = 0;
var mapMaxZoom = 4;
var mapMaxResolution = 1.00000000;
var mapMinResolution = Math.pow(2, mapMaxZoom) * mapMaxResolution;

var mapLayers = {};


//Create a coordinate system for the map
var crs = L.CRS.Simple;
crs.transformation = new L.Transformation(mapScale.x, mapOrigin.x, mapScale.y, mapOrigin.y);
crs.scale = function (zoom) { return Math.pow(2, zoom) / mapMinResolution; };
crs.zoom = function (scale) { return Math.log(scale * mapMinResolution) / Math.LN2; };


//Create the map
var map = new L.Map('map', {
    maxZoom: mapMaxZoom,
    minZoom: mapMinZoom,
    zoomSnap: 0.1,
    crs: crs,
    fullscreenControl: true,
    fullscreenControlOptions: {
        position: 'topleft'
    },
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
	    icon: 'images/zoom-in.png',
	    callback: zoomIn
	}, {
	    text: 'Zoom out',
	    icon: 'images/zoom-out.png',
	    callback: zoomOut
	}]
});


//Create the map image base layer
var map_image_layer = L.tileLayer.canvas(tilePath, {
    minZoom: mapMinZoom,
    maxZoom: mapMaxZoom,
    tileSize: L.point(tileSize.x, tileSize.y),
    noWrap: true,
    tms: false,
    nativeZooms: [0, 1, 2, 3, 4]
}).addTo(map);
mapLayers.baseImage = map_image_layer;


//Adjust map for initial view
map.fitBounds([
        crs.unproject(L.point(mapExtent.bottomRight.y, mapExtent.bottomRight.x)),
        crs.unproject(L.point(mapExtent.topLeft.y, mapExtent.topLeft.x))
    ]);
	
var sidebar = L.control.sidebar('sidebar').addTo(map);
L.control.mousePosition().addTo(map);

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