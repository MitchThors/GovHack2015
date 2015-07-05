//$(document).ready(
//    //applySpinner()
//);

//function applySpinner() {
//        $("#processingOverlay").fadeIn();
//        var opts = {
//            lines: 12, // The number of lines to draw
//            length: 7, // The length of each line
//            width: 4, // The line thickness
//            radius: 10, // The radius of the inner circle
//            color: '#000', // #rgb or #rrggbb
//            speed: 1, // Rounds per second
//            trail: 60, // Afterglow percentage
//            shadow: false, // Whether to render a shadow
//            hwaccel: false // Whether to use hardware acceleration
//        };
//        var target = document.getElementById('processingOverlay');
//        var spinner = new Spinner(opts).spin(target);
//}

//function removeSpinner() {
//    $('#processingOverlay').data('spinner').stop();
//}



var map;
var ibs = [];
var pos;
var endPos;
var directionsDisplay = new google.maps.DirectionsRenderer();
var directionsService = new google.maps.DirectionsService();

var closeInfoBox = function () {
    for (var i in ibs) {
        ibs[i].close();
    }
}

function initialize() {
    var mapOptions = {
        zoom: 15
    };

    map = new google.maps.Map(document.getElementById('map-canvas'),
        mapOptions);
    
    // Try HTML5 geolocation
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            pos = new google.maps.LatLng(position.coords.latitude,
                                             position.coords.longitude);

            
            //var infowindow = new google.maps.InfoWindow({
            //    map: map,
            //    position: pos,
            //    content: 'You are here!'
            //});

            var image = {
                url: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAKT2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AUkSYqIQkQSoghodkVUcERRUUEG8igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xuja9a89+bN/rXXPues852zzwfACAyWSDNRNYAMqUIeEeCDx8TG4eQuQIEKJHAAEAizZCFz/SMBAPh+PDwrIsAHvgABeNMLCADATZvAMByH/w/qQplcAYCEAcB0kThLCIAUAEB6jkKmAEBGAYCdmCZTAKAEAGDLY2LjAFAtAGAnf+bTAICd+Jl7AQBblCEVAaCRACATZYhEAGg7AKzPVopFAFgwABRmS8Q5ANgtADBJV2ZIALC3AMDOEAuyAAgMADBRiIUpAAR7AGDIIyN4AISZABRG8lc88SuuEOcqAAB4mbI8uSQ5RYFbCC1xB1dXLh4ozkkXKxQ2YQJhmkAuwnmZGTKBNA/g88wAAKCRFRHgg/P9eM4Ors7ONo62Dl8t6r8G/yJiYuP+5c+rcEAAAOF0ftH+LC+zGoA7BoBt/qIl7gRoXgugdfeLZrIPQLUAoOnaV/Nw+H48PEWhkLnZ2eXk5NhKxEJbYcpXff5nwl/AV/1s+X48/Pf14L7iJIEyXYFHBPjgwsz0TKUcz5IJhGLc5o9H/LcL//wd0yLESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v9k4t8s+wM+3zUAsGo+AXuRLahdYwP2SycQWHTA4vcAAPK7b8HUKAgDgGiD4c93/+8//UegJQCAZkmScQAAXkQkLlTKsz/HCAAARKCBKrBBG/TBGCzABhzBBdzBC/xgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKmAv1EAdNMBRaIaTcA4uwlW4Dj1wD/phCJ7BKLyBCQRByAgTYSHaiAFiilgjjggXmYX4IcFIBBKLJCDJiBRRIkuRNUgxUopUIFVIHfI9cgI5h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3GoRGogvQZHQxmo8WoJvQcrQaPYw2oefQq2gP2o8+Q8cwwOgYBzPEbDAuxsNCsTgsCZNjy7EirAyrxhqwVqwDu4n1Y8+xdwQSgUXACTYEd0IgYR5BSFhMWE7YSKggHCQ0EdoJNwkDhFHCJyKTqEu0JroR+cQYYjIxh1hILCPWEo8TLxB7iEPENyQSiUMyJ7mQAkmxpFTSEtJG0m5SI+ksqZs0SBojk8naZGuyBzmULCAryIXkneTD5DPkG+Qh8lsKnWJAcaT4U+IoUspqShnlEOU05QZlmDJBVaOaUt2ooVQRNY9aQq2htlKvUYeoEzR1mjnNgxZJS6WtopXTGmgXaPdpr+h0uhHdlR5Ol9BX0svpR+iX6AP0dwwNhhWDx4hnKBmbGAcYZxl3GK+YTKYZ04sZx1QwNzHrmOeZD5lvVVgqtip8FZHKCpVKlSaVGyovVKmqpqreqgtV81XLVI+pXlN9rkZVM1PjqQnUlqtVqp1Q61MbU2epO6iHqmeob1Q/pH5Z/YkGWcNMw09DpFGgsV/jvMYgC2MZs3gsIWsNq4Z1gTXEJrHN2Xx2KruY/R27iz2qqaE5QzNKM1ezUvOUZj8H45hx+Jx0TgnnKKeX836K3hTvKeIpG6Y0TLkxZVxrqpaXllirSKtRq0frvTau7aedpr1Fu1n7gQ5Bx0onXCdHZ4/OBZ3nU9lT3acKpxZNPTr1ri6qa6UbobtEd79up+6Ynr5egJ5Mb6feeb3n+hx9L/1U/W36p/VHDFgGswwkBtsMzhg8xTVxbzwdL8fb8VFDXcNAQ6VhlWGX4YSRudE8o9VGjUYPjGnGXOMk423GbcajJgYmISZLTepN7ppSTbmmKaY7TDtMx83MzaLN1pk1mz0x1zLnm+eb15vft2BaeFostqi2uGVJsuRaplnutrxuhVo5WaVYVVpds0atna0l1rutu6cRp7lOk06rntZnw7Dxtsm2qbcZsOXYBtuutm22fWFnYhdnt8Wuw+6TvZN9un2N/T0HDYfZDqsdWh1+c7RyFDpWOt6azpzuP33F9JbpL2dYzxDP2DPjthPLKcRpnVOb00dnF2e5c4PziIuJS4LLLpc+Lpsbxt3IveRKdPVxXeF60vWdm7Obwu2o26/uNu5p7ofcn8w0nymeWTNz0MPIQ+BR5dE/C5+VMGvfrH5PQ0+BZ7XnIy9jL5FXrdewt6V3qvdh7xc+9j5yn+M+4zw33jLeWV/MN8C3yLfLT8Nvnl+F30N/I/9k/3r/0QCngCUBZwOJgUGBWwL7+Hp8Ib+OPzrbZfay2e1BjKC5QRVBj4KtguXBrSFoyOyQrSH355jOkc5pDoVQfujW0Adh5mGLw34MJ4WHhVeGP45wiFga0TGXNXfR3ENz30T6RJZE3ptnMU85ry1KNSo+qi5qPNo3ujS6P8YuZlnM1VidWElsSxw5LiquNm5svt/87fOH4p3iC+N7F5gvyF1weaHOwvSFpxapLhIsOpZATIhOOJTwQRAqqBaMJfITdyWOCnnCHcJnIi/RNtGI2ENcKh5O8kgqTXqS7JG8NXkkxTOlLOW5hCepkLxMDUzdmzqeFpp2IG0yPTq9MYOSkZBxQqohTZO2Z+pn5mZ2y6xlhbL+xW6Lty8elQfJa7OQrAVZLQq2QqboVFoo1yoHsmdlV2a/zYnKOZarnivN7cyzytuQN5zvn//tEsIS4ZK2pYZLVy0dWOa9rGo5sjxxedsK4xUFK4ZWBqw8uIq2Km3VT6vtV5eufr0mek1rgV7ByoLBtQFr6wtVCuWFfevc1+1dT1gvWd+1YfqGnRs+FYmKrhTbF5cVf9go3HjlG4dvyr+Z3JS0qavEuWTPZtJm6ebeLZ5bDpaql+aXDm4N2dq0Dd9WtO319kXbL5fNKNu7g7ZDuaO/PLi8ZafJzs07P1SkVPRU+lQ27tLdtWHX+G7R7ht7vPY07NXbW7z3/T7JvttVAVVN1WbVZftJ+7P3P66Jqun4lvttXa1ObXHtxwPSA/0HIw6217nU1R3SPVRSj9Yr60cOxx++/p3vdy0NNg1VjZzG4iNwRHnk6fcJ3/ceDTradox7rOEH0x92HWcdL2pCmvKaRptTmvtbYlu6T8w+0dbq3nr8R9sfD5w0PFl5SvNUyWna6YLTk2fyz4ydlZ19fi753GDborZ752PO32oPb++6EHTh0kX/i+c7vDvOXPK4dPKy2+UTV7hXmq86X23qdOo8/pPTT8e7nLuarrlca7nuer21e2b36RueN87d9L158Rb/1tWeOT3dvfN6b/fF9/XfFt1+cif9zsu72Xcn7q28T7xf9EDtQdlD3YfVP1v+3Njv3H9qwHeg89HcR/cGhYPP/pH1jw9DBY+Zj8uGDYbrnjg+OTniP3L96fynQ89kzyaeF/6i/suuFxYvfvjV69fO0ZjRoZfyl5O/bXyl/erA6xmv28bCxh6+yXgzMV70VvvtwXfcdx3vo98PT+R8IH8o/2j5sfVT0Kf7kxmTk/8EA5jz/GMzLdsAAAAgY0hSTQAAeiUAAICDAAD5/wAAgOkAAHUwAADqYAAAOpgAABdvkl/FRgAAC/hJREFUeNq8mXmQXNV1xn/nvtfdMz27NCPNiJFkCAiwA1lcjlyobAiFi8JUOXbKFRf5J6nIheOUlziuxDEYjF1sToXNEgi7bJY4si3HMshgIHKJVACxOA4yQkbSWBLaGc1Io1l6tu53z8kf73XP60Ga6ZFGuVWnbq/vne9+53z33PPEzJhp/NPB0rs+E8BJeZZ4BjwwqmBmy5oCWVXveG8gdGCIh+Njxu6hyLZisjcfQCiGGShgBgaoGrP5NH3cc36OkLMcAkwojCvt7RlueX9ebri43nW0BlL1O0t+O+yNngkb3D3BU70lu7lO7FDeCf5s/ThTRgKJnRvy0tGV4aFVTe6TizNgCKNqHCpCwYNiCQihwcHSLDQ6CEU4VjJeGPHPHC7ajS1OjoQOIv//yIgARYNx5c8/2Cgb/6TBMaLG1oJxuGiUzMg6IZuEnwFqxqTBr8eMAOgM4f0NAZ9aEH5025g//OKwfSGENXUC3ubuU3gmICYNIrjluhb3zaU5YfOw5+1JaAqE5iBe7SDJnTISBbwZkQmRQV9k/PiEZ3kOrm52tIf27V8M6u8XvH0mn7A9l+HOhAlvPHBti/umiLD+uHKkCIszZRAQOiF0kHWQFci45HORZI5Bd2bhWAke6/cMRHB9a3BjnZP1YwklVqPNGYg3KBl/96Em+cKoh+cGlayD1iBWMScQJM5mRcg4iUPMCRmJ88qJVBRPgOYgBrVl2HOwaKxqdn+J2U2lyDBfm9UERNUqNuZtxYo6ebBosLWgNIeQc0BKgp3EcyAxGzkXAwsSAI4pEOX8CQUWhsKvCsqQF96XD+4Y9fpBLE782WxOQCa90hrw3cZA+PWYUe+SBLN3h58YhKHQ3CosbIW2NqGhTQhCoSJIUjVV2NlW8GSc0JWR+0cjj1ed1WpKdk1+qMaVC0O58uBkvHOFUh2jJJuaitDWLmSB48cmmRg4QaRG0LKAhd315BGOHVds0iCV1EY59ODgpNIUysq+ST5rauvmRbVUDTXIB3LLhBpDGodTGoSaoSa4nKNjobD3zQM8fetX2PPai5QmJjBTMnV1LPujlVz7tW9x4RUXc3zIKA57cNVgcgInikYmMNoC/uJkydaFMg+q5dXwZvkAWzniLY5rmwJSLi8kdCxYKDy39hFuvfw9vPTkBsb7+wiiiEA9kyf6+Z9nN3HHqkt44ua7aW4RMo0hGpc0MZjkuhkxkntdpap/HC/U6a0mRrwaTrhaTRojNVwQ79NG2QHBG7QtErZ851Ee//xqOhrytC7uwlQRkYotdo6R/j423flVLAPX3PbPjI06zHyFEbV4dce9EagRwrWm9vpZMyJql4va1ZNqeI13trSGe4P6RSGHftfHU1/6PJ35PG2dS1Dv37WpCdDWtYQLzjuPLd/4Kru2vEpTt6ti2DQuJM2MKC4gl/uUcp7KagJi2PvU7LIoAaGmseSVq1YRMjn477u+Tml8lOauJUSlEuIcgXM453BBgAQBIoKq0ti2gAbgrQ3rEwmO1cySytc0Xi0zUKN7XkLL1BYZtIuLk1oURAxJqkZXFzBw1Dj22ss0NTYQRRFBECDOxSW+c5XQIplVlQVLu+l/5QX69hTItTUyWShOrbIZNjUvNbUpnT7T0FKzjJplVJXYpii1ZCkmCsOYLxFkcwTOxSCSOf3apSzT0EQ0NEDhyEFcfXm/iq9vmihhLDQZZR4YUbVRgTETw8RQsZgRFMFV1ztOqh2fxog4lxSSgpoSZjKIc3ifriDiBbPyYqlNUFa1s9lHTG2/wX4R+4CIgWjCsgOU0gRkW1oI6+oZK07GIEQqIMrvq0IMKI2P0dzVTWP3+UwMg/dlNqoBqepRm4/qV822qdlr5XJAfaxe3iveK5Njk9QvhvOvuobx4QIuDCsOnyqknHOE2SzF/l66PvwR6pfnKBbGUG9ocs1pKtU7L0WjqfWa2vPxjZKV8prc1NDIM9gHK//xVhYvX87gkYMEScikQ8o5RxAEZDJZSoVhWhd1cv4nbmBkkPha5YXSGJBqfH3zdsQSpk5ntQGJK8xtqtpbvnh80xiUV2Wsv0DU1cDH7luHDRc4fngKjEuYcc6RyWYZHTxB8eghrvzGPdRffiGjR0emnPdWCTGvFeV6oxb5nUsZ/wtfYWQqDNQrgnF01yjNf3YdX9z0Sy7o6mT/9m30HT7EyOBJCkODnOw7xtHdb7GktYUbHv4hTR//BO/sG0csCacqEIpGhvf6jhk/t2RPOZ3VplpTB+gHzHT1VHkiFRMRApSdvy3w3uuv4W//cCs7vvcQx/ftZPDkICbQsWgx7Res4IJPraZ32SL2/m6UXFTEI5W9Y4qZJGzVngCieemi3PBib/rtS865VUEgSFBWpvQMoyVo7GjiA90BXRNQHJrAeyVoyXMsB9ve8Yz0j9AQxlV11QbopxTLe8WMVcDLMx2+ReAnV3XVIL9VOO0r3utLmCAmmHOIGSaCqKAi1DsonRhmcz+4MENDXQ6RkNETBXypRN5BfdL2qQCokt0kxMzWyilAmCmYo3FJB2FDltL4HM4jqbEV9Fkzuc6ZYM4Q5zAxxCXlR9I6aRCwqEg0UgQgV67cFEpmU7VVGYhVASkC/zJddJCApqVLyTTB/mf+i32bvs/kQD9s/c/aT4ip8WWw68ziqlVUUaECJCmp4lpXUiemGEZSPceALF1TpYCY2j8IcsiSkDCDhu4usk0hh7a8wM7HvsWRF5+Z+wlx2tgJ3GHqb7bAJY7HoVV+nVQhqeLdKoemeE56vhrLTrpIVLUnBR40FPNKfUcn+a56Djy7he1rv8bx7a+eWbJ/fPPB0ySPbBfHZc5J6vA0lYAz70tJ0y7VCUmYGAIuMfW9YV2exmWdjBw4yhtrbmL/zx+f8Zpnwkj5359Gec1SQEgzkm6RVInG1MGpEl4Wyy7O/U2utb23rr0BX4Q3H76XN+798vy0TE8LBH5lZt9VkxvTjFRYSQOxVLfFDC3HvoKpombUdy59KMhlfja4awcHnnuFnh/cw8j+3fPXjf/oU/tmOD0CxgERWSYudr8SVuXeL9UgynmiyUlQwgz5JcveHNjxv3+w+9G77OjzG+fcwK4ptPxMrXEBM/t7kJ85TTlfESypPjSn2IlPfUK+cxlvrrnlxp5Hbj+DHvycQktn+8kTZvZLFT5SzQinYGRqBTWKaLroUt7e+Mi/9jxy+6vV/cc5N+NnD60//UlNcbrCYLeQ7CezVApmStjYRjQ5fuzlT6+8sDjQVwDqym2y1DwbIJtDaGktQHqA7wOr8dVsnKrcMR/R2LmY7Xd+7qYERGtSHJZBTLeZnnTEm8FsjFz145qVownsbTMWVvLhXXcUzJR853KGe15/5ZXPfvgKoBHIppw+HRidIdltVkbqmttqBTIizt0XjRVu98VJcG6KAqkIMhCQb2ngNz+4+7bkg2agVH5YnDgs06z80FhPEW5WW8t0+OQcdFDvyLa1/1Uk7iKLStOObYJ5T8vvXcSBp9dvOPbyM5uB7sS5YAYQknoorNOYs5pV64XPXFEzjuLwAJeuvu3eyz739XVDe/YiLqjudOTqEA/7/mPNmsSxbJIbOgMT5e/KrJS/82kgs+aIiMxVCLl+45636jq6Lx0//k7l/+aVthXv4a1H7//2tvu+9EXg4iSkpivVqXKjHFZR6nUlb8xsbs8Qa4wvdv3bXXfWt2QJXFCxuuZWiicK1vOj+x8F2pNVDRMLUnM5zMorWAZSSoCkwZzZU91ax95N3/v3oZ07f9Pc1V15btjS3cqejWsfGO09sCPJjSAFIEw5X175IjCR2GTyvnSahD83QAB6frr27vpGCFyGXL4JP6zse/rxJ4HOaWy4xLEocXoMGE1sPAFRmmU/OXdAdv/0oQ0nd/W83ty5iJbzmunZuO6xof27tidslO8bJc6OAMPAUPJ6LGHA11qunDMgAL9df+/tDW3gFN7evP5poCVZ2WKy4oPAQDIPJ6Cic1JrzV21qsdfP9+/f3zghG745CUfAhYlAAqJTaTk98zlpZZa62zHjh89/GA0MVoH9CURMJgAKM3nfc41IxJkc1kRl48mx6NU4tp8gjAz/m8AohVn/IRWz9QAAAAASUVORK5CYII=",
                size: new google.maps.Size(50, 50)
                //scaledSize: new google.maps.Size(50, 50),
                //origin: new google.maps.Point(0, 0)
            };

            var marker = new google.maps.Marker({
                position: pos,
                map: map,
                icon: image
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
                
                endPos = latLng;
                var image = {
                    url: "data:image/png;base64," + json[i].Icon + "",
                    size: new google.maps.Size(50, 50),
                    //scaledSize: new google.maps.Size(50, 50),
                    //origin: new google.maps.Point(0, 0)
                };

                var marker = new google.maps.Marker({
                    position: latLng,
                    map: map,
                    icon: image,
                    content: json[i].Content
                });

                marker.setTitle(json[i].Title);
                var ibIndex = ibs.push(new google.maps.InfoWindow({
                    map: map
                })) - 1, ib = ibs[ibIndex];

                google.maps.event.addListener(marker, "click", function (evt) {
                    closeInfoBox();
  
                    ib.setPosition(marker.position);

                    ib.setContent(this.get('content') +
                        "<br/><a href=\"#\" onClick=displayRouteDriving(" + this.get('position').A + "," + this.get('position').F + ")>Click Here for Driving directions</a>" +
                        "<br/><a href=\"#\" onClick=displayRouteWalking(" + this.get('position').A + "," + this.get('position').F + ")>Click Here for Walking directions</a>");
                    ib.open(map, this);


                });
                closeInfoBox();
            }
            document.getElementsByClassName('loading')[0].style.visibility = 'hidden';
            //alert("Loaded");
            //removeSpinner();

            // call direction routing
            //displayRoute(endPos);
            //
        } else {
            //TODO display proper error
            document.getElementsByClassName('loading')[0].style.visibility = 'hidden';
            alert('There was a problem with the request.');

        }
    }
}

