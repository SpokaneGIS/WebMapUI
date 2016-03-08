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

//Disbale map interaction in left panel
$('.container').on('mouseover', function () {
    cosgis.map.dragging.disable();
});
$('.container').on('mouseout', function () {
    cosgis.map.dragging.enable();
});

//Disable map click propagtion in content panels
disableMapClick();

//-------------------------------------//
//Methods
//-------------------------------------//

//UI
function fade(id) {
    $(id).fadeToggle("fast", "linear");
}

function togglePanel(panelID, slideDirection) {
    $(panelID).toggle('slide', { direction: slideDirection }, 300);
}

function hidePanel(panelID, slideDirection) {
    $(panelID).hide('slide', { direction: slideDirection }, 300);
}

function showPanel(panelID, slideDirection) {
    $(panelID).show('slide', { direction: slideDirection }, 300);
}

function toggleMenu() {
    fade('#map-disabled');
    togglePanel('#menu', 'left');
}

function openSubMenu(panelID) {
    //Hide all open 
    $('.submenu').each(function () {
        if ($(this).is(":visible"))
            $(this).hide();
    });
    showPanel(panelID, 'right');
    hidePanel('#menu', 'left');
    if ($('#map-disabled').is(":visible"))
        fade('#map-disabled');
}

function closeSubMenu(panelID) {
    hidePanel(panelID, 'right');
}

function toggleSubMenu() {
    togglePanel('.submenu', 'right');
}

function openAccountPanel(panelID) {
    $('.submenu').each(function () {
        if ($(this).is(":visible"))
            $(this).hide();
    });
    fade(panelID);
    hidePanel('#menu', 'left');
    if (!$('#map-disabled').is(":visible"))
        fade('#map-disabled');
}

function closeAccountPanel(panelID) {
    fade(panelID);
    if ($('#map-disabled').is(":visible"))
        fade('#map-disabled');
}

//
function disableMapClick() {
    var divs = ['divMenuBar', 'divLeft', 'divRight', 'mapDisabled'];
    for (var i = 0; i < divs.length; i++) {
        var divPanel = L.DomUtil.get(divs[i]);
        if (!L.Browser.touch) {
            L.DomEvent.disableClickPropagation(divPanel);
            L.DomEvent.on(divPanel, 'mousewheel', L.DomEvent.stopPropagation);
        } else {
            L.DomEvent.on(divPanel, 'click', L.DomEvent.stopPropagation);
        }
    }
}

