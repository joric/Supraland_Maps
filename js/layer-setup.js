var mapLayers = {};

var layerControl = L.Control.styledLayerControl(null, null, { container_width : "100%", container_maxHeight : "100%", group_maxHeight : "100%", exclusive : false});
map.addControl(layerControl);
layerControl ._container.remove();
document.getElementById('layers').appendChild(layerControl .onAdd(map));

layerControl.addBaseLayer( map_image_layer, "Supraland", {groupName : "Change Base Layer", expanded: false} );

var layerDefs = Papa.parse("data/sl1_layers.csv", { download: true, header:true, complete: function(r, f) {
    console.log(r);
    for(x=0;x<r.data.length;x++){
        if(r.data[x].name==undefined) { continue };
        let tLayer = L.layerGroup();
        mapLayers[r.data[x].name] = tLayer;
        layerControl.addOverlay(tLayer, r.data[x].name, {groupName:r.data[x].group, expanded:true} );
        if( r.data[x].onByDefault=="TRUE" ) {layerControl.selectLayer(tLayer)};
    };
}});

console.log('mapLayers', mapLayers);
/*
class Icons {
    static _icons = {};

    static get(id) {
        if (Icons._icons[id] === undefined) alert('Unknown icon: ' + id);
        return Icons._icons[id];
    }

    static async init() {
        return Icons._loadIcons();
    }

    static async _loadIcons() {
        return $.get('data/icons.csv', function(csv) {
            let icons = $.csv.toObjects(csv);
            icons.forEach(function(icon) {
                let id = icon.id;
                let width = parseInt(icon.width, 10), height = parseInt(icon.height, 10);
                let x = parseInt(icon.x, 10), y = parseInt(icon.y, 10);
                if (isNaN(x)) x = width / 2;
                if (isNaN(y)) y = height / 2;
                Icons._icons[id] = L.icon({
                    iconUrl: 'img/icons/' + id + '.png',
                    iconSize: [width, height],
                    iconAnchor: [x, y]
                });
            });
        });
    }
}

static _createMarker(data, icon, layer, title, popup, imageFolder, spoilerFree) {
    let lat = -parseInt(data.location_y, 10), lng = parseInt(data.location_x, 10);
    return new MapMarker([lat, lng], {icon: Icons.get(icon), title: title, spoilerFree: spoilerFree})
        .addTo(Layers.get(layer))
        .setPopupText(popup)
}
*/
//var loadedCsv = Papa.parse("data/sl1_markers.csv", { download: true, header: true, complete: function(r, f) {

          function toRad(x) {
              return x / 180 * Math.PI;
          }

/*
          var transform = new THREE.Euler(
            toRad(w),
            toRad(p),
            toRad(r),
          'ZYX');

          var v = new THREE.Vector3(x, y, z);
          v.applyEuler(transform);

          x = v.x, y = v.y, z = v.z;
*/


let total_chests = 0;

for (area of [
  'DLC2_SecretLavaArea',
  'DLC2_Complete',
  /*
  'DLC2_Area0',
  'DLC2_Area0_Below',
  'DLC2_Area_End',
  'DLC2_Extras',
  'DLC2_FinalBoss',
  'DLC2_GlobalEntities',
  'DLC2_GlobalEntities_Area0',
  'DLC2_MapAddatives',
  'DLC2_Menu',
  'DLC2_Menu_Splash',
  'DLC2_PostRainbow',
  'DLC2_RainbowTown',
  'DLC2_Skybox_Intro',
  'DLC2_Skybox_Main',
  'DLC2_Splash',
*/
  ]) {

  var filename = 'data/' + area + '.csv';

  var loadedCsv = Papa.parse(filename, { download: true, header: true, complete: function(results, filename) {
      //console.log(r);

      var area = filename.split('/').pop().split('.')[0];

      chestIcon = L.icon({
        iconUrl: 'img/DLC2_icons/chest.png',
        iconSize: [32,32],
        iconAnchor: [16,16],
      });

      let chests = 0;

      for (o of results.data) {
        if (o.object_name=='') {
          continue;
        }

        if (o.object_class.endsWith('Chest_C')) {

          chests += 1;
          total_chests += 1;

          let x = parseFloat(o.location_x);
          let y = parseFloat(o.location_y);
          let z = parseFloat(o.location_z);

          let p = parseFloat(o.rotation_pitch);
          let w = parseFloat(o.rotation_yaw);
          let r = parseFloat(o.rotation_roll);

          let info = area + '<br>' + JSON.stringify(o, null, 2).replaceAll('\n','<br>').replaceAll(' ','&nbsp;');
          let title = o.spawns + ' +'+ o.spawncount;

          if (area=='DLC2_SecretLavaArea') {

            // ? nothing seems to work

            //var transform = new THREE.Euler(Math.Pi/2,0,0, 'XYZ');
            //var transform = new THREE.Euler( toRad(r), toRad(p), toRad(w), 'XYZ' );

            var transform = new THREE.Euler(0,0,0, 'XYZ');

            var v = new THREE.Vector3(x, y, z);

            v.applyEuler(transform);

            x = v.x;
            y = v.y;
            z = v.z;

          }

          let lat = y;
          let lng = x;

          L.marker([lat, lng], {icon: chestIcon, title: title}).addTo(map).bindPopup(info);
        }
      }
      console.log(area, 'chests', chests, 'total chests', total_chests);
    }
  });
}


