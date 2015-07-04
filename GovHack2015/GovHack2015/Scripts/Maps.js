var map;
var ibs = [];

var closeInfoBox = function () {
    for (var i in ibs) {
        ibs[i].close();
    }
}

function initialize() {


    var mapOptions = {
        zoom: 18
    };

    map = new google.maps.Map(document.getElementById('map-canvas'),
        mapOptions);
    
    // Try HTML5 geolocation
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var pos = new google.maps.LatLng(position.coords.latitude,
                                             position.coords.longitude);

            var infowindow = new google.maps.InfoWindow({
                map: map,
                position: pos,
                content: 'You are here!'
            });
            GetMarkers(position.coords.latitude, position.coords.longitude);
            map.setCenter(pos);
        }, function () {
            handleNoGeolocation(true);
        });
    } else {
        // Browser doesn't support Geolocation
        handleNoGeolocation(false);
    }
}

function GetMarkers(latitude, longitude) {
    var hr = window.location.href.substr(0, window.location.href.search(window.location.pathname.substr(0)));
    makeRequest(hr + "/Map/GetMarkers?latitude=" + latitude + "&longitude=" + longitude);
}

function makeRequest(url) {
    if (window.XMLHttpRequest) { // Mozilla, Safari, ...
        httpRequest = new XMLHttpRequest();
    } else if (window.ActiveXObject) { // IE
        try {
            httpRequest = new ActiveXObject("Msxml2.XMLHTTP");
        }
        catch (e) {
            try {
                httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
            }
            catch (e) { }
        }
    }

    if (!httpRequest) {
        alert('Giving up :( Cannot create an XMLHTTP instance');
        return false;
    }
    httpRequest.onreadystatechange = alertContents;
    httpRequest.open('GET', url);
    httpRequest.send();
}

function alertContents() {
    if (httpRequest.readyState === 4) {
        if (httpRequest.status === 200) {
            var json = JSON.parse(httpRequest.responseText);

            for (i = 0; i < json.length; i++) {
                var latLng = new google.maps.LatLng(json[i].Lat, json[i].Lon);
                var marker = new google.maps.Marker({
                    position: latLng,
                    map: map
                });
                marker.setTitle(json[i].Title);
                var ibIndex = ibs.push(new google.maps.InfoWindow({
                    map: map
                })) - 1, ib = ibs[ibIndex];

                google.maps.event.addListener(marker, "click", function (evt) {
                    closeInfoBox();
  
                    ib.setPosition(marker.position);
                    ib.setContent(this.get('title'));
                    ib.open(map, this);
                });
            }
            alert("Loaded");
        } else {
            //TODO display proper error
            alert('There was a problem with the request.');
        }
    }
}


function handleNoGeolocation(errorFlag) {
    if (errorFlag) {
        var content = 'Error: The Geolocation service failed.';
    } else {
        var content = 'Error: Your browser doesn\'t support geolocation.';
    }

    var options = {
        map: map,
        position: new google.maps.LatLng(60, 105),
        content: content
    };

    var infowindow = new google.maps.InfoWindow(options);
    map.setCenter(options.position);
}

google.maps.event.addDomListener(window, 'load', initialize);