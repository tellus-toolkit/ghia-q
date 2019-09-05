/*	Main set-up file for map layers and layout of the mapping tool
	Richard Kingston, TellUs Toolkit Ltd.
	www.tellus-toolkit.com
	November 2015  */

var highlightLayer;

function highlightFeature(a) {
    highlightLayer = a.target;
    highlightLayer.setStyle({
        weight: 5,
        color: '#666',
        dashArray: '',
        fillOpacity: .7
    });
    if (!L.Browser.ie && !L.Browser.opera) highlightLayer.bringToFront();
    highlightLayer.openPopup();
}

var map = L.map('map', {
    measureControl: true,
    zoomControl: true,
    maxZoom: 19,
    minZoom: 11
}).setView([53.65, -1.38], 11);
// grey box around map
L.mask([
    [53.56, -1.65],
    [53.76, -1.18]
]).addTo(map);
var hash = new L.Hash(map);
var additional_attrib =
    "&copy; <a href='http://www.tellus-toolkit.com/' target ='_blank'>TellUs Toolkit</a> | Contains public sector information licensed under the Open Government Licence <a href='http://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/' target='_blank'>v3.0</a>.";
var feature_group = new L.featureGroup([]);
var bounds_group = new L.featureGroup([]);
var raster_group = new L.LayerGroup([]);

// base maps
var OSMmap = L.tileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: additional_attrib +
        " | &copy; <a href='http://openstreetmap.org'>OpenStreetMap</a> contributors,<a href='http://creativecommons.org/licenses/by-sa/2.0/'>CC-BY-SA</a>",
    maxZoom: 20,
    opacity: 0.5
});
var Esri_WorldImagery = L.tileLayer(
    'http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
        maxZoom: 20,
        opacity: 0.75
    });

var OS_outdoors = L.tileLayer(
    "https://api2.ordnancesurvey.co.uk/mapping_api/v1/service/zxy/EPSG:3857/Outdoor 3857/{z}/{x}/{y}.png?key=RvpTurH03jkMnTLVg9OAwvteLoSUqNuq", {
        maxZoom: 20,
        opacity: 0.85,
        zIndex: 1
    });
var nobasemap = L.tileLayer(
    "", {
        isBaseLayer: true,
        displayInLayerSwitcher: false
    });

Esri_WorldImagery.addTo(map); // change to OSMap if you want to start with a map rather than aerial photography

//OSMmap.addTo(map);
// miniMap in bottom right corner
// var OSMmap2 = new L.TileLayer(OSMmap, {minZoom: 10, maxZoom: 19, attribution: additional_attrib });
// var miniMap = new L.Control.MiniMap(OSMmap2, { toggleDisplay: true }).addTo(map);
var layerOrder = new Array();

function restackLayers() {
    for (index = 0; index < layerOrder.length; index++) layerOrder[index].bringToFront();
}

map.on('overlayadd', restackLayers);
layerControl = L.control.layers({}, {}, {
    collapsed: false
});

// Wakefield boundary
function doStyleWakefield(a) {
    return {
        weight: 2,
        color: '#000000',
        fillColor: '#ffffff',
        dashArray: '',
        opacity: 1,
        fillOpacity: 0
    };
}

var json_WakefieldJSON = new L.geoJson(json_Wakefield, {
    style: doStyleWakefield
});
json_WakefieldJSON.addTo(map);

function pop_BatleyRoad1(feature, layer) {
    var popupContent = '<table><tr><th scope="row">Site name:</th><td>' + Autolinker.link(String(feature.properties['Id'])) + '</td></tr></table>';
    layer.bindPopup(popupContent);
}

function doStyleBatleyRoad1(feature) {
    return {
        color: '#000000',
        fillColor: '#d6cd68',
        weight: 1.3,
        dashArray: '',
        opacity: 1.0,
        fillOpacity: 1.0
    };

}

var exp_BatleyRoad1JSON = new L.geoJson(exp_BatleyRoad1, {
    onEachFeature: pop_BatleyRoad1,
    style: doStyleBatleyRoad1
});
layerOrder[layerOrder.length] = exp_BatleyRoad1JSON;
for (index = 0; index < layerOrder.length; index++) {
    feature_group.removeLayer(layerOrder[index]);
    feature_group.addLayer(layerOrder[index]);
}
//add comment sign to hide this layer on the map in the initial view.
feature_group.addLayer(exp_BatleyRoad1JSON);

function pop_BatleyRoad2(feature, layer) {
    var popupContent = '<table><tr><th scope="row">Site name:</th><td>' + Autolinker.link(String(feature.properties['Id'])) + '</td></tr></table>';
    layer.bindPopup(popupContent);
}

function doStyleBatleyRoad2(feature) {
    return {
        color: '#000000',
        fillColor: '#b66dc2',
        weight: 1.3,
        dashArray: '',
        opacity: 1.0,
        fillOpacity: 1.0
    };

}

var exp_BatleyRoad2JSON = new L.geoJson(exp_BatleyRoad2, {
    onEachFeature: pop_BatleyRoad2,
    style: doStyleBatleyRoad2
});
layerOrder[layerOrder.length] = exp_BatleyRoad2JSON;
for (index = 0; index < layerOrder.length; index++) {
    feature_group.removeLayer(layerOrder[index]);
    feature_group.addLayer(layerOrder[index]);
}
//add comment sign to hide this layer on the map in the initial view.
feature_group.addLayer(exp_BatleyRoad2JSON);

function pop_FlanshawLane(feature, layer) {
    var popupContent = '<table><tr><th scope="row">Site name:</th><td>' + Autolinker.link(String(feature.properties['Id'])) + '</td></tr></table>';
    layer.bindPopup(popupContent);
}

function doStyleFlanshawLane(feature) {
    return {
        color: '#000000',
        fillColor: '#68a057',
        weight: 1.3,
        dashArray: '',
        opacity: 1.0,
        fillOpacity: 1.0
    };

}

var exp_FlanshawLaneJSON = new L.geoJson(exp_FlanshawLane, {
    onEachFeature: pop_FlanshawLane,
    style: doStyleFlanshawLane
});
layerOrder[layerOrder.length] = exp_FlanshawLaneJSON;
for (index = 0; index < layerOrder.length; index++) {
    feature_group.removeLayer(layerOrder[index]);
    feature_group.addLayer(layerOrder[index]);
}
//add comment sign to hide this layer on the map in the initial view.
feature_group.addLayer(exp_FlanshawLaneJSON);

function pop_GlebeFarm(feature, layer) {
    var popupContent = '<table><tr><th scope="row">Site name:</th><td>' + Autolinker.link(String(feature.properties['Id'])) + '</td></tr></table>';
    layer.bindPopup(popupContent);
}

function doStyleGlebeFarm(feature) {
    return {
        color: '#000000',
        fillColor: '#984095',
        weight: 1.3,
        dashArray: '',
        opacity: 1.0,
        fillOpacity: 1.0
    };

}

var exp_GlebeFarmJSON = new L.geoJson(exp_GlebeFarm, {
    onEachFeature: pop_GlebeFarm,
    style: doStyleGlebeFarm
});
layerOrder[layerOrder.length] = exp_GlebeFarmJSON;
for (index = 0; index < layerOrder.length; index++) {
    feature_group.removeLayer(layerOrder[index]);
    feature_group.addLayer(layerOrder[index]);
}
//add comment sign to hide this layer on the map in the initial view.
feature_group.addLayer(exp_GlebeFarmJSON);

function pop_ParkView(feature, layer) {
    var popupContent = '<table><tr><th scope="row">Site name:</th><td>' + Autolinker.link(String(feature.properties['Id'])) + '</td></tr></table>';
    layer.bindPopup(popupContent);
}

function doStyleParkView(feature) {
    return {
        color: '#000000',
        fillColor: '#8107cc',
        weight: 1.3,
        dashArray: '',
        opacity: 1.0,
        fillOpacity: 1.0
    };

}

var exp_ParkViewJSON = new L.geoJson(exp_ParkView, {
    onEachFeature: pop_ParkView,
    style: doStyleParkView
});
layerOrder[layerOrder.length] = exp_ParkViewJSON;
for (index = 0; index < layerOrder.length; index++) {
    feature_group.removeLayer(layerOrder[index]);
    feature_group.addLayer(layerOrder[index]);
}
//add comment sign to hide this layer on the map in the initial view.
feature_group.addLayer(exp_ParkViewJSON);

function pop_WestgateStation(feature, layer) {
    var popupContent = '<table><tr><th scope="row">Site name:</th><td>' + Autolinker.link(String(feature.properties['Id'])) + '</td></tr></table>';
    layer.bindPopup(popupContent);
}

function doStyleWestgateStation(feature) {
    return {
        color: '#000000',
        fillColor: '#cf9c5e',
        weight: 1.3,
        dashArray: '',
        opacity: 1.0,
        fillOpacity: 1.0
    };

}

var exp_WestgateStationJSON = new L.geoJson(exp_WestgateStation, {
    onEachFeature: pop_WestgateStation,
    style: doStyleWestgateStation
});
layerOrder[layerOrder.length] = exp_WestgateStationJSON;
for (index = 0; index < layerOrder.length; index++) {
    feature_group.removeLayer(layerOrder[index]);
    feature_group.addLayer(layerOrder[index]);
}
//add comment sign to hide this layer on the map in the initial view.
feature_group.addLayer(exp_WestgateStationJSON);


function pop_BoroughRoadCarPark(feature, layer) {
    var popupContent = '<table><tr><th scope="row">Name</th><td>' + Autolinker.link(String(feature.properties['Name'])) + '</td></tr></table>';
    layer.bindPopup(popupContent);
}

function doStyleBoroughRoadCarPark(feature) {
    return {
        color: '#000000',
        fillColor: '#d6cd68',
        weight: 1.3,
        dashArray: '',
        opacity: 1.0,
        fillOpacity: 1.0
    };
}

var exp_BoroughRoadCarParkJSON = new L.geoJson(exp_BoroughRoadCarPark, {
    onEachFeature: pop_BoroughRoadCarPark,
    style: doStyleBoroughRoadCarPark
});
layerOrder[layerOrder.length] = exp_BoroughRoadCarParkJSON;
for (index = 0; index < layerOrder.length; index++) {
    feature_group.removeLayer(layerOrder[index]);
    feature_group.addLayer(layerOrder[index]);
}
//add comment sign to hide this layer on the map in the initial view.
feature_group.addLayer(exp_BoroughRoadCarParkJSON);

function pop_JacobsWellLane(feature, layer) {
    var popupContent = '<table><tr><th scope="row">Name</th><td>' + Autolinker.link(String(feature.properties['Name'])) + '</td></tr></table>';
    layer.bindPopup(popupContent);
}

function doStyleJacobsWellLane(feature) {
    return {
        color: '#000000',
        fillColor: '#b66dc2',
        weight: 1.3,
        dashArray: '',
        opacity: 1.0,
        fillOpacity: 1.0
    };
}

var exp_JacobsWellLaneJSON = new L.geoJson(exp_JacobsWellLane, {
    onEachFeature: pop_JacobsWellLane,
    style: doStyleJacobsWellLane
});

// ward boundaries and election results
function pop_wwards2014(feature, layer) {
    var popupContent = '<table><tr><th scope="row">WD14CD</th><td>' + Autolinker.link(String(feature.properties['WD14CD'])) + '</td></tr><tr><th scope="row">Ward</th><td>' + Autolinker.link(String(feature.properties['Ward'])) + '</td></tr><tr><th scope="row">Coun_1</th><td>' + Autolinker.link(String(feature.properties['Coun_1'])) + '</td></tr><tr><th scope="row">Coun_2</th><td>' + Autolinker.link(String(feature.properties['Coun_2'])) + '</td></tr><tr><th scope="row">Coun_3</th><td>' + Autolinker.link(String(feature.properties['Coun_3'])) + '</td></tr><tr><th scope="row">Labour</th><td>' + Autolinker.link(String(feature.properties['Labour'])) + '</td></tr><tr><th scope="row">Con</th><td>' + Autolinker.link(String(feature.properties['Con'])) + '</td></tr><tr><th scope="row">Ind</th><td>' + Autolinker.link(String(feature.properties['Ind'])) + '</td></tr><tr><th scope="row">UKIP</th><td>' + Autolinker.link(String(feature.properties['UKIP'])) + '</td></tr></table>';
    layer.bindPopup(popupContent);
}

