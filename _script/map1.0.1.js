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
function openMainMenu() {
    hideAll('.panel-right');
    $('#map-disabled').fadeIn("fast", "linear");
    $('#menu').show('slide', { direction: 'left' }, 300);
}

function closeMainMenu() {
    $('#map-disabled').fadeOut("fast", "linear");
    $('#menu').hide('slide', { direction: 'left' }, 300);
}

function openPanel(panelId) {
    hideAll('.panel-right');
    $('#menu').hide('slide', { direction: 'left' }, 300);
    if ($('#map-disabled').is(":visible"))
        $('#map-disabled').fadeOut("fast", "linear");
    $(panelId).show('slide', { direction: 'right' }, 300);
}

function closePanel(panelId) {
    $(panelId).hide('slide', { direction: 'right' }, 300);
}

function openAccountPanel(panelId) {
    hideAll('.panel-right');
    $('#menu').hide('slide', { direction: 'left' }, 300);
    if (!$('#map-disabled').is(":visible"))
        $('#map-disabled').fadeIn("fast", "linear");
    $(panelId).fadeIn("fast", "linear");
}

function closeAccountPanel(panelId) {
    if ($('#map-disabled').is(":visible"))
        $('#map-disabled').fadeOut("fast", "linear");
    $(panelId).fadeOut("fast", "linear");
}

function hideAll(className) {
    $(className).each(function () {
        if ($(this).is(":visible"))
            $(this).fadeOut("slow", "linear");
    });
}


//Leaflet
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



//Save
//function toggleMenu() {
//    hidePanels('.panel');
//    fade('#map-disabled');
//    togglePanel('#menu', 'left');
//}

//function toggleSubMenu() {
//    togglePanel('.submenu', 'right');
//}

//function openSubMenu(panelID) {
//    //Hide all open 
//    $('.panel').each(function () {
//        if ($(this).is(":visible"))
//            $(this).hide();
//    });
//    showPanel(panelID, 'right');
//    hidePanel('#menu', 'left');
//    if ($('#map-disabled').is(":visible"))
//        fade('#map-disabled');
//}

//function closeSubMenu(panelID) {
//    hidePanel(panelID, 'right');
//}

//function fade(id) {
//    $(id).fadeToggle("fast", "linear");
//}

//function togglePanel(panelID, slideDirection) {
//    $(panelID).toggle('slide', { direction: slideDirection }, 300);
//}

//function hidePanel(panelID, slideDirection) {
//    $(panelID).hide('slide', { direction: slideDirection }, 300);
//}

//function showPanel(panelID, slideDirection) {
//    $(panelID).show('slide', { direction: slideDirection }, 300);
//}
