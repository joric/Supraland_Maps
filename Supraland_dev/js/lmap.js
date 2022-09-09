var tilePath   = 'imgs/maptiles_SL1/{z}/{x}/{y}.png';
var tileSize   = {x: 512, y: 512};
var mapExtent  = {topLeft: {x: -74515, y: -85540}, bottomRight: {x: 85540, y: 100528}};
var mapScale   = {x: 1/21.3678, y: 1/21.3678};
var mapOrigin  = {x: 74515 * mapScale.x, y: 89504 * mapScale.y};
var mapMinZoom = 0;
var mapMaxZoom = 4;
var mapMaxResolution = 1.00000000;
var mapMinResolution = Math.pow(2, mapMaxZoom) * mapMaxResolution;


//Create a coordinate system for the map
var crs = L.CRS.Simple;
crs.transformation = new L.Transformation(mapScale.x, mapOrigin.x, mapScale.y, mapOrigin.y);
crs.scale = function (zoom) { return Math.pow(2, zoom) / mapMinResolution; };
crs.zoom = function (scale) { return Math.log(scale * mapMinResolution) / Math.LN2; };


//Create the map
var map = new L.Map('map', {
    maxZoom: mapMaxZoom,
    minZoom: mapMinZoom,
    crs: crs
});


//Create the map image base layer
var layer = L.tileLayer(tilePath, {
    minZoom: mapMinZoom,
    maxZoom: mapMaxZoom,
    tileSize: L.point(tileSize.x, tileSize.y),
    noWrap: true,
    tms: false
}).addTo(map);


//Adjust map for initial view
map.fitBounds([
        crs.unproject(L.point(mapExtent.bottomRight.y, mapExtent.bottomRight.x)),
        crs.unproject(L.point(mapExtent.topLeft.y, mapExtent.topLeft.x))
    ]);
	
L.control.mousePosition().addTo(map)
L.marker([0, 0]).addTo(map);