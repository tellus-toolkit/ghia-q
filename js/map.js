/*	Main set-up file for map layers and layout of the mapping tool
Richard Kingston, TellUs Toolkit Ltd.
www.tellus-toolkit.com
April 2019  */

var map = L.map('map-canvas', {
    measureControl: true,
    zoomControl: true
    //maxZoom: 19,
    //minZoom: 7
}).setView([53.5054695, -2.31836245], 10); // center of GM

// grey box around map
L.mask([
    [53.685745, -1.9095381],
    [53.325194, -2.7271868] // Extent of GM
]).addTo(map);

//var hash = new L.Hash(map);
var additional_attrib =
    "&copy; <a href='https://www.tellus-toolkit.com/' target ='_blank'>TellUs Toolkit</a> | Contains public sector information licensed under the Open Government Licence <a href='https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/' target='_blank'>v3.0</a>.";

// base maps
var baseLayers = [{
    group: "Base maps",
    layers: [
        {
            name: "Open Street Map",
            layer: L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"),
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
                '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'
        }, {
            name: "OS map",
            layer: L.tileLayer("https://api2.ordnancesurvey.co.uk/mapping_api/v1/service/zxy/EPSG:3857/Outdoor 3857/{z}/{x}/{y}.png?key=RvpTurH03jkMnTLVg9OAwvteLoSUqNuq"),
            active: true
        }, {
            name: "Satellite image",
            layer: L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}")
        }, {
            name: "No base map",
            layer: L.tileLayer("")
        }
    ]
}];

var ghiaLayers = [
    {
        group: "Admin maps",
        layers: [
            {
                active: true,
                name: "Greater Manchester",
                layer: L.geoJson(GreaterManchester, {
                    style: GMStyle
                })
            }, {
                active: false,
                name: "Districts",
                layer: L.geoJson(GMdistricts, {
                    style: DistStyle
                })
            }]
    }, {
        group: "Greenspace maps",
        layers: [
            {
                active: false,
                name: "OS Open Greenspace sites<br/><img src='//map.salford.gov.uk/geoserver/ows?service=WMS&amp;REQUEST=GetLegendGraphic&amp;VERSION=1.0.0&amp;FORMAT=image/png&amp;LEGEND_OPTIONS=fontName:Calibri;fontColor:0x555555;fontSize:13;fontAntiAliasing:true;forceTitles:off&amp;exceptions=json&amp;HEIGHT=20&amp;WIDTH=20&amp;RULE=&amp;LAYER=os_open_greenspace_site'>",
                layer: L.tileLayer.wms("https://map.salford.gov.uk/geoserver/ows?service=WMS", {
                    layers: 'os_open_greenspace_site',
                    format: 'image/png',
                    transparent: true
                })
            }, {
                active: false,
                name:
                    "Rights of way<br/><img src='//map.salford.gov.uk/geoserver/ows?service=WMS&amp;REQUEST=GetLegendGraphic&amp;VERSION=1.0.0&amp;FORMAT=image/png&amp;LEGEND_OPTIONS=fontName:Calibri;fontColor:0x555555;fontSize:13;fontAntiAliasing:true;forceTitles:off&amp;exceptions=json&amp;HEIGHT=20&amp;WIDTH=20&amp;SCALE=10&amp;LAYER=v_gm_rights_of_way&amp;STYLE=variable.line&amp;ENV=stroke-colour:FF6633;stroke-width1:1;stroke-width2:2;dash-down1:5;dash-up1:10;dash-down2:2;dash-up2:7'>",
                layer:
                    L.tileLayer.wms("https://map.salford.gov.uk/geoserver/ows?service=WMS", {
                        layers: 'NE_open:v_gm_rights_of_way',
                        format: 'image/png',
                        transparent: true
                    })
            }, {
                active: false,
                name:
                    "Sites of Biological Importance (SBI)<br/><img src='//map.salford.gov.uk/geoserver/ows?service=WMS&amp;REQUEST=GetLegendGraphic&amp;VERSION=1.0.0&amp;FORMAT=image/png&amp;LEGEND_OPTIONS=fontName:Calibri;fontColor:0x555555;fontSize:13;fontAntiAliasing:true;forceTitles:off&amp;exceptions=json&amp;HEIGHT=20&amp;WIDTH=20&amp;SCALE=10&amp;LAYER=gmeu_sbi'>",
                layer:
                    L.tileLayer.wms("https://map.salford.gov.uk/geoserver/ows?service=WMS", {
                        layers: 'NE_open:gmeu_sbi',
                        format: 'image/png',
                        transparent: true
                    })
            }
        ]
    }
];