function doStylewwards2014(feature) {
    return {
        weight: 2,
        color: '#000000',
        fillColor: '#ffffff',
        dashArray: '',
        opacity: 1,
        fillOpacity: 0
    };

}

var json_wards_14JSON = new L.geoJson(json_wards_14, {
    onEachFeature: pop_wwards2014,
    style: doStylewwards2014
});
layerOrder[layerOrder.length] = json_wards_14JSON;
for (index = 0; index < layerOrder.length; index++) {
    feature_group.removeLayer(layerOrder[index]);
    feature_group.addLayer(layerOrder[index]);
}

// settlement boundaries
var settlements = L.tileLayer.wms(
    "http://inspire.misoportal.com/geoserver/wakefield_metropolitan_district_council_settlement_boundaries_polygon/ows?SERVICE=WMS&", {
        layers: "wakefield_metropolitan_district_council_settlement_boundaries_polygon",
        format: "image/png",
        transparent: true,
        continuousWorld: true
    });

// council owned land and property
function pop_wmdcprop(feature, layer) {
    var popupContent = '<table><tr><th scope="row">Site</th><td>' + Autolinker.link(String(feature.properties['Site'])) + '</td></tr><tr><th scope="row">Address</th><td>' + Autolinker.link(String(feature.properties['Address'])) + '</td></tr><tr><th scope="row">Town</th><td>' + Autolinker.link(String(feature.properties['Town'])) + '</td></tr><tr><th scope="row">Postcode</th><td>' + Autolinker.link(String(feature.properties['Postcode'])) + '</td></tr><tr><th scope="row">Block_Name</th><td>' + Autolinker.link(String(feature.properties['Block_Name'])) + '</td></tr><tr><th scope="row">Category</th><td>' + Autolinker.link(String(feature.properties['Category'])) + '</td></tr><tr><th scope="row">Managed_by</th><td>' + Autolinker.link(String(feature.properties['Managed_by'])) + '</td></tr><tr><th scope="row">Descriptio</th><td>' + Autolinker.link(String(feature.properties['Descriptio'])) + '</td></tr><tr><th scope="row">Status_Ten</th><td>' + Autolinker.link(String(feature.properties['Status_Ten'])) + '</td></tr><tr><th scope="row">Site_area</th><td>' + Autolinker.link(String(feature.properties['Site_area'])) + '</td></tr></table>';
    layer.bindPopup(popupContent);
}

var json_wmdcpropJSON = new L.geoJson(json_wmdcprop, {
    onEachFeature: pop_wmdcprop,
    pointToLayer: function (feature, latlng) {
        return L.circleMarker(latlng, {
            radius: 4.0,
            fillColor: '#75B032',
            color: '#3E2F7D',
            weight: 1,
            opacity: 1.0,
            fillOpacity: 1.0
        })
    }
});

// Geology layers
var overlay_GBRBGS150kSuperficialdeposits = L.tileLayer.wms(
    "https://map.bgs.ac.uk/arcgis/services/BGS_Detailed_Geology/MapServer/WMSServer?", {
        layers: "BGS.50k.Superficial.deposits",
        format: "image/png",
        transparent: true,
        continuousWorld: true
    });

var overlay_GBRBGS150kMassmovement = L.tileLayer.wms(
    "https://map.bgs.ac.uk/arcgis/services/BGS_Detailed_Geology/MapServer/WMSServer?", {
        layers: "BGS.50k.Mass.movement",
        format: "image/png",
        transparent: true,
        continuousWorld: true
    });
var overlay_GBRBGS150kLinearfeatures = L.tileLayer.wms(
    "https://map.bgs.ac.uk/arcgis/services/BGS_Detailed_Geology/MapServer/WMSServer?", {
        layers: "BGS.50k.Linear.features",
        format: "image/png",
        transparent: true,
        continuousWorld: true
    });
var overlay_GBRBGS150kBedrock = L.tileLayer.wms(
    "https://map.bgs.ac.uk/arcgis/services/BGS_Detailed_Geology/MapServer/WMSServer?", {
        layers: "BGS.50k.Bedrock",
        format: "image/png",
        transparent: true,
        continuousWorld: true
    });
var overlay_GBRBGS150kArtificialground = L.tileLayer.wms(
    "https://map.bgs.ac.uk/arcgis/services/BGS_Detailed_Geology/MapServer/WMSServer?", {
        layers: "BGS.50k.Artificial.ground",
        format: "image/png",
        transparent: true,
        continuousWorld: true
    });

/* Start of EA layers */
var overlay_FloodMapAreasBenefitingfromFloodDefences = L.tileLayer.wms(
    "https://environment.data.gov.uk/spatialdata/spatial-flood-defences-including-standardised-attributes/wms&", {
        layers: "Spatial_Flood_Defences_Including_Standardised_Attributes",
        format: "image/png",
        transparent: true,
        continuousWorld: true
    });
var overlay_FloodAlertAreas = L.tileLayer.wms(
    "https://environment.data.gov.uk/spatialdata/flood-alert-areas/wms?Flood_Alert_Areas&", {
        layers: "Flood_Alert_Areas",
        format: "image/png",
        transparent: true,
        continuousWorld: true
    });

var overlay_FloodMapFloodStorageAreas = L.tileLayer.wms(
    "https://environment.data.gov.uk/spatialdata/flood-map-for-planning-rivers-and-sea-flood-storage-areas/wms&", {
        layers: "Flood_Map_for_Planning_Rivers_and_Sea_Flood_Storage_Areas",
        format: "image/png",
        transparent: true,
        continuousWorld: true
    });

var overlay_FloodMapFloodZones2 = L.tileLayer.wms(
    "https://environment.data.gov.uk/spatialdata/flood-map-for-planning-rivers-and-sea-flood-zone-2/wms&", {
        layers: "Flood_Map_for_Planning_Rivers_and_Sea_Flood_Zone_2",
        format: "image/png",
        transparent: true,
        continuousWorld: true
    });

var overlay_FloodMapFloodZones3 = L.tileLayer.wms(
    "https://environment.data.gov.uk/spatialdata/flood-map-for-planning-rivers-and-sea-flood-zone-3/wms&", {
        layers: "Flood_Map_for_Planning_Rivers_and_Sea_Flood_Zone_3",
        format: "image/png",
        transparent: true,
        continuousWorld: true
    });

var overlay_FloodMapSpatialFloodDefences = L.tileLayer.wms(
    "https://environment.data.gov.uk/spatialdata/spatial-flood-defences-including-standardised-attributes/wms&", {
        layers: "Spatial_Flood_Defences_Including_Standardised_Attributes",
        format: "image/png",
        transparent: true,
        continuousWorld: true
    });

/* Risk of Flooding from Rivers and Sea */
var overlay_FloodRiverSea = L.tileLayer.wms(
    "https://environment.data.gov.uk/spatialdata/risk-of-flooding-from-rivers-and-sea/wms&", {
        layers: "Risk_of_Flooding_from_Rivers_and_Sea",
        format: "image/png",
        transparent: true,
        continuousWorld: true
    });

var overlay_FloodWarningAreas = L.tileLayer.wms(
    "https://environment.data.gov.uk/spatialdata/flood-warning-areas/wms&", {
        layers: "Flood_Warning_Areas",
        format: "image/png",
        transparent: true,
        continuousWorld: true
    });

var overlay_HistoricFloodMap = L.tileLayer.wms(
    "https://environment.data.gov.uk/spatialdata/historic-flood-map/wms&", {
        layers: "Historic_Flood_Map",
        format: "image/png",
        transparent: true,
        continuousWorld: true
    });
/* End of EA layers */

// Protected landscapes
var overlay_SitesofSpecialScientificInterestEngland = L.tileLayer.wms(
    "http://environment.data.gov.uk/ds/wms?SERVICE=WMS&INTERFACE=ENVIRONMENT--1126e504-19c1-4e57-a54d-e2cdb3b762a5", {
        layers: "sites-of-special-scientific-interest-england",
        format: "image/png",
        transparent: true,
        continuousWorld: true
    });
var overlay_RegisteredParksandGardens = L.tileLayer.wms(
    "http://environment.data.gov.uk/ds/wms?SERVICE=WMS&INTERFACE=ENVIRONMENT&LC=100000000000", {
        layers: "eainspire2011-wms-parkandgarden_inspire",
        format: "image/png",
        transparent: true,
        continuousWorld: true
    });
var overlay_PriorityHabitatCreationandRestoration = L.tileLayer.wms(
    "http://environment.data.gov.uk/ds/wms?SERVICE=WMS&INTERFACE=ENVIRONMENT--048be6ee-d1a1-4392-bb7b-85a8fd606c9a", {
        layers: "ea_wms_priority_habitat_creation_and_restoration",
        format: "image/png",
        transparent: true,
        continuousWorld: true
    });
var overlay_LocalNatureReservesEngland = L.tileLayer.wms(
    "http://environment.data.gov.uk/ds/wms?SERVICE=WMS&INTERFACE=ENVIRONMENT--9364d6af-927e-4349-b4c3-dbaf7acb842d", {
        layers: "ea_wms_local_nature_reserve_inspire",
        format: "image/png",
        transparent: true,
        continuousWorld: true
    });

var overLay_Local_Wildlife = L.tileLayer.wms(
    "http://inspire.misoportal.com/geoserver/wakefield_metropolitan_district_council_local_wildlife_sites_polygon/wms?", {
        layers: "wakefield_metropolitan_district_council_local_wildlife_sites_polygon",
        format: "image/png",
        transparent: true,
        continuousWorld: true
    });

var overlay_LocalNatureReservesEngland = L.tileLayer.wms(
    "http://www.geostore.com/OGC/OGCInterface?UID=UDATAGOV2011&PASSWORD=datagov2011&INTERFACE=ENVIRONMENT&LC=0&", {
        layers: "ne_wms_local_nature_reserves_england",
        format: "image/png",
        transparent: true,
        continuousWorld: true
    });

var overlay_land_Reclamation = L.tileLayer.wms(
    "http://inspire.misoportal.com/geoserver/wakefield_metropolitan_district_council_land_reclamation_polygon/wms?", {
        layers: "wakefield_metropolitan_district_council_land_reclamation_polygon",
        format: "image/png",
        transparent: true,
        continuousWorld: true
    });

var overlay_SitesofSpecialScientificInterestEngland = L.tileLayer.wms(
    "http://environment.data.gov.uk/ds/wms?SERVICE=WMS&INTERFACE=ENVIRONMENT--ba8dc201-66ef-4983-9d46-7378af21027e&", {
        layers: "ne_wms_sites_of_special_scientific_interest_england",
        format: "image/png",
        transparent: true,
        continuousWorld: true
    });

var overlay_RegisteredParksandGardens = L.tileLayer.wms(
    "http://www.geostore.com/OGC/OGCInterface?UID=UDATAGOV2011&PASSWORD=datagov2011&INTERFACE=ENVIRONMENT&LC=0&", {
        layers: "he_wms_registered_parks_and_gardens",
        format: "image/png",
        transparent: true,
        continuousWorld: true
    });

var overlay_AncientWoodlandsEngland = L.tileLayer.wms(
    "http://www.geostore.com/OGC/OGCInterface?UID=UDATAGOV2011&PASSWORD=datagov2011&INTERFACE=ENVIRONMENT&LC=0&", {
        layers: "ne_wms_ancient_woodlands_england",
        format: "image/png",
        transparent: true,
        continuousWorld: true
    });

var overlay_CRoWAct2000AccessLayer = L.tileLayer.wms(
    "http://www.geostore.com/OGC/OGCInterface?UID=UDATAGOV2011&PASSWORD=datagov2011&INTERFACE=ENVIRONMENT&LC=0&", {
        layers: "ne_wms_crow_act_2000_access_layer_england",
        format: "image/png",
        transparent: true,
        opacity: 0.5,
        continuousWorld: true,
        tiled: true
    });

