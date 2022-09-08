      var mapExtent = [0.00000000, -8192.00000000, 8192.00000000, 0.00000000];
      var mapMinZoom = 0;
      var mapMaxZoom = 4;
      var mapMaxResolution = 1.00000000;
      var mapMinResolution = Math.pow(2, mapMaxZoom) * mapMaxResolution;
      var tileExtent = [0.00000000, -8192.00000000, 8192.00000000, 0.00000000];
      var crs = L.CRS.Simple;
      crs.transformation = new L.Transformation(1, -tileExtent[0], -1, tileExtent[3]);
      crs.scale = function(zoom) {
        return Math.pow(2, zoom) / mapMinResolution;
      };
      crs.zoom = function(scale) {
        return Math.log(scale * mapMinResolution) / Math.LN2;
      };
      var layer;
      var map = new L.Map('map', {
          maxZoom: mapMaxZoom,
          minZoom: mapMinZoom,
          crs: crs
        });
        
        layer = L.tileLayer('{z}/{x}/{y}.png', {
          minZoom: mapMinZoom, maxZoom: mapMaxZoom,
          tileSize: L.point(512, 512),
          noWrap: true,
          tms: false
        }).addTo(map);
      map.fitBounds([
        crs.unproject(L.point(mapExtent[2], mapExtent[3])),
        crs.unproject(L.point(mapExtent[0], mapExtent[1]))
      ]);
      L.control.mousePosition().addTo(map)