//-------------------------------------//
//Config
//-------------------------------------//
//namespace
var cosgis = {};

//map
cosgis.map = null;
cosgis.mapCenter = [47.675, -117.41];

//-------------------------------------//
//Map Init
//-------------------------------------//

//Map setup
cosgis.map = L.map('map', { zoomControl: false }).setView(cosgis.mapCenter, 12);
cosgis.basemap = L.esri.basemapLayer('Topographic', { detectRetina: true }).addTo(cosgis.map);

//Controls
L.control.zoom({ position: 'bottomright' }).addTo(cosgis.map);
L.control.scale().addTo(cosgis.map);