var overlay_CRoWAct2000S15Land = L.tileLayer.wms(
    "http://www.geostore.com/OGC/OGCInterface?UID=UDATAGOV2011&PASSWORD=datagov2011&INTERFACE=ENVIRONMENT&LC=0&", {
        layers: "eainspire2011-wms-crow_s15_land_inspire",
        format: "image/png",
        transparent: true,
        continuousWorld: true
    });
var overlay_CRoWAct2000S4ConclusiveRegisteredCommonLand = L.tileLayer.wms(
    "http://inspire.misoportal.com:80/geoserver/wakefield_metropolitan_district_council_commland_polygon/ows?service=WMS&", {
        layers: "wakefield_metropolitan_district_council_commland_polygon",
        format: "image/png",
        transparent: true,
        continuousWorld: true
    });
var overlay_TPOs = L.tileLayer.wms(
    "http://inspire.misoportal.com:80/geoserver/wakefield_metropolitan_district_council_tree_preservation_orders_polygon/ows?SERVICE=WMS&", {
        layers: "wakefield_metropolitan_district_council_tree_preservation_orders_polygon",
        format: "image/png",
        transparent: true,
        continuousWorld: true
    });
// air quality

// Mining and landfill
var overlay_SurfaceMiningPastandCurrent = L.tileLayer.wms(
    "https://map.bgs.ac.uk/arcgis/services/CoalAuthority/coalauthority_planning_policy_constraints/MapServer/WMSServer?", {
        layers: "Surface.Mining.Past.and.Current",
        format: "image/png",
        transparent: true,
        continuousWorld: true
    });
var overlay_SurfaceCoalResourceAreas = L.tileLayer.wms(
    "https://map.bgs.ac.uk/arcgis/services/CoalAuthority/coalauthority_planning_policy_constraints/MapServer/WMSServer?", {
        layers: "Surface.Coal.Resource.Areas",
        format: "image/png",
        transparent: true,
        continuousWorld: true
    });
var overlay_DevelopmentHighRiskArea = L.tileLayer.wms(
    "https://map.bgs.ac.uk/arcgis/services/CoalAuthority/coalauthority_planning_policy_constraints/MapServer/WMSServer?", {
        layers: "Development.High.Risk.Area",
        format: "image/png",
        transparent: true,
        continuousWorld: true
    });
var overlay_CoalMiningReportingArea = L.tileLayer.wms(
    "https://map.bgs.ac.uk/arcgis/services/CoalAuthority/coalauthority_planning_policy_constraints/MapServer/WMSServer?", {
        layers: "Coal.Mining.Reporting.Area",
        format: "image/png",
        transparent: true,
        continuousWorld: true
    });
var overlay_PermittedWasteSitesAuthorisedLandfillSiteBoundaries = L.tileLayer.wms(
    "http://inspire.misoportal.com/geoserver/wakefield_metropolitan_district_council_waste_polygon/wms?", {
        layers: "wakefield_metropolitan_district_council_waste_polygon",
        format: "image/png",
        transparent: true,
        continuousWorld: true
    });
var overlay_HistoricLandfill = L.tileLayer.wms(
    "http://www.geostore.com/OGC/OGCInterface?UID=UDATAGOV2011&PASSWORD=datagov2011&INTERFACE=ENVIRONMENT&LC=0&", {
        layers: "ea_wms_historic_landfill",
        format: "image/png",
        transparent: true,
        continuousWorld: true
    });
var overlay_GeoIndex = L.tileLayer.wms(
    "https://map.bgs.ac.uk/arcgis/services/GeoIndex_Onshore/products/MapServer/WmsServer", {
        layers: "",
        format: "",
        transparent: true,
        continuousWorld: true
    });
// custon icon fixed size
var ttIcon = L.Icon.extend({
    options: {
        iconSize: [16, 16]
    }
});
// create some custom TellUs Toolkit icons
var aldiIcon = new ttIcon({
        iconUrl: 'legend/aldi.png'
    }), // aldi
    asdaIcon = new ttIcon({
        iconUrl: 'legend/asda.png'
    }), // ASDA
    coopIcon = new ttIcon({
        iconUrl: 'legend/coop.png'
    }), // Co-op
    lidlIcon = new ttIcon({
        iconUrl: 'legend/lidl.png'
    }), // Lidl
    msIcon = new ttIcon({
        iconUrl: 'legend/ms.png'
    }), // M & S
    morrisonsIcon = new ttIcon({
        iconUrl: 'legend/morrisons.png'
    }), // Morrisons
    sainburysIcon = new ttIcon({
        iconUrl: 'legend/sainsburys.png'
    }), // Sainsburys
    tescoIcon = new ttIcon({
        iconUrl: 'legend/tesco.png'
    }), // Tesco
    waitroseIcon = new ttIcon({
        iconUrl: 'legend/waitrose.png'
    }); // Waitrose
primaryIcon = new ttIcon({
    iconUrl: 'legend/primary.png'
}); // primary
secondaryIcon = new ttIcon({
    iconUrl: 'legend/secondary.png'
}); // secondary
ofstedIcon = new ttIcon({
    iconUrl: 'legend/ofsted.png'
}); // Ofsted
sportIcon = new ttIcon({
    iconUrl: 'legend/Sportsfacilities.png'
}); // sport centre
pylonIcon = new ttIcon({
    iconUrl: 'legend/pylons.png'
});  // pylons

// supermarkets
function pop_supermarkets(feature, layer) {
    var popupContent = '<table><tr><th scope="row">Postcode</th><td>' +
        Autolinker.link(String(feature.properties['postcode'])) +
        '</td></tr><tr><th scope="row">Name</th><td>' + Autolinker.link(
            String(feature.properties['Store'])) + '</td></tr></table>';
    layer.bindPopup(popupContent);
}

function doStylesupermarkets(feature) {
    switch (feature.properties.Store) { // make sure this matches the JSON property type
        case 'Aldi':
            return {
                icon: aldiIcon
            };
            break;
        case 'ASDA':
            return {
                icon: asdaIcon
            };
            break;
        case 'Co-op':
            return {
                icon: coopIcon
            };
            break;
        case 'Lidl':
            return {
                icon: lidlIcon
            };
            break;
        case 'M&S':
            return {
                icon: msIcon
            };
            break;
        case 'Morrisons':
            return {
                icon: morrisonsIcon
            };
            break;
        case 'Sainburys':
            return {
                icon: sainburysIcon
            };
            break;
        case 'Tesco':
            return {
                icon: tescoIcon
            };
            break;
        case 'Waitrose':
            return {
                icon: waitroseIcon
            };
    }
}

var json_supermarketsJSON = new L.geoJson(json_supermarkets, {
    onEachFeature: pop_supermarkets,
    pointToLayer: function (feature, latlng) {
        //return L.circleMarker(latlng, doStylesupermarkets(feature))
        return L.marker(latlng, doStylesupermarkets(feature));
    }
});
layerOrder[layerOrder.length] = json_supermarketsJSON;
bounds_group.addLayer(json_supermarketsJSON);
//add comment sign to hide this layer on the map in the initial view.

// sports gounds/centres
function pop_Sportsfacilities(feature, layer) {
    layer.off({
        mouseout: function (e) {
            layer.setStyle(doStyleSportsfacilities(feature));
            if (typeof layer.closePopup == 'function') {
                layer.closePopup();
            } else {
                layer.eachLayer(function (feature) {
                    feature.closePopup()
                });
            }
        },
        mouseover: highlightFeature,
    });
    var popupContent = '<table><tr><th scope="row">Postcode</th><td>' +
        Autolinker.link(String(feature.properties['Postcode'])) +
        '</td></tr><tr><th scope="row">Name</th><td>' + Autolinker.link(
            String(feature.properties['Name'])) +
        '</td></tr><tr><th scope="row">Facilities</th><td>' + Autolinker.link(
            String(feature.properties['Facility'])) + '</td></tr></table>';
    layer.bindPopup(popupContent);
}

function doStyleSportsfacilities() {
    return {
        icon: sportIcon
    }
}

/*function doPointToLayerSportsfacilities(feature, latlng) {
    return L.circleMarker(latlng, doStyleSportsfacilities())
}*/

var json_SportsfacilitiesJSON = new L.geoJson(json_Sportsfacilities, {
    onEachFeature: pop_Sportsfacilities,
    pointToLayer: function (feature, latlng) {
        return L.marker(latlng, doStyleSportsfacilities(feature));
    }
});

// footpaths
function pop_RoW(a, b) {
    b.off({
        mouseout: function (c) {
            b.setStyle(doStyleRoW(a));
            if (typeof b.closePopup == 'function') {
                a.closePopup();
            } else {
                a.eachLayer(function (feature) {
                    a.clsoePopup()
                });
            }
        },
        mouseover: highlightFeature
    });
    var c = '<table><tr><th scope="row">Name</th><td>' + Autolinker.link(
        String(a.properties["Name"])) +
        '</td></tr><tr><th scope="row">Type</th><td>' + Autolinker.link(
            String(a.properties["FolderPath"])) + '</td></tr></table>';
    b.bindPopup(c);
}

function doStyleRoW(a) {
    switch (a.properties.FolderPath) { // make sure this matches the JSON property type
        case 'Footpath':
            return {
                color: "#dc7045",
                weight: "2",
                dashArray: "",
                opacity: "1.0"
            };
            break;
        case 'Boat':
            return {
                color: "#8bda30",
                weight: "2",
                dashArray: "",
                opacity: "1.0"
            };
            break;
        case 'Bridleway':
            return {
                color: "#75c8ae",
                weight: "2",
                dashArray: "",
                opacity: "1.0"
            };
            break;
        case 'Restricted Byway':
            return {
                color: "#de48d2",
                weight: "2",
                dashArray: "",
                opacity: "1.0"
            };
            break;
    }
}

var json_RoWJSON = new L.geoJson(json_RoW, {
    onEachFeature: pop_RoW,
    style: doStyleRoW
});

// Country parks
function pop_CountryParks(a, b) {
    b.off({
        mouseout: function (c) {
            b.setStyle(doStyleCountryParks(a));
            if ("function" == typeof b.closePopup) b.closePopup();
            else b.eachLayer(function (a) {
                a.closePopup();
            });
        },
        mouseover: highlightFeature
    });
    var c = '<table><tr><th scope="row">Park</th><td>' + Autolinker.link(
        String(a.properties["LABEL"])) + "</td></tr></table>";
    b.bindPopup(c);
}

function doStyleCountryParks(a) {
    return {
        weight: 1.04,
        color: "#809848",
        fillColor: "#badd69",
        dashArray: "",
        opacity: 1,
        fillOpacity: 1
    };
}

var json_CountryParksJSON = new L.geoJson(json_CountryParks, {
    onEachFeature: pop_CountryParks,
    style: doStyleCountryParks
});

// Greenbelt
function doStylegreenbelt(feature) {
    return {
        color: '#68711C',
        weight: 0,
        fillColor: '#68711C',
        opacity: 0.75,
        fillOpacity: 0.75
    };
}

var WakefieldgreenbeltJSON = new L.geoJson(json_greenbelt, {
    //onEachFeature: pop_Wakefieldgreenbelt201314,
    style: doStylegreenbelt
});
layerOrder[layerOrder.length] = WakefieldgreenbeltJSON;
for (index = 0; index < layerOrder.length; index++) {
    feature_group.removeLayer(layerOrder[index]);
    feature_group.addLayer(layerOrder[index]);
}

