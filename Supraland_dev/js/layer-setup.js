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

console.log(mapLayers);

var loadedCsv = Papa.parse("data/sl1_markers.csv", { download: true, header: true, complete: function(r, f) {
    console.log(r);
}});