var geocoder = new L.Control.geocoder({
    collapsed: false,
    //position: "topleft",
    geocoder: L.Control.Geocoder.nominatim({
        geocodingQueryParams: {
            countrycodes: 'gb',
            state: 'Greater Manchester'
            //'bolton, bury, manchester, oldham, rochdale, salford, stockport, tameside, trafford'
        }
    }),
    text: "Search"
});

geocoder.addTo(map);

L.control.scale({
    options: {
        position: 'bottomright',
        maxWidth: 100,
        metric: true,
        imperial: false,
        updateWhenIdle: false
    }
}).addTo(map);

var panelLayers = new L.Control.PanelLayers(baseLayers, ghiaLayers, {
    //compact: true,
    //collapsed: true,
    collapsibleGroups: true
});

map.addControl(panelLayers);

// zoomBox control
var zoomBox = L.control.zoomBox({
    modal: true // If false (default), it deactivates after each use.
});
map.addControl(zoomBox);

L.control.navbar().addTo(map);

// map icons
var icon0 = new L.Icon({iconUrl: 'css/leaflet/mapicons/marker-0.png'}),
    icon1 = new L.Icon({iconUrl: 'css/leaflet/mapicons/marker-1.png'}),
    icon2 = new L.Icon({iconUrl: 'css/leaflet/mapicons/marker-2.png'}),
    icon3 = new L.Icon({iconUrl: 'css/leaflet/mapicons/marker-3.png'}),
    icon4 = new L.Icon({iconUrl: 'css/leaflet/mapicons/marker-4.png'}),
    icon5 = new L.Icon({iconUrl: 'css/leaflet/mapicons/marker-5.png'}),
    icon6 = new L.Icon({iconUrl: 'css/leaflet/mapicons/marker-6.png'}),
    icon7 = new L.Icon({iconUrl: 'css/leaflet/mapicons/marker-7.png'}),
    icon8 = new L.Icon({iconUrl: 'css/leaflet/mapicons/marker-8.png'}),
    icon9 = new L.Icon({iconUrl: 'css/leaflet/mapicons/marker-9.png'});