// house price sales
function pop_houseprice201014(feature, layer) {
    var popupContent = '<table><tr><th scope="row">Postcode</th><td>' +
        Autolinker.link(String(feature.properties['Postcode'])) +
        '</td></tr><tr><th scope="row">Price</th><td>' + Autolinker.link(
            String(feature.properties['Price'])) +
        '</td></tr><tr><th scope="row">Year</th><td>' + Autolinker.link(
            String(feature.properties['Year'])) +
        '</td></tr><tr><th scope="row">Property type<br />(Detached<br />Semi-Detached<br />Terraced<br />Flats/Maisonettes)</th><td>' +
        Autolinker.link(String(feature.properties['Type'])) +
        '</td></tr><tr><th scope="row">New build<br />(yes / no)</th><td>' +
        Autolinker.link(String(feature.properties['New'])) +
        '</td></tr><tr><th scope="row">Tenure<br />(freehold / leadsehold)</th><td>' +
        Autolinker.link(String(feature.properties['Tenure'])) +
        '</td></tr></table>';
    layer.bindPopup(popupContent);
}

var exp_houseprice201014JSON = new L.geoJson(houseprice201014, {
    onEachFeature: pop_houseprice201014,
    pointToLayer: function (feature, latlng) {
        return L.circleMarker(latlng, {
            radius: 7.5,
            fillColor: feature.properties.Col,
            /* colours for each year year10: #1b9e77, year11: #d95f02, year12: #7570b3, year13: #e7298a, year14: #66a61e */
            color: '#00FFFFFFF', // make marker outline transparent
            weight: 1,
            opacity: 1
        })
    }
});
exp_houseprice201014JSON.on('mouseover', function (e) {
    e.layer.openPopup();
});
exp_houseprice201014JSON.on('mouseout', function (e) {
    e.layer.closePopup();
});
var cluster_grouphouseprice201014JSON = new L.MarkerClusterGroup({
    showCoverageOnHover: true,
    removeOutsideVisibleBounds: false,
    spiderLegPolylineOptions: {
        weight: 2.5,
        color: '#f69d1f'
    }
});
cluster_grouphouseprice201014JSON.addLayer(exp_houseprice201014JSON);

// average house prices by type of property

// detached
function pop_avhoused(feature, layer) {
    var popupContent = '<table><tr><th colspan="2" scope="row">Average price 2010-14</tr><tr><th scope="row">LSOA</th><td>' + Autolinker.link(String(feature.properties['LSOA'])) + '</td></tr><tr><th scope="row">Average price</th><td>' + Autolinker.link(String(feature.properties['Price'])) + '</td></tr><tr><th scope="row">Type</th><td>' + Autolinker.link(String(feature.properties['Type'])) + '</td></tr></table>';
    layer.bindPopup(popupContent);
}

function doStyleavhoused(feature) {
    if (feature.properties.Price == 0) {
        return {
            color: '#000000',
            weight: '1.3',
            fillColor: '#d9d9d9',
            opacity: '1.0',
            fillOpacity: '1.0',
        }
    }
    if (feature.properties.Price >= 75000 && feature.properties.Price <= 89500.0) {
        return {
            color: '#000000',
            weight: '1.3',
            fillColor: '#fff5eb',
            opacity: '1.0',
            fillOpacity: '1.0',
        }
    }
    if (feature.properties.Price >= 89500.0 && feature.properties.Price <= 179000.0) {
        return {
            color: '#000000',
            weight: '1.3',
            fillColor: '#fdd1a5',
            opacity: '1.0',
            fillOpacity: '1.0',
        }
    }
    if (feature.properties.Price >= 179000.0 && feature.properties.Price <= 268500.0) {
        return {
            color: '#000000',
            weight: '1.3',
            fillColor: '#fd9243',
            opacity: '1.0',
            fillOpacity: '1.0',
        }
    }
    if (feature.properties.Price >= 268500.0 && feature.properties.Price <= 358000.0) {
        return {
            color: '#000000',
            weight: '1.3',
            fillColor: '#de4f05',
            opacity: '1.0',
            fillOpacity: '1.0',
        }
    }
    if (feature.properties.Price >= 358000.0 && feature.properties.Price <= 447500.0) {
        return {
            color: '#000000',
            weight: '1.3',
            fillColor: '#7f2704',
            opacity: '1.0',
            fillOpacity: '1.0',
        }
    }
}

var exp_avhousedJSON = new L.geoJson(exp_avhoused, {
    onEachFeature: pop_avhoused,
    style: doStyleavhoused
});

// semi
function pop_avhouses(feature, layer) {
    var popupContent = '<table><tr><th colspan="2" scope="row">Average price 2010-14</tr><tr><th scope="row">LSOA</th><td>' + Autolinker.link(String(feature.properties['LSOA'])) + '</td></tr><tr><th scope="row">Average price</th><td>' + Autolinker.link(String(feature.properties['Price'])) + '</td></tr><tr><th scope="row">Type</th><td>' + Autolinker.link(String(feature.properties['Type'])) + '</td></tr></table>';
    layer.bindPopup(popupContent);
}

function doStyleavhouses(feature) {
    if (feature.properties.Price == 0) {
        return {
            color: '#000000',
            weight: '1.3',
            fillColor: '#d9d9d9',
            opacity: '1.0',
            fillOpacity: '1.0',
        }
    }
    if (feature.properties.Price >= 59500 && feature.properties.Price <= 61917.0) {
        return {
            color: '#000000',
            weight: '1.3',
            fillColor: '#fff5eb',
            opacity: '1.0',
            fillOpacity: '1.0',
        }
    }
    if (feature.properties.Price >= 61917.0 && feature.properties.Price <= 92875.0) {
        return {
            color: '#000000',
            weight: '1.3',
            fillColor: '#fdd1a5',
            opacity: '1.0',
            fillOpacity: '1.0',
        }
    }
    if (feature.properties.Price >= 92875.0 && feature.properties.Price <= 123833.0) {
        return {
            color: '#000000',
            weight: '1.3',
            fillColor: '#fd9243',
            opacity: '1.0',
            fillOpacity: '1.0',
        }
    }
    if (feature.properties.Price >= 123833.0 && feature.properties.Price <= 154792.0) {
        return {
            color: '#000000',
            weight: '1.3',
            fillColor: '#de4f05',
            opacity: '1.0',
            fillOpacity: '1.0',
        }
    }
    if (feature.properties.Price >= 154792.0 && feature.properties.Price <= 185750.0) {
        return {
            color: '#000000',
            weight: '1.3',
            fillColor: '#7f2704',
            opacity: '1.0',
            fillOpacity: '1.0',
        }
    }
}

var exp_avhousesJSON = new L.geoJson(exp_avhouses, {
    onEachFeature: pop_avhouses,
    style: doStyleavhouses
});

// terraced
function pop_avhouset(feature, layer) {
    var popupContent = '<table><tr><th colspan="2" scope="row">Average price 2010-14</tr><tr><th scope="row">LSOA</th><td>' + Autolinker.link(String(feature.properties['LSOA'])) + '</td></tr><tr><th scope="row">Average price</th><td>' + Autolinker.link(String(feature.properties['Price'])) + '</td></tr><tr><th scope="row">Type</th><td>' + Autolinker.link(String(feature.properties['Type'])) + '</td></tr></table>';
    layer.bindPopup(popupContent);
}

function doStyleavhouset(feature) {
    if (feature.properties.Price == 0) {
        return {
            color: '#000000',
            weight: '1.3',
            fillColor: '#d9d9d9',
            opacity: '1.0',
            fillOpacity: '1.0',
        }
    }
    if (feature.properties.Price >= 22500 && feature.properties.Price <= 49000.0) {
        return {
            color: '#000000',
            weight: '1.3',
            fillColor: '#fff5eb',
            opacity: '1.0',
            fillOpacity: '1.0',
        }
    }
    if (feature.properties.Price >= 49000.0 && feature.properties.Price <= 98000.0) {
        return {
            color: '#000000',
            weight: '1.3',
            fillColor: '#fdd1a5',
            opacity: '1.0',
            fillOpacity: '1.0',
        }
    }
    if (feature.properties.Price >= 98000.0 && feature.properties.Price <= 147000.0) {
        return {
            color: '#000000',
            weight: '1.3',
            fillColor: '#fd9243',
            opacity: '1.0',
            fillOpacity: '1.0',
        }
    }
    if (feature.properties.Price >= 147000.0 && feature.properties.Price <= 196000.0) {
        return {
            color: '#000000',
            weight: '1.3',
            fillColor: '#de4f05',
            opacity: '1.0',
            fillOpacity: '1.0',
        }
    }
    if (feature.properties.Price >= 196000.0 && feature.properties.Price <= 245000.0) {
        return {
            color: '#000000',
            weight: '1.3',
            fillColor: '#7f2704',
            opacity: '1.0',
            fillOpacity: '1.0',
        }
    }
}

var exp_avhousetJSON = new L.geoJson(exp_avhouset, {
    onEachFeature: pop_avhouset,
    style: doStyleavhouset
});

// flats
function pop_avhousef(feature, layer) {
    var popupContent = '<table><tr><th colspan="2" scope="row">Average price 2010-14</tr><tr><th scope="row">LSOA</th><td>' + Autolinker.link(String(feature.properties['LSOA'])) + '</td></tr><tr><th scope="row">Average price</th><td>' + Autolinker.link(String(feature.properties['Price'])) + '</td></tr><tr><th scope="row">Type</th><td>' + Autolinker.link(String(feature.properties['Type'])) + '</td></tr></table>';
    layer.bindPopup(popupContent);
}

function doStyleavhousef(feature) {
    if (feature.properties.Price == 0) {
        return {
            color: '#000000',
            weight: '1.3',
            fillColor: '#d9d9d9',
            opacity: '1.0',
            fillOpacity: '1.0',
        }
    }
    if (feature.properties.Price >= 24998 && feature.properties.Price <= 52533.4) {
        return {
            color: '#000000',
            weight: '1.3',
            fillColor: '#fff5eb',
            opacity: '1.0',
            fillOpacity: '1.0',
        }
    }
    if (feature.properties.Price >= 52533.4 && feature.properties.Price <= 105066.8) {
        return {
            color: '#000000',
            weight: '1.3',
            fillColor: '#fdd1a5',
            opacity: '1.0',
            fillOpacity: '1.0',
        }
    }
    if (feature.properties.Price >= 105066.8 && feature.properties.Price <= 157600.2) {
        return {
            color: '#000000',
            weight: '1.3',
            fillColor: '#fd9243',
            opacity: '1.0',
            fillOpacity: '1.0',
        }
    }
    if (feature.properties.Price >= 157600.2 && feature.properties.Price <= 210133.6) {
        return {
            color: '#000000',
            weight: '1.3',
            fillColor: '#de4f05',
            opacity: '1.0',
            fillOpacity: '1.0',
        }
    }
    if (feature.properties.Price >= 210133.6 && feature.properties.Price <= 262667.0) {
        return {
            color: '#000000',
            weight: '1.3',
            fillColor: '#7f2704',
            opacity: '1.0',
            fillOpacity: '1.0',
        }
    }
}

var exp_avhousefJSON = new L.geoJson(exp_avhousef, {
    onEachFeature: pop_avhousef,
    style: doStyleavhousef
});
// end of average house prices

// council tax bands
function pop_ctax(feature, layer) {
    var popupContent = '<table><tr><th scope="row">LSOA</th><td>' +
        Autolinker.link(String(feature.properties['LSOA'])) +
        '</td></tr><tr><th scope="row">Tax_Band_A</th><td>' + Autolinker.link(
            String(feature.properties['Tax_Band_A'])) +
        '</td></tr><tr><th scope="row">Tax_Band_B</th><td>' + Autolinker.link(
            String(feature.properties['Tax_Band_B'])) +
        '</td></tr><tr><th scope="row">Tax_Band_C</th><td>' + Autolinker.link(
            String(feature.properties['Tax_Band_C'])) +
        '</td></tr><tr><th scope="row">Tax_Band_D</th><td>' + Autolinker.link(
            String(feature.properties['Tax_Band_D'])) +
        '</td></tr><tr><th scope="row">Tax_Band_E</th><td>' + Autolinker.link(
            String(feature.properties['Tax_Band_E'])) +
        '</td></tr><tr><th scope="row">Tax_Band_F</th><td>' + Autolinker.link(
            String(feature.properties['Tax_Band_F'])) +
        '</td></tr><tr><th scope="row">Tax_Band_G</th><td>' + Autolinker.link(
            String(feature.properties['Tax_Band_G'])) +
        '</td></tr><tr><th scope="row">Tax_Band_H</th><td>' + Autolinker.link(
            String(feature.properties['Tax_Band_H'])) +
        '</td></tr><tr><th scope="row">Tax_Band_I</th><td>' + Autolinker.link(
            String(feature.properties['Tax_Band_I'])) +
        '</td></tr></table>';
    layer.bindPopup(popupContent);
}

