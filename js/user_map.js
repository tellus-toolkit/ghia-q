/*	Main set-up file for map layers and layout of the mapping tool
Richard Kingston, TellUs Toolkit Ltd.
www.tellus-toolkit.com
April 2019  */

var map = L.map('map-canvas', {
    measureControl: true,
    zoomControl: true
    //maxZoom: 19,
    //minZoom: 7
//}).setView([53.5054695, -2.31836245], 10); // center of GM
}).setView([lng, lat], 10); // center of users postcode

function addr_search() {
    var inp = document.getElementById("addr");
    var xmlhttp = new XMLHttpRequest();
    var url = "https://nominatim.openstreetmap.org/search?format=json&limit=3&q=" + inp.value;
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var myArr = JSON.parse(this.responseText);
            myFunction(myArr);
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

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
            state: 'Greater Manchester'//'bolton, bury, manchester, oldham, rochdale, salford, stockport, tameside, trafford'
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