// get the users postcode, create popup and populate with top/bottom two responses
var customLayer = L.geoJson(null, {
    onEachFeature: function (feature, layer, latlng) {
        var popup = '';
        if (feature.properties["form3"]) {
            var district;
            var LA = (feature.properties["form3"]);

            // different coloured icons for each district
            // also puts district name in popup
            switch (LA) {
                case "0":
                    district = "Bolton";
                    layer.setIcon(icon0);
                    break;
                case "1":
                    district = "Bury";
                    layer.setIcon(icon1);
                    break;
                case "2":
                    district = "Manchester";
                    layer.setIcon(icon2);
                    break;
                case "3":
                    district = "Oldham";
                    layer.setIcon(icon3);
                    break;
                case "4":
                    district = "Rochdale";
                    layer.setIcon(icon4);
                    break;
                case "5":
                    district = "Salford";
                    layer.setIcon(icon5);
                    break;
                case "6":
                    district = "Stockport";
                    layer.setIcon(icon6);
                    break;
                case "7":
                    district = "Tameside";
                    layer.setIcon(icon7);
                    break;
                case "8":
                    district = "Trafford";
                    layer.setIcon(icon8);
                    break;
                case "9":
                    district = "Wigan";
                    layer.setIcon(icon9);
                    break;
            }
            popup += '<div class="well"><table cellpadding="4px" cellspacing="4px"><th>District selected:&nbsp;' +
                district + '</th></tr>';
        }

        if (feature.properties["comment4"]) {
            var text1;
            var agree1 = (feature.properties["comment4"]);

            switch (agree1) {
                case "(s1) undefined":
                    text1 = "I need to get out of my home and be active in the natural world.";
                    break;
                case "(s2) undefined":
                    text1 = "I have no interest in activities outdoors: I would rather stay in.";
                    break;
                case "(s3) undefined":
                    text1 = "Working in green spaces gives me a sense of independence.";
                    break;
                case "(s4) undefined":
                    text1 = "Green spaces are open places where I can associate and participate in social life.";
                    break;
                case "(s5) undefined":
                    text1 = "Being outdoors can remind me that the world is a wonderful place.";
                    break;
                case "(s6) undefined":
                    text1 = "Growing things with others makes me part of a place and community.";
                    break;
                case "(s7) undefined":
                    text1 = "Uneven ground in green spaces and by trees in streets make it difficult for me to get around.";
                    break;
                case "(s8) undefined":
                    text1 = "I sometimes worry about crime in green spaces, and this can put me off using them.";
                    break;
                case "(s9) undefined":
                    text1 = "Green spaces conjure memories of forgotten childhood adventures.";
                    break;
                case "(s10) undefined":
                    text1 = "Green places evoke memories of people and events that have shaped who I am.";
                    break;
                case "(s11) undefined":
                    text1 = "Time active in nature can make me feel healthier and younger again.";
                    break;
                case "(s12) undefined":
                    text1 = "I often need to feel the fresh air or feel the weather - sunshine and wind.";
                    break;
                case "(s13) undefined":
                    text1 = "Green spaces offer rare moments of tranquillity and help erase the stress of modern life.";
                    break;
                case "(s14) undefined":
                    text1 = "I prefer the bustle of the city: being in nature can make me feel lonely.";
                    break;
            }
        }
        popup += '<tr><th>Top two agreeable statements:</th></tr>' +
            '<tr><td bgcolor="#00ff00">' + text1 + '</td></tr>';

        if (feature.properties["comment8"]) {
            var text2;
            var agree2 = (feature.properties["comment8"]);

            switch (agree2) {
                case "(s1) undefined":
                    text2 = "I need to get out of my home and be active in the natural world.";
                    break;
                case "(s2) undefined":
                    text2 = "I have no interest in activities outdoors: I would rather stay in.";
                    break;
                case "(s3) undefined":
                    text2 = "Working in green spaces gives me a sense of independence.";
                    break;
                case "(s4) undefined":
                    text2 = "Green spaces are open places where I can associate and participate in social life.";
                    break;
                case "(s5) undefined":
                    text2 = "Being outdoors can remind me that the world is a wonderful place.";
                    break;
                case "(s6) undefined":
                    text2 = "Growing things with others makes me part of a place and community.";
                    break;
                case "(s7) undefined":
                    text2 = "Uneven ground in green spaces and by trees in streets make it difficult for me to get around.";
                    break;
                case "(s8) undefined":
                    text2 = "I sometimes worry about crime in green spaces, and this can put me off using them.";
                    break;
                case "(s9) undefined":
                    text2 = "Green spaces conjure memories of forgotten childhood adventures.";
                    break;
                case "(s10) undefined":
                    text2 = "Green places evoke memories of people and events that have shaped who I am.";
                    break;
                case "(s11) undefined":
                    text2 = "Time active in nature can make me feel healthier and younger again.";
                    break;
                case "(s12) undefined":
                    text2 = "I often need to feel the fresh air or feel the weather - sunshine and wind.";
                    break;
                case "(s13) undefined":
                    text2 = "Green spaces offer rare moments of tranquillity and help erase the stress of modern life.";
                    break;
                case "(s14) undefined":
                    text2 = "I prefer the bustle of the city: being in nature can make me feel lonely.";
                    break;
            }
        }
        popup += '<tr style="border-top: thin solid"><td bgcolor="#00ff00">' + text2 + '</td></tr>';

        if (feature.properties["comment3"]) {
            var text3;
            var agree3 = (feature.properties["comment3"]);

            switch (agree3) {
                case "(s1) undefined":
                    text3 = "I need to get out of my home and be active in the natural world.";
                    break;
                case "(s2) undefined":
                    text3 = "I have no interest in activities outdoors: I would rather stay in.";
                    break;
                case "(s3) undefined":
                    text3 = "Working in green spaces gives me a sense of independence.";
                    break;
                case "(s4) undefined":
                    text3 = "Green spaces are open places where I can associate and participate in social life.";
                    break;
                case "(s5) undefined":
                    text3 = "Being outdoors can remind me that the world is a wonderful place.";
                    break;
                case "(s6) undefined":
                    text3 = "Growing things with others makes me part of a place and community.";
                    break;
                case "(s7) undefined":
                    text3 = "Uneven ground in green spaces and by trees in streets make it difficult for me to get around.";
                    break;
                case "(s8) undefined":
                    text3 = "I sometimes worry about crime in green spaces, and this can put me off using them.";
                    break;
                case "(s9) undefined":
                    text3 = "Green spaces conjure memories of forgotten childhood adventures.";
                    break;
                case "(s10) undefined":
                    text3 = "Green places evoke memories of people and events that have shaped who I am.";
                    break;
                case "(s11) undefined":
                    text3 = "Time active in nature can make me feel healthier and younger again.";
                    break;
                case "(s12) undefined":
                    text3 = "I often need to feel the fresh air or feel the weather - sunshine and wind.";
                    break;
                case "(s13) undefined":
                    text3 = "Green spaces offer rare moments of tranquillity and help erase the stress of modern life.";
                    break;
                case "(s14) undefined":
                    text3 = "I prefer the bustle of the city: being in nature can make me feel lonely.";
                    break;
            }
        }
        popup += '<tr><th>Top two disagreeable statements:</th></tr>' +
            '<tr><td bgcolor="#ff0000" style="color:#ffffff">' + text3 + '</td></tr>';

        if (feature.properties["comment2"]) {
            var text4;
            var agree4 = (feature.properties["comment2"]);

            switch (agree4) {
                case "(s1) undefined":
                    text4 = "I need to get out of my home and be active in the natural world.";
                    break;
                case "(s2) undefined":
                    text4 = "I have no interest in activities outdoors: I would rather stay in.";
                    break;
                case "(s3) undefined":
                    text4 = "Working in green spaces gives me a sense of independence.";
                    break;
                case "(s4) undefined":
                    text4 = "Green spaces are open places where I can associate and participate in social life.";
                    break;
                case "(s5) undefined":
                    text4 = "Being outdoors can remind me that the world is a wonderful place.";
                    break;
                case "(s6) undefined":
                    text4 = "Growing things with others makes me part of a place and community.";
                    break;
                case "(s7) undefined":
                    text4 = "Uneven ground in green spaces and by trees in streets make it difficult for me to get around.";
                    break;
                case "(s8) undefined":
                    text4 = "I sometimes worry about crime in green spaces, and this can put me off using them.";
                    break;
                case "(s9) undefined":
                    text4 = "Green spaces conjure memories of forgotten childhood adventures.";
                    break;
                case "(s10) undefined":
                    text4 = "Green places evoke memories of people and events that have shaped who I am.";
                    break;
                case "(s11) undefined":
                    text4 = "Time active in nature can make me feel healthier and younger again.";
                    break;
                case "(s12) undefined":
                    text4 = "I often need to feel the fresh air or feel the weather - sunshine and wind.";
                    break;
                case "(s13) undefined":
                    text4 = "Green spaces offer rare moments of tranquillity and help erase the stress of modern life.";
                    break;
                case "(s14) undefined":
                    text4 = "I prefer the bustle of the city: being in nature can make me feel lonely.";
                    break;
            }
        }
        popup += '<tr style="border-top: thin solid"><td bgcolor="#ff0000" style="color:#ffffff">' + text4 + '</td></tr>';

        // put date / time in popup
        if (feature.properties["datetime"]) {
            popup += '<tr><th>Date submitted:&nbsp;' + feature.properties["datetime"] + '</th></tr></table></div>';
        }
        layer.bindPopup(popup);
        //layer.bindPopup(feature.properties.Title);
    }
});

// read user responses from Q-method csv file
var userLayer = omnivore.csv('data/GHIA_1_0.csv', null, customLayer, {delimiter: ';'})
    .on('ready', function () {
        // cluster the markers
        var markers = L.markerClusterGroup();
        markers.addLayer(userLayer);
        markers.addTo(map);
        // http://leafletjs.com/reference.html#map-fitbounds
        //map.fitBounds(userLayer.getBounds())
    }) //.addTo(map)
    .on('error', function (error) {
        console.log(error);
    });