function doStylectax(feature) {
    return {
        color: '#000000',
        fillColor: '#0cc38c',
        weight: 1.3,
        dashArray: '',
        opacity: 1.0,
        fillOpacity: 1.0
    };
}

var json_ctaxJSON = new L.geoJson(json_ctax, {
    onEachFeature: pop_ctax,
    style: doStylectax
});
layerOrder[layerOrder.length] = json_ctaxJSON;
for (index = 0; index < layerOrder.length; index++) {
    feature_group.removeLayer(layerOrder[index]);
    feature_group.addLayer(layerOrder[index]);
}

// IMD 2015
function pop_IMD2015Wakefield(feature, layer) {
    var popupContent = '<table><tr><th scope="row">IMD 2015 rank<br />(all of England<br />out of 32,843<br />LSOAs)</th><td>' + Autolinker.link(String(feature.properties['IMD_Wake_2'])) + '</td></tr><tr><th scope="row">IMD 2015 decile</th><td>' + Autolinker.link(String(feature.properties['IMD_Wake_3'])) + '</td></tr></table>';
    layer.bindPopup(popupContent);
}

function doStyleIMD2015Wakefield(feature) {
    switch (feature.properties.IMD_Wake_3) {
        case '1':
            return {
                weight: '1.3',
                fillColor: '#d7191c',
                color: '#000000',
                weight: '1',
                dashArray: '',
                opacity: '1.0',
                fillOpacity: '0.7'
            };
            break;
        case '2':
            return {
                weight: '1.3',
                fillColor: '#e75b3a',
                color: '#000000',
                weight: '1',
                dashArray: '',
                opacity: '1.0',
                fillOpacity: '0.7'
            };
            break;
        case '3':
            return {
                weight: '1.3',
                fillColor: '#f89d59',
                color: '#000000',
                weight: '1',
                dashArray: '',
                opacity: '1.0',
                fillOpacity: '0.7'
            };
            break;
        case '4':
            return {
                weight: '1.3',
                fillColor: '#fdc980',
                color: '#000000',
                weight: '1',
                dashArray: '',
                opacity: '1.0',
                fillOpacity: '0.7'
            };
            break;
        case '5':
            return {
                weight: '1.3',
                fillColor: '#feedaa',
                color: '#000000',
                weight: '1',
                dashArray: '',
                opacity: '1.0',
                fillOpacity: '0.7'
            };
            break;
        case '6':
            return {
                weight: '1.3',
                fillColor: '#ebf6ac',
                color: '#000000',
                weight: '1',
                dashArray: '',
                opacity: '1.0',
                fillOpacity: '0.7'
            };
            break;
        case '7':
            return {
                weight: '1.3',
                fillColor: '#c3e586',
                color: '#000000',
                weight: '1',
                dashArray: '',
                opacity: '1.0',
                fillOpacity: '0.7'
            };
            break;
        case '8':
            return {
                weight: '1.3',
                fillColor: '#96d165',
                color: '#000000',
                weight: '1',
                dashArray: '',
                opacity: '1.0',
                fillOpacity: '0.7'
            };
            break;
        case '9':
            return {
                weight: '1.3',
                fillColor: '#58b353',
                color: '#000000',
                weight: '1',
                dashArray: '',
                opacity: '1.0',
                fillOpacity: '0.7'
            };
            break;
        case '10':
            return {
                weight: '1.3',
                fillColor: '#1a9641',
                color: '#000000',
                weight: '1',
                dashArray: '',
                opacity: '1.0',
                fillOpacity: '0.7'
            };
            break;
    }
}

var exp_IMD2015WakefieldJSON = new L.geoJson(exp_IMD2015Wakefield, {
    onEachFeature: pop_IMD2015Wakefield,
    style: doStyleIMD2015Wakefield
});


// population - no car or van
function pop_population(feature, layer) {
    layer.off({
        mouseout: function (e) {
            layer.setStyle(doStylepopulation(feature));
            if (typeof layer.closePopup == 'function') {
                layer.closePopup();
            } else {
                layer.eachLayer(function (feature) {
                    feature.closePopup()
                });
            }
        },
        mouseover: highlightFeature,
    });
    var popupContent = '<table><tr><th scope="row">CODE</th><td>' +
        Autolinker.link(String(feature.properties['CODE'])) +
        '</td></tr><tr><th scope="row">NAME</th><td>' + Autolinker.link(
            String(feature.properties['NAME'])) +
        '</td></tr><tr><th scope="row">Economic_A</th><td>' + Autolinker.link(
            String(feature.properties['Economic_A'])) +
        '</td></tr><tr><th scope="row">Part_Time</th><td>' + Autolinker.link(
            String(feature.properties['Part_Time'])) +
        '</td></tr><tr><th scope="row">Full_Time</th><td>' + Autolinker.link(
            String(feature.properties['Full_Time'])) +
        '</td></tr><tr><th scope="row">Self_Emplo</th><td>' + Autolinker.link(
            String(feature.properties['Self_Emplo'])) +
        '</td></tr><tr><th scope="row">Unemployed</th><td>' + Autolinker.link(
            String(feature.properties['Unemployed'])) +
        '</td></tr><tr><th scope="row">Full_Time_</th><td>' + Autolinker.link(
            String(feature.properties['Full_Time_'])) +
        '</td></tr><tr><th scope="row">Retired</th><td>' + Autolinker.link(
            String(feature.properties['Retired'])) +
        '</td></tr><tr><th scope="row">Student_In</th><td>' + Autolinker.link(
            String(feature.properties['Student_In'])) +
        '</td></tr><tr><th scope="row">Looking_Af</th><td>' + Autolinker.link(
            String(feature.properties['Looking_Af'])) +
        '</td></tr><tr><th scope="row">Long_Term_</th><td>' + Autolinker.link(
            String(feature.properties['Long_Term_'])) +
        '</td></tr><tr><th scope="row">Other</th><td>' + Autolinker.link(
            String(feature.properties['Other'])) +
        '</td></tr><tr><th scope="row">Never_Work</th><td>' + Autolinker.link(
            String(feature.properties['Never_Work'])) +
        '</td></tr><tr><th scope="row">LSOA</th><td>' + Autolinker.link(
            String(feature.properties['LSOA'])) +
        '</td></tr><tr><th scope="row">No_Cars_or</th><td>' + Autolinker.link(
            String(feature.properties['No_Cars_or'])) +
        '</td></tr><tr><th scope="row">one_Car_or</th><td>' + Autolinker.link(
            String(feature.properties['one_Car_or'])) +
        '</td></tr><tr><th scope="row">two_Cars_o</th><td>' + Autolinker.link(
            String(feature.properties['two_Cars_o'])) +
        '</td></tr><tr><th scope="row">three_Cars</th><td>' + Autolinker.link(
            String(feature.properties['three_Cars'])) +
        '</td></tr><tr><th scope="row">four_or_Mo</th><td>' + Autolinker.link(
            String(feature.properties['four_or_Mo'])) +
        '</td></tr><tr><th scope="row">All_Cars_o</th><td>' + Autolinker.link(
            String(feature.properties['All_Cars_o'])) +
        '</td></tr></table>';
    layer.bindPopup(popupContent);
}

function doStylepopulation(feature) {
    if (feature.properties.No_Cars_or >= 4.8 && feature.properties.No_Cars_or <=
        15.3) {
        return {
            color: '#000000',
            weight: '1',
            dashArray: '',
            fillColor: '#fff5f0',
            opacity: '1.0',
            fillOpacity: '0.75',
        }
    }
    if (feature.properties.No_Cars_or >= 15.3 && feature.properties.No_Cars_or <=
        25.1) {
        return {
            color: '#000000',
            weight: '1',
            dashArray: '',
            fillColor: '#fcbda4',
            opacity: '1.0',
            fillOpacity: '0.75',
        }
    }
    if (feature.properties.No_Cars_or >= 25.1 && feature.properties.No_Cars_or <=
        35.8) {
        return {
            color: '#000000',
            weight: '1',
            dashArray: '',
            fillColor: '#fb7050',
            opacity: '1.0',
            fillOpacity: '0.75',
        }
    }
    if (feature.properties.No_Cars_or >= 35.8 && feature.properties.No_Cars_or <=
        47.1) {
        return {
            color: '#000000',
            weight: '1',
            dashArray: '',
            fillColor: '#d32020',
            opacity: '1.0',
            fillOpacity: '0.75',
        }
    }
    if (feature.properties.No_Cars_or >= 47.1 && feature.properties.No_Cars_or <=
        64.5) {
        return {
            color: '#000000',
            weight: '1',
            dashArray: '',
            fillColor: '#67000d',
            opacity: '1.0',
            fillOpacity: '0.75',
        }
    }
}

var json_populationJSON = new L.geoJson(json_population, {
    onEachFeature: pop_population,
    style: doStylepopulation
});
//layerOrder[layerOrder.length] = json_populationJSON;
//bounds_group.addLayer(json_populationJSON);
// population - no car or van
function pop_unemployed(feature, layer) {
    layer.on({
        mouseout: function (e) {
            layer.setStyle(doStyleunemployed(feature));
            if (typeof layer.closePopup == 'function') {
                layer.closePopup();
            } else {
                layer.eachLayer(function (feature) {
                    feature.closePopup()
                });
            }
        },
        mouseover: highlightFeature,
    });
    var popupContent = '<table><tr><th scope="row">CODE</th><td>' +
        Autolinker.link(String(feature.properties['CODE'])) +
        '</td></tr><tr><th scope="row">NAME</th><td>' + Autolinker.link(
            String(feature.properties['NAME'])) +
        '</td></tr><tr><th scope="row">Economic_A</th><td>' + Autolinker.link(
            String(feature.properties['Economic_A'])) +
        '</td></tr><tr><th scope="row">Part_Time</th><td>' + Autolinker.link(
            String(feature.properties['Part_Time'])) +
        '</td></tr><tr><th scope="row">Full_Time</th><td>' + Autolinker.link(
            String(feature.properties['Full_Time'])) +
        '</td></tr><tr><th scope="row">Self_Emplo</th><td>' + Autolinker.link(
            String(feature.properties['Self_Emplo'])) +
        '</td></tr><tr><th scope="row">Unemployed</th><td>' + Autolinker.link(
            String(feature.properties['Unemployed'])) +
        '</td></tr><tr><th scope="row">Full_Time_</th><td>' + Autolinker.link(
            String(feature.properties['Full_Time_'])) +
        '</td></tr><tr><th scope="row">Retired</th><td>' + Autolinker.link(
            String(feature.properties['Retired'])) +
        '</td></tr><tr><th scope="row">Student_In</th><td>' + Autolinker.link(
            String(feature.properties['Student_In'])) +
        '</td></tr><tr><th scope="row">Looking_Af</th><td>' + Autolinker.link(
            String(feature.properties['Looking_Af'])) +
        '</td></tr><tr><th scope="row">Long_Term_</th><td>' + Autolinker.link(
            String(feature.properties['Long_Term_'])) +
        '</td></tr><tr><th scope="row">Other</th><td>' + Autolinker.link(
            String(feature.properties['Other'])) +
        '</td></tr><tr><th scope="row">Never_Work</th><td>' + Autolinker.link(
            String(feature.properties['Never_Work'])) +
        '</td></tr><tr><th scope="row">LSOA</th><td>' + Autolinker.link(
            String(feature.properties['LSOA'])) +
        '</td></tr><tr><th scope="row">No_Cars_or</th><td>' + Autolinker.link(
            String(feature.properties['No_Cars_or'])) +
        '</td></tr><tr><th scope="row">one_Car_or</th><td>' + Autolinker.link(
            String(feature.properties['one_Car_or'])) +
        '</td></tr><tr><th scope="row">two_Cars_o</th><td>' + Autolinker.link(
            String(feature.properties['two_Cars_o'])) +
        '</td></tr><tr><th scope="row">three_Cars</th><td>' + Autolinker.link(
            String(feature.properties['three_Cars'])) +
        '</td></tr><tr><th scope="row">four_or_Mo</th><td>' + Autolinker.link(
            String(feature.properties['four_or_Mo'])) +
        '</td></tr><tr><th scope="row">All_Cars_o</th><td>' + Autolinker.link(
            String(feature.properties['All_Cars_o'])) +
        '</td></tr></table>';
    // layer.bindPopup(popupContent);
}

