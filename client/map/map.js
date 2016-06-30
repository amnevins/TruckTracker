Template.map.onCreated(function() {

    var instance = this;
    instance.IceCream = new ReactiveVar(false);


    instance.autorun(function() {

        var truckSubs = instance.subscribe('truck_markers');

    });

    instance.findTruck = function() {
        return TruckMarkers.find({});
    };


});

Template.map.onRendered(function () {
    Meteor.setTimeout(function() {
    geolocateUser();
    },300);
});

Template.map.events({

   'click .iceCreamRequest': function(e) {
       e.preventDefault();
       Template.instance().IceCream.set(true);
       var lat1 = Session.get("UserLat");
       var lon2 = Session.get("UserLon");
       AddCustomerMarker(lat1, lon2);
   },

    'click .iceCreamWaiting': function(e) {
        e.preventDefault();
        sAlert.info("An Ice Cream Truck has added your neighborhood to it's route!")
    },
    'click .iceCreamFind': function(e, t) {
        e.preventDefault();
        console.log("started");
        var lat1 = Session.get("UserLat");
        var lon2 = Session.get("UserLon");
        var truckMarkers = t.findTruck();
        var truckArray = [];
        truckMarkers.forEach(function(doc) {
            var distanceArrUser = [];
            distanceArrUser.push(lon2);
            distanceArrUser.push(lat1);
            var distanceArrTruck = [];
            distanceArrTruck.push(doc.longitude);
            distanceArrTruck.push(doc.latitude);
            var distance = haversineDistance(distanceArrUser, distanceArrTruck, true);
            console.log("distance is " + distance);
            var truck = {
                latitude: doc.latitude,
                longitude: doc.longitude,
                distance: distance
            }
            truckArray.push(truck);
        });
        console.log(truckArray);
        var truckArray2 = truckArray.sort(function(a, b) {
           return a.distance - b.distance;
        });
        console.log(truckArray2);
        var truckLon = truckArray2[0].longitude;
        var truckLat = truckArray2[0].latitude;
        var userLoc = new google.maps.LatLng(lat1, lon2);
        var myLatLon = new google.maps.LatLng(truckLat, truckLon);
        console.log(myLatLon);
            var mapOptions = {
                zoom: 13,
                center: myLatLon,
                panControl: true,
                zoomControl: true,
                scaleControl: true
            };

            var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
        var marker = new google.maps.Marker({
            position: userLoc,
            animation: google.maps.Animation.DROP,
            icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
        });

        marker.setMap(map);
        marker.addListener('click', function () {
            sAlert.info('<br><a href="#" class="mapClick">This is where Ice Cream trucks can find you!</a>', {html: true});
        });
            //var map = document.getElementById('map-canvas');
        truckArray2.forEach(function(doc) {
            console.log(doc.latitude);
            var lat = doc.latitude;
            var lon = doc.longitude;
            var myLatLng = new google.maps.LatLng(lat, lon);
            var marker = new google.maps.Marker({
                position: myLatLng,
                animation: google.maps.Animation.DROP,
                icon: '/ttMapMarker.png'
            });

            marker.setMap(map);
            marker.addListener('click', function () {
                sAlert.info('<br><a href="#" class="mapClick">This Ice Cream Truck is aware that you would like Ice Cream!</a>', {html: true});
            });
            console.log('added');
        });
    }

});

Template.map.helpers({

   iceCream: function() {
       var check =  Template.instance().IceCream.get();
       return check === true;
   }

});

function AddCustomerMarker(lat, lon) {
    Meteor.call('AddCustomerMarker', lat, lon, function(err, res) {
        if(err){
            console.log(err);
        }
        if(res) {
            console.log(res);
        }
    });
}

function createMap(lat, lon) {
    //var lat = 47.609774;
    //var lon = -122.258256;
    var myLatLng = new google.maps.LatLng(lat, lon);

    Session.set("UserLat", lat);
    Session.set("UserLon", lon);


    var mapOptions = {
        zoom: 14,
        center: myLatLng,
        panControl: true,
        zoomControl: true,
        scaleControl: true
    };

    var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

    var marker = new google.maps.Marker({
        position: myLatLng,
        animation: google.maps.Animation.DROP,
        icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
    });

    marker.setMap(map);
    marker.addListener('click', function () {
        sAlert.info('<br><a href="#" class="mapClick">An Ice Cream Truck will add your neighborhood to its route!  </a>', {html: true});
    });

}

function geolocateUser() {
    console.log("running geo function");
    // If the browser supports the Geolocation API
    if (navigator.geolocation) {
        console.log("I AM RUNNING THE ROUTE");
        var positionOptions = {
            enableHighAccuracy: false,
            timeout: 20000
        };
        navigator.geolocation.getCurrentPosition(geolocationSuccess, geolocationError, positionOptions);
    }
    else {
        console.log("CRAPCRAPCRAP");
        //sAlert.warning('Enable Geolocation on your device to obtain accurate distances!');
        var lat = 47.609774;
        var lon = -122.258256;
        createMap(lat, lon);
    }

}
function geolocationError(positionError) {
    console.log("error path");
    var lat = 47.609774;
    var lon = -122.258256;
    //sAlert.warning('Enable Geolocation on your device to obtain accurate distances!');
    createMap(lat, lon);
}
function geolocationSuccess(position) {
    console.log("success path");
    var userLatLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    var userLat = position.coords.latitude;
    var userLong = position.coords.longitude;
    createMap(userLat, userLong);
}
function haversineDistance(coords1, coords2, isMiles) {
    function toRad(x) {
        return x * Math.PI / 180;
    }

    var lon1 = coords1[0];
    var lat1 = coords1[1];

    var lon2 = coords2[0];
    var lat2 = coords2[1];

    var R = 6371; // km

    var x1 = lat2 - lat1;
    var dLat = toRad(x1);
    var x2 = lon2 - lon1;
    var dLon = toRad(x2);
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;

    if (isMiles) d /= 1.60934;

    console.log(d + " " + "miles");
    return d;
}