function displayRouteDriving(lat, lon) {


    // also, constructor can get "DirectionsRendererOptions" object
    //directionsDisplay.setDirections({routes: []}); // map should be already initialized.
    directionsDisplay.setMap(map); // map should be already initialized.


    var request = {
        origin: pos,
        destination: new google.maps.LatLng(lat, lon),
        travelMode: google.maps.TravelMode.DRIVING
    };

    directionsService.route(request, function (response, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            alert(response);
            directionsDisplay.setDirections(response);
        }
    });

    closeInfoBox();
}

function displayRouteWalking(lat, lon) {

    
   // also, constructor can get "DirectionsRendererOptions" object
    //directionsDisplay.setDirections({routes: []}); // map should be already initialized.
    directionsDisplay.setMap(map); // map should be already initialized.


    var request = {
        origin: pos,
        destination: new google.maps.LatLng(lat,lon),
        travelMode: google.maps.TravelMode.WALKING
    };
    
    directionsService.route(request, function (response, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(response);
            var step = 1;
            var infowindow2 = new google.maps.InfoWindow();
            infowindow2.setContent(response.routes[0].legs[0].steps[step].distance.text + "<br>" + response.routes[0].legs[0].steps[step].duration.text + " ");
            infowindow2.setPosition(response.routes[0].legs[0].steps[step].end_location);
            infowindow2.open(map);
        }
    });

    closeInfoBox();
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