function doStyleunemployed(feature) {
    if (feature.properties.Unemployed >= 1.3 && feature.properties.Unemployed <=
        3.1) {
        return {
            color: '#000000',
            weight: '1.04',
            dashArray: '',
            fillColor: '#fff5f0',
            opacity: '1.0',
            fillOpacity: '1.0',
        }
    }
    if (feature.properties.Unemployed >= 3.1 && feature.properties.Unemployed <=
        4.4) {
        return {
            color: '#000000',
            weight: '1.04',
            dashArray: '',
            fillColor: '#fcbda4',
            opacity: '1.0',
            fillOpacity: '1.0',
        }
    }
    if (feature.properties.Unemployed >= 4.4 && feature.properties.Unemployed <=
        6.0) {
        return {
            color: '#000000',
            weight: '1.04',
            dashArray: '',
            fillColor: '#fb7050',
            opacity: '1.0',
            fillOpacity: '1.0',
        }
    }
    if (feature.properties.Unemployed >= 6.0 && feature.properties.Unemployed <=
        8.0) {
        return {
            color: '#000000',
            weight: '1.04',
            dashArray: '',
            fillColor: '#d32020',
            opacity: '1.0',
            fillOpacity: '1.0',
        }
    }
    if (feature.properties.Unemployed >= 8.0 && feature.properties.Unemployed <=
        12.1) {
        return {
            color: '#000000',
            weight: '1.04',
            dashArray: '',
            fillColor: '#67000d',
            opacity: '1.0',
            fillOpacity: '1.0',
        }
    }
}

var json_unemployednJSON = new L.geoJson(json_population, {
    onEachFeature: pop_population,
    style: doStylepopulation
});

// pylons
function pop_Pylon(a, b) {
    b.on;
}

function doStylePylon() {
    return {
        icon: pylonIcon
    };
}

var json_PylonJSON = new L.geoJson(json_pylons, {
    onEachFeature: pop_Pylon,
    pointToLayer: function (feature, latlng) {
        return L.marker(latlng, doStylePylon(feature));
    }
});


function pop_GasPipe(a, b) {
    b.on({
        mouseout: function (c) {
            b.setStyle(doStyleGasPipe(a));
            if ("function" == typeof b.closePopup) b.closePopup();
            else b.eachLayer(function (a) {
                a.closePopup();
            });
        },
        mouseover: highlightFeature
    });
    var c = '<table><tr><th scope="row">OBJECTID</th><td>' + Autolinker.link(
        String(a.properties["OBJECTID"])) +
        '</td></tr><tr><th scope="row">PIPE_No</th><td>' + Autolinker.link(
            String(a.properties["PIPE_No"])) +
        '</td></tr><tr><th scope="row">PIPE_NAME</th><td>' + Autolinker.link(
            String(a.properties["PIPE_NAME"])) +
        '</td></tr><tr><th scope="row">NG_OWNED</th><td>' + Autolinker.link(
            String(a.properties["NG_OWNED"])) +
        '</td></tr><tr><th scope="row">DIAMETER_m</th><td>' + Autolinker.link(
            String(a.properties["DIAMETER_m"])) +
        '</td></tr><tr><th scope="row">MOP_Bar</th><td>' + Autolinker.link(
            String(a.properties["MOP_Bar"])) +
        '</td></tr><tr><th scope="row">STEEL_GRAD</th><td>' + Autolinker.link(
            String(a.properties["STEEL_GRAD"])) +
        '</td></tr><tr><th scope="row">WALL_THICK</th><td>' + Autolinker.link(
            String(a.properties["WALL_THICK"])) +
        '</td></tr><tr><th scope="row">PIPELINE_P</th><td>' + Autolinker.link(
            String(a.properties["PIPELINE_P"])) +
        '</td></tr><tr><th scope="row">BPD_km</th><td>' + Autolinker.link(
            String(a.properties["BPD_km"])) +
        '</td></tr><tr><th scope="row">ABANDONED</th><td>' + Autolinker.link(
            String(a.properties["ABANDONED"])) +
        '</td></tr><tr><th scope="row">YEAR_COMMI</th><td>' + Autolinker.link(
            String(a.properties["YEAR_COMMI"])) +
        '</td></tr><tr><th scope="row">Length</th><td>' + Autolinker.link(
            String(a.properties["Length"])) + "</td></tr></table>";
    b.bindPopup(c);
}

function doStyleGasPipe(a) {
    return {
        weight: 1.04,
        color: "#b6f666",
        dashArray: "",
        opacity: 1
    };
}

var json_GasPipeJSON = new L.geoJson(json_GasPipe, {
    onEachFeature: pop_GasPipe,
    style: doStyleGasPipe
});
//layerOrder[layerOrder.length] = json_GasPipeJSON;
//bounds_group.addLayer(json_GasPipeJSON);
function pop_OverHeadLine(a, b) {
    b.on({
        mouseout: function (c) {
            b.setStyle(doStyleOverHeadLine(a));
            if ("function" == typeof b.closePopup) b.closePopup();
            else b.eachLayer(function (a) {
                a.closePopup();
            });
        },
        mouseover: highlightFeature
    });
    var c = '<table><tr><th scope="row">GDO_GID</th><td>' + Autolinker.link(
        String(a.properties["GDO_GID"])) +
        '</td></tr><tr><th scope="row">ROUTE</th><td>' + Autolinker.link(
            String(a.properties["ROUTE"])) +
        '</td></tr><tr><th scope="row">CIRCUIT1</th><td>' + Autolinker.link(
            String(a.properties["CIRCUIT1"])) +
        '</td></tr><tr><th scope="row">CIRCUIT2</th><td>' + Autolinker.link(
            String(a.properties["CIRCUIT2"])) +
        '</td></tr><tr><th scope="row">OPERATING_</th><td>' + Autolinker.link(
            String(a.properties["OPERATING_"])) +
        '</td></tr><tr><th scope="row">TOWERS_IN_</th><td>' + Autolinker.link(
            String(a.properties["TOWERS_IN_"])) +
        '</td></tr><tr><th scope="row">STATUS</th><td>' + Autolinker.link(
            String(a.properties["STATUS"])) +
        '</td></tr><tr><th scope="row">ACTION_DTT</th><td>' + Autolinker.link(
            String(a.properties["ACTION_DTT"])) + "</td></tr></table>";
    b.bindPopup(c);
}

function doStyleOverHeadLine(a) {
    return {
        weight: 1.04,
        color: "#63b8f8",
        dashArray: "",
        opacity: 1
    };
}

var json_OverHeadLineJSON = new L.geoJson(json_OverHeadLine, {
    onEachFeature: pop_OverHeadLine,
    style: doStyleOverHeadLine
});
//layerOrder[layerOrder.length] = json_OverHeadLineJSON;
//bounds_group.addLayer(json_OverHeadLineJSON);
function pop_Cables(a, b) {
    b.on({
        mouseout: function (c) {
            b.setStyle(doStyleCables(a));
            if ("function" == typeof b.closePopup) b.closePopup();
            else b.eachLayer(function (a) {
                a.closePopup();
            });
        },
        mouseover: highlightFeature
    });
    var c = '<table><tr><th scope="row">GDO_GID</th><td>' + Autolinker.link(
        String(a.properties["GDO_GID"])) +
        '</td></tr><tr><th scope="row">CABLE_SET</th><td>' + Autolinker.link(
            String(a.properties["CABLE_SET"])) +
        '</td></tr><tr><th scope="row">CABLE_ROUT</th><td>' + Autolinker.link(
            String(a.properties["CABLE_ROUT"])) +
        '</td></tr><tr><th scope="row">OPERATING_</th><td>' + Autolinker.link(
            String(a.properties["OPERATING_"])) +
        '</td></tr><tr><th scope="row">CABLE_MAKE</th><td>' + Autolinker.link(
            String(a.properties["CABLE_MAKE"])) +
        '</td></tr><tr><th scope="row">STATUS</th><td>' + Autolinker.link(
            String(a.properties["STATUS"])) +
        '</td></tr><tr><th scope="row">CABLE_TYPE</th><td>' + Autolinker.link(
            String(a.properties["CABLE_TYPE"])) +
        '</td></tr><tr><th scope="row">COMMENTS</th><td>' + Autolinker.link(
            String(a.properties["COMMENTS"])) +
        '</td></tr><tr><th scope="row">TUNNEL</th><td>' + Autolinker.link(
            String(a.properties["TUNNEL"])) +
        '</td></tr><tr><th scope="row">OWNED</th><td>' + Autolinker.link(
            String(a.properties["OWNED"])) +
        '</td></tr><tr><th scope="row">YEAR_OF_IN</th><td>' + Autolinker.link(
            String(a.properties["YEAR_OF_IN"])) +
        '</td></tr><tr><th scope="row">ACTION_DTT</th><td>' + Autolinker.link(
            String(a.properties["ACTION_DTT"])) + "</td></tr></table>";
    b.bindPopup(c);
}

function doStyleCables(a) {
    return {
        weight: 1.04,
        color: "#d47fd4",
        dashArray: "",
        opacity: 1
    };
}

var json_CablesJSON = new L.geoJson(json_Cables, {
    onEachFeature: pop_Cables,
    style: doStyleCables
});
//layerOrder[layerOrder.length] = json_CablesJSON;
//bounds_group.addLayer(json_CablesJSON);
function pop_Electricitysubstation(a, b) {
    b.on({
        mouseout: function (c) {
            b.setStyle(doStyleElectricitysubstation(a));
            if ("function" == typeof b.closePopup) b.closePopup();
            else b.eachLayer(function (a) {
                a.closePopup();
            });
        },
        mouseover: highlightFeature
    });
    var c = '<table><tr><th scope="row">GDO_GID</th><td>' + Autolinker.link(
        String(a.properties["GDO_GID"])) +
        '</td></tr><tr><th scope="row">SUBSTATION</th><td>' + Autolinker.link(
            String(a.properties["SUBSTATION"])) +
        '</td></tr><tr><th scope="row">SUBSTATIO1</th><td>' + Autolinker.link(
            String(a.properties["SUBSTATIO1"])) +
        '</td></tr><tr><th scope="row">OPERATING_</th><td>' + Autolinker.link(
            String(a.properties["OPERATING_"])) +
        '</td></tr><tr><th scope="row">STATUS</th><td>' + Autolinker.link(
            String(a.properties["STATUS"])) +
        '</td></tr><tr><th scope="row">OWNER_FLAG</th><td>' + Autolinker.link(
            String(a.properties["OWNER_FLAG"])) +
        '</td></tr><tr><th scope="row">ACTION_DTT</th><td>' + Autolinker.link(
            String(a.properties["ACTION_DTT"])) + "</td></tr></table>";
    b.bindPopup(c);
}

function doStyleElectricitysubstation(a) {
    return {
        weight: 1.04,
        color: "#000000",
        fillColor: "#824b80",
        dashArray: "",
        opacity: 1,
        fillOpacity: 1
    };
}

var json_ElectricitysubstationJSON = new L.geoJson(json_Electricitysubstation, {
    onEachFeature: pop_Electricitysubstation,
    style: doStyleElectricitysubstation
});
//layerOrder[layerOrder.length] = json_ElectricitysubstationJSON;
//bounds_group.addLayer(json_ElectricitysubstationJSON);
function pop_Busstops(a, b) {
    a.on;
}

function doStyleBusstops(a) {
    return {
        radius: 2,
        fillColor: "#ca6168",
        color: "#000000",
        weight: 0,
        opacity: 0,
        dashArray: "",
        fillOpacity: 1
    };
}

function doPointToLayerBusstops(a, b) {
    return L.circleMarker(b, doStyleBusstops());
}

var json_BusstopsJSON = new L.geoJson(json_Busstops, {
    pointToLayer: doPointToLayerBusstops
});

var overlay_Railsstations = L.tileLayer.wms(
    //"http://inspire.misoportal.com:80/geoserver/transport_direct_railnetwork/wfs?", {
    "http://inspire.misoportal.com:80/geoserver/department_of_transport_railnetwork/wms?", {
        layers: "department_of_transport_railnetwork:department_of_transport_stations",
        format: "image/png",
        transparent: true,
        continuousWorld: true
    });

var overlay_Railnetwork = L.tileLayer.wms(
    "http://inspire.misoportal.com:80/geoserver/department_of_transport_railnetwork/wms?", {
        layers: "department_of_transport_railnetwork:department_of_transport_railnetwork",
        format: "image/png",
        transparent: true,
        continuousWorld: true
    });

function pop_HS2Jan2013(a, b) {
    b.on({
        mouseout: function (c) {
            b.setStyle(doStyleHS2Jan2013(a));
            if ("function" == typeof b.closePopup) b.closePopup();
            else b.eachLayer(function (a) {
                a.closePopup();
            });
        },
        mouseover: highlightFeature
    });
    var c = '<table><tr><th scope="row">CH_START</th><td>' + Autolinker.link(
        String(a.properties["CH_START"])) +
        '</td></tr><tr><th scope="row">CH_END</th><td>' + Autolinker.link(
            String(a.properties["CH_END"])) +
        '</td></tr><tr><th scope="row">FOR_ENG</th><td>' + Autolinker.link(
            String(a.properties["FOR_ENG"])) +
        '</td></tr><tr><th scope="row">SECTION</th><td>' + Autolinker.link(
            String(a.properties["SECTION"])) +
        '</td></tr><tr><th scope="row">SEC_LENGTH</th><td>' + Autolinker.link(
            String(a.properties["SEC_LENGTH"])) +
        '</td></tr><tr><th scope="row">SHAPE_Leng</th><td>' + Autolinker.link(
            String(a.properties["SHAPE_Leng"])) + "</td></tr></table>";
    b.bindPopup(c);
}

function doStyleHS2Jan2013(a) {
    return {
        weight: 2,
        color: "#000000",
        dashArray: "",
        opacity: 1
    };
}

var json_HS2Jan2013JSON = new L.geoJson(json_HS2Jan2013, {
    onEachFeature: pop_HS2Jan2013,
    style: doStyleHS2Jan2013
});
//layerOrder[layerOrder.length] = json_HS2Jan2013JSON;
for (index = 0; index < layerOrder.length; index++) {
    feature_group.removeLayer(layerOrder[index]);
    feature_group.addLayer(layerOrder[index]);
}

// schools
function pop_Primary(feature, layer) {
    layer.off({
        mouseout: function (c) {
            layer.setStyle(doStylePrimary(feature));
            if ("function" == typeof b.closePopup) b.closePopup();
            else b.eachLayer(function (layer) {
                feature.closePopup();
            });
        },
        mouseover: highlightFeature
    });
    var popupContent = '<table><tr><th scope="row">School_Loc</th><td>' + Autolinker.link(
        String(feature.properties["School_Loc"])) +
        '</td></tr><tr><th scope="row">School_tow</th><td>' + Autolinker.link(
            String(feature.properties["School_tow"])) +
        '</td></tr><tr><th scope="row">Religious</th><td>' + Autolinker.link(
            String(feature.properties["Religious"])) +
        '</td></tr><tr><th scope="row">medium_KS1</th><td>' + Autolinker.link(
            String(feature.properties["medium_KS1"])) +
        '</td></tr><tr><th scope="row">high_KS1_a</th><td>' + Autolinker.link(
            String(feature.properties["high_KS1_a"])) +
        '</td></tr></table>';
    layer.bindPopup(popupContent);
}

function doStylePrimary() {
    return {
        icon: primaryIcon
    };
}

var json_PrimaryJSON = new L.geoJson(json_Primary, {
    onEachFeature: pop_Primary,
    pointToLayer: function (feature, latlng) {
        return L.marker(latlng, doStylePrimary(feature));
    }
});

// schools
function pop_Secondary(a, b) {
    b.on({
        mouseout: function (c) {
            b.setStyle(doStyleSecondary(a));
            if ("function" == typeof b.closePopup) b.closePopup();
            else b.eachLayer(function (a) {
                a.closePopup();
            });
        },
        mouseover: highlightFeature
    });
    var c = '<table><tr><th scope="row">Name</th><td>' + Autolinker.link(
        String(a.properties["SCHNAME"])) +
        '</td></tr><tr><th scope="row">Type</th><td>' + Autolinker.link(
            String(a.properties["NFTYPE"])) +
        '</td></tr><tr><th scope="row">Religious</th><td>' + Autolinker.link(
            String(a.properties["RELDENOM"])) +
        '</td></tr><tr><th scope="row">% pass 1 LV3</th><td>' + Autolinker.link(
            String(a.properties["PTPASS1LV3"])) +
        '</td></tr><tr><th scope="row">% pass 2 LV3</th><td>' + Autolinker.link(
            String(a.properties["PTPASS2LV3"])) +
        '</td></tr><tr><th scope="row">% pass 3 LV3</th><td>' + Autolinker.link(
            String(a.properties["PTPASS3LV3"])) +
        '</td></tr><tr><th scope="row">% pass 1 L_1</th><td>' + Autolinker.link(
            String(a.properties["PTPASS1L_1"])) +
        '</td></tr><tr><th scope="row">% pass 2 L_1</th><td>' + Autolinker.link(
            String(a.properties["PTPASS2L_1"])) +
        '</td></tr><tr><th scope="row">% pass 3 L_1</th><td>' + Autolinker.link(
            String(a.properties["PTPASS3L_1"])) +
        '</td></tr><tr><th scope="row">% pass 1 L_2</th><td>' + Autolinker.link(
            String(a.properties["PTPASS1L_2"])) +
        '</td></tr><tr><th scope="row">% pass 2 L_2</th><td>' + Autolinker.link(
            String(a.properties["PTPASS2L_2"])) +
        '</td></tr><tr><th scope="row">% pass 3 L_2</th><td>' + Autolinker.link(
            String(a.properties["PTPASS3L_2"])) +
        '</td></tr><tr><th scope="row">% grade AAB</th><td>' + Autolinker.link(
            String(a.properties["PTGRADEAAB"])) + "</td></tr></table>";
    b.bindPopup(c);
}

function doStyleSecondary() {
    return {
        icon: secondaryIcon
    };
}

var json_SecondaryJSON = new L.geoJson(json_Secondary, {
    onEachFeature: pop_Secondary,
    pointToLayer: function (feature, latlng) {
        return L.marker(latlng, doStyleSecondary(feature));
    }
});

// Ofsted reports
function pop_ofsted(feature, layer) {
    var popupContent = '<table><tr><th scope="row">School name</th><td>' +
        Autolinker.link(String(feature.properties['School_nam'])) +
        '</td></tr><tr><th scope="row">LA</th><td>' + Autolinker.link(
            String(feature.properties['Local_auth'])) +
        '</td></tr><th scope="row">Type of school</th><td>' + Autolinker.link(
            String(feature.properties['Type_of_es'])) +
        '</td></tr><tr><th scope="row">Phase</th><td>' + Autolinker.link(
            String(feature.properties['Phase'])) +
        '</td></tr><tr><th scope="row">Sixth form?</th><td>' + Autolinker.link(
            String(feature.properties['Sixth_form'])) +
        '</td></tr>' +
        /**
         <tr><th scope="row">Insp 1</th><td>' + Autolinker.link(
         String(feature.properties['Inspecti_1'])) +
         '</td></tr><tr><th scope="row">Insp 2</th><td>' + Autolinker.link(
         String(feature.properties['Inspecti_2'])) +
         '</td></tr><tr><th scope="row">Insp 3</th><td>' + Autolinker.link(
         String(feature.properties['Inspecti_3'])) +
         '</td></tr> */
        '<tr><th scope="row">Overall effectiveness</th><td>' +
        Autolinker.link(String(feature.properties['Overall_ef'])) +
        '</td></tr><tr><th scope="row">Category_o</th><td>' + Autolinker.link(
            String(feature.properties['Category_o'])) +
        '</td></tr><tr><th scope="row">Effectiveness</th><td>' + Autolinker.link(
            String(feature.properties['Effectiven'])) +
        '</td></tr><tr><th scope="row">Effectiv_1</th><td>' + Autolinker.link(
            String(feature.properties['Effectiv_1'])) +
        '</td></tr><tr><th scope="row">Achievemen</th><td>' + Autolinker.link(
            String(feature.properties['Achievemen'])) +
        '</td></tr><tr><th scope="row">Behaviour</th><td>' + Autolinker.link(
            String(feature.properties['Behaviour'])) +
        '</td></tr><tr><th scope="row">Quality_of</th><td>' + Autolinker.link(
            String(feature.properties['Quality_of'])) +
        '</td></tr><tr><th scope="row">Leadership</th><td>' + Autolinker.link(
            String(feature.properties['Leadership'])) +
        '</td></tr></table>';
    layer.bindPopup(popupContent);
}

function doStyleOfsted() {
    return {
        icon: ofstedIcon
    };
}

var json_ofstedJSON = new L.geoJson(json_ofsted, {
    onEachFeature: pop_ofsted,
    pointToLayer: function (feature, latlng) {
        return L.marker(latlng, doStyleOfsted(feature));
    }
});

// search for a place
var geocoder = new L.Control.geocoder({
    collapsed: true,
    position: "topleft",
    geocoder: L.Control.Geocoder.nominatim({
        geocodingQueryParams: {
            countrycodes: 'gb',
            city: 'wakefield'
        }
    }),
    text: "Search"
});
geocoder.addTo(map);

var baseMaps = [{
    groupName: "Base maps &nbsp &nbsp <a href='http://environment.data.gov.uk/ds/catalogue/#/catalogue' target='_blank'>Source data</a>",
    expanded: true,
    layers: {
        'Satellite': Esri_WorldImagery,
        'Open Street Map': OSMmap,
        'OS outdoors': OS_outdoors,
        'No base map': nobasemap
    }
}];

var overlays = [{
    groupName: "Admin",
    expanded: false,
    layers: {
        'Wakefield': json_WakefieldJSON,
        /*'Parliamentary Constituencies': json_MPs,*/
        'Council Wards': json_wards_14JSON,
        'LDF Settlement Boundaries <!--a href="info/.html"><i class="fa fa-info-circle"></i></a-->': settlements,
        'Council owned land &amp; property': json_wmdcpropJSON
    }
}, {
    groupName: "Development Sites",
    expanded: false,
    layers: {
        //'Batley Road 1': exp_BatleyRoad1JSON,
        'Batley Road': exp_BatleyRoad2JSON,
        'Borough Road Car Park': exp_BoroughRoadCarParkJSON,
        //'Flanshaw Lane': exp_FlanshawLaneJSON,
        //'Glebe Farm': exp_GlebeFarmJSON,
        'Jacobs Well Lane': exp_JacobsWellLaneJSON,
        'Park View': exp_ParkViewJSON
        //'Westgate Station': exp_WestgateStationJSON
    }
},
    {
        groupName: "Housing",
        expanded: false,
        layers: {
            'Sales by year<table><tr><td style=background-color:#1b9e77;width:12px><td>2010<td style=background-color:#e7298a;width:12px><td>2013<tr><td style=background-color:#d95f02;width:12px><td>2011<td style=background-color:#66a61e;width:12px><td>2014<tr><td style=background-color:#7570b3;width:12px><td>2012</table>': cluster_grouphouseprice201014JSON,
            'Mean flat &pound;<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src="legend/grey_zero.png" /> No sales<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src="legend/avhoused_00000895000000.png" /> 24,998 - 52,533.40<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src="legend/avhoused_8950000001790000000.png" /> 52,533.40 - 105,066.80<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src="legend/avhoused_17900000002685000000.png" /> 105,066.80 - 157,600.20<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src="legend/avhoused_26850000003580000000.png" /> 157,600.20 - 210,133.60<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src="legend/avhoused_35800000004475000000.png" /> 210,133.60 - 262,667<br />': exp_avhousefJSON,
            'Mean terraced &pound;<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src="legend/grey_zero.png" /> No sales<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src="legend/avhoused_00000895000000.png" /> 25,500 - 49,000<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src="legend/avhoused_8950000001790000000.png" /> 49,000 - 98,000<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src="legend/avhoused_17900000002685000000.png" /> 98,000 - 147,000<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src="legend/avhoused_26850000003580000000.png" /> 147,000 - 196,000<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src="legend/avhoused_35800000004475000000.png" /> 196,000 - 245,000<br />': exp_avhousetJSON,
            'Mean semi-detached &pound;<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src="legend/grey_zero.png" /> No sales<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src="legend/avhoused_00000895000000.png" /> 59,500 - 61,917<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src="legend/avhoused_8950000001790000000.png" /> 61,917 - 92,875<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src="legend/avhoused_17900000002685000000.png" /> 92,875 - 123,833<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src="legend/avhoused_26850000003580000000.png" /> 123,833 - 154,792<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src="legend/avhoused_35800000004475000000.png" /> 154,792 - 185,750<br />': exp_avhousesJSON,
            'Mean Detached &pound;<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src="legend/grey_zero.png" /> No sales<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src="legend/avhoused_00000895000000.png" /> 75,000 - 89,500<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src="legend/avhoused_8950000001790000000.png" /> 89,500 - 179,000<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src="legend/avhoused_17900000002685000000.png" /> 179,000 - 268,500<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src="legend/avhoused_26850000003580000000.png" /> 268,500 - 358,000<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src="legend/avhoused_35800000004475000000.png" /> 358,000 - 447,500<br />': exp_avhousedJSON,
            'Council tax bands': json_ctaxJSON
        }
    }, {
        groupName: "Services",
        expanded: false,
        layers: {
            '<img src="legend/Primary.png" /> Primary schools': json_PrimaryJSON,
            '<img src="legend/Secondary.png" /> Secondary schools': json_SecondaryJSON,
            '<img src="legend/ofsted.png" /> Ofsted Reports': json_ofstedJSON,
            'Supermarkets <table><tr><td><img src="legend/aldi.png" /> Aldi</td><td><img src="legend/asda.png" /> ASDA</td></tr><tr><td><img src="legend/coop.png" /> Co-op</td><td> <img src="legend/lidl.png" /> Lidl</td></tr><tr><td><img src="legend/ms.png" /> M & S</td><td> <img src="legend/morrisons.png" /> Morrisons</td></tr><tr><td><img src="legend/sainsburys.png" /> Sainburys</td><td> <img src="legend/tesco.png" /> Tesco</td></tr><tr><td><img src="legend/waitrose.png" /> Waitrose</td><td></td></tr></table>': json_supermarketsJSON,
        }
    }, {
        groupName: "Infrastructure",
        expanded: false,
        layers: {
            '<img src="legend/Busstops.png" /> Bus stops': json_BusstopsJSON,
            'Railway stations': overlay_Railsstations,
            'Railway tracks': overlay_Railnetwork,
            '<img src="legend/HS2Jan2013.png" /> HS2 (Jan 2013)': json_HS2Jan2013JSON,
            '<img src="legend/Electricitysubstation.png" /> Electricity substation': json_ElectricitysubstationJSON,
            '<img src="legend/pylons.png" /> Pylon': json_PylonJSON,
            '<img src="legend/GasPipe.png" /> Gas Pipe': json_GasPipeJSON,
            '<img src="legend/OverHeadLine.png" /> Over Head Line': json_OverHeadLineJSON,
            '<img src="legend/Cables.png" /> Cables': json_CablesJSON
        },
    }, {
        groupName: "Socio-economic",
        expanded: false,
        layers: {
            'IMD 2015 Wakefield<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src="legend/IMD2015Wakefield_1.png" /> 1st decile<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src="legend/IMD2015Wakefield_2.png" /> 2nd decile<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src="legend/IMD2015Wakefield_3.png" /> 3rd decile<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src="legend/IMD2015Wakefield_4.png" /> 4th decile<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src="legend/IMD2015Wakefield_5.png" /> 5th decile<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src="legend/IMD2015Wakefield_6.png" /> 6th decile<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src="legend/IMD2015Wakefield_7.png" /> 7th decile<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src="legend/IMD2015Wakefield_8.png" /> 8th decile<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src="legend/IMD2015Wakefield_9.png" /> 9th decile<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src="legend/IMD2015Wakefield_10.png" /> 10th decile<br />': exp_IMD2015WakefieldJSON,
            '% no car or van<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src="legend/population_48000153000.png" />  4.8 - 15.3 <br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src="legend/population_153000251000.png" />  15.3 - 25.1 <br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src="legend/population_251000358000.png" />  25.1 - 35.8 <br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src="legend/population_358000471000.png" />  35.8 - 47.1 <br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src="legend/population_471000645000.png" />  47.1 - 64.5 <br />': json_populationJSON,
            '% unemployed<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src="legend/unemployed_1331.png" />  1.3 - 3.1 <br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src="legend/unemployed_3144.png" />  3.1 - 4.4 <br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src="legend/unemployed_4460.png" />  4.4 - 6.0 <br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src="legend/unemployed_6080.png" />  6.0 - 8.0 <br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src="legend/unemployed_80121.png" />  8.0 - 12.1 <br />': json_unemployednJSON
        }
    }, {
        groupName: "Parks &amp; countryside",
        expanded: false,
        layers: {
            '<img src="legend/Sportsfacilities.png" /> Sports facilities': json_SportsfacilitiesJSON,
            'Rights of Way<br /><table><tr><td><img src="legend/RoW_RoWboat.png" /> boat</td><td><img src="legend/RoW_RoWbridleway.png" /> bridleway</td></tr><tr><td><img src="legend/RoW_RoWFootpath.png" />Footpath</td><td><img src="legend/RoW_RoWrestrictedbyway.png" /> restricted byway</td></tr></table>': json_RoWJSON,
            '<img src="legend/CountryParks.png" /> Country Parks': json_CountryParksJSON
        }
    }, {
        groupName: "Flooding",
        expanded: false,
        layers: {
            'Flood defences': overlay_FloodMapAreasBenefitingfromFloodDefences,
            'Flood alert areas': overlay_FloodAlertAreas,
            'Flood storage': overlay_FloodMapFloodStorageAreas,
            'Zone 2': overlay_FloodMapFloodZones2,
            'Zone 3': overlay_FloodMapFloodZones3,
            'Spatial flood defences': overlay_FloodMapSpatialFloodDefences,
            'Flooding from rivers & sea': overlay_FloodRiverSea,
            'Flood warning areas': overlay_FloodWarningAreas,
            'Historic flood map': overlay_HistoricFloodMap
        }
    }, {
        groupName: "Protected landscapes",
        expanded: false,
        layers: {
            'Access land': overlay_CRoWAct2000AccessLayer,
            'Ancient woodlands': overlay_AncientWoodlandsEngland,
            'Common land': overlay_CRoWAct2000S4ConclusiveRegisteredCommonLand,
            'Greenbelt': WakefieldgreenbeltJSON,
            //'Habitat Creation &amp; Restoration': overlay_PriorityHabitatCreationandRestoration,
            'Local NAture Reserves': overlay_LocalNatureReservesEngland,
            'Local wildlife sites': overLay_Local_Wildlife,
            'Registered Parks &amp; Gardens': overlay_RegisteredParksandGardens,
            //'S15 land': overlay_CRoWAct2000S15Land,
            'SSSIs': overlay_SitesofSpecialScientificInterestEngland,
            'Tree Preservation Orders': overlay_TPOs
        }
    }, {
        groupName: "Mining &amp; landfill",
        expanded: false,
        layers: {
            'Surface mining past &amp; current': overlay_SurfaceMiningPastandCurrent,
            'Surface coal resource areas': overlay_SurfaceCoalResourceAreas,
            'Development high risk area': overlay_DevelopmentHighRiskArea,
            'Coal mining reporting area': overlay_CoalMiningReportingArea,
            'Land reclamation': overlay_land_Reclamation,
            'Current landfill': overlay_PermittedWasteSitesAuthorisedLandfillSiteBoundaries,
            'Historic landfill': overlay_HistoricLandfill
        }
    }, {
        groupName: "Geology (BGS)",
        expanded: false,
        layers: {
            'Superficial deposits <!--img src=\"https://map.bgs.ac.uk/arcgis/services/BGS_Detailed_Geology/MapServer/WMSServer?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&LAYER=BGS.50k.Superficial.deposits\" /-->': overlay_GBRBGS150kSuperficialdeposits,
            'Mass movement': overlay_GBRBGS150kMassmovement,
            'Liner features': overlay_GBRBGS150kLinearfeatures,
            'Bedrock': overlay_GBRBGS150kBedrock,
            'Artificial ground': overlay_GBRBGS150kArtificialground
        }
    }
];

var options = {
    container_width: '225px',
    group_maxHeight: '400px',
    exclusive: false,
    collapsed: false
};

// create the styles layer control
var layerControl = L.Control.styledLayerControl(baseMaps, overlays, options);
layerControl._map = map;
var controlDiv = layerControl.onAdd(map);
document.getElementById('controls').appendChild(controlDiv);

// add a help button with popup info
var helpPopup = L.popup().setContent('This version of the TellUs Toolkit is specifically aimed at assessing potential housing sites in Wakefield, West Yorkshire.  The map legend to the right of the screen contains a number of social, economic and environmental indicators and constraints which you can overlay on the base map.');
L.easyButton('fa-question-circle', function (btn, map) {
    helpPopup.setLatLng(map.getCenter()).openOn(map);
}).addTo(map);


// zoomBox control
var zoomBox = L.control.zoomBox({
    modal: true, // If false (default), it deactivates after each use.
    // If true, zoomBox control stays active until you click on the control to deactivate.
    position: 'topleft'
    // className: 'customClass'  // Class to use to provide icon instead of Font Awesome
});
map.addControl(zoomBox);

L.control.navbar().addTo(map);
L.control.scale({
    options: {
        position: 'bottomleft',
        maxWidth: 100,
        metric: true,
        imperial: false,
        updateWhenIdle: false
    }
}).addTo(map);
var title = new L.Control();
title.onAdd = function (a) {
    this._div = L.DomUtil.create('div', 'info');
    this.update();
    return this._div;
};
/*title.update = function () {
    this._div.innerHTML =
        "<table class='title'><tr><td><img src='css/images/TellUs-logo-small.png' width='125px'></td><!-- td><img src='tw-logo-vsm.jpg' alt='Taylor Wimpey' title='Taylor Wimpey' /></td --><td>constraints<br>mapping</td></tr></table>";
};
// housing site<br>
title.addTo(map);*/

// add drawing functions
var drawnItems = new L.FeatureGroup();
map.addLayer(drawnItems);
var drawControl = new L.Control.Draw({
    draw: {
        position: 'topleft',
        polygon: {
            title: 'Draw a polygon!',
            allowIntersection: false,
            drawError: {
                color: '#b00b00',
                timeout: 1000
            },
            shapeOptions: {
                color: '#bada55'
            },
            showArea: true
        },
        polyline: {
            metric: false
        },
        circle: {
            shapeOptions: {
                color: '#662d91'
            }
        }
    },
    edit: {
        featureGroup: drawnItems
    }
});
map.addControl(drawControl);
map.on('draw:created', function (e) {
    var type = e.layerType,
        layer = e.layer;
    if (type === 'marker') {
        layer.bindPopup('This your marker');
    }
    drawnItems.addLayer(layer);
});
