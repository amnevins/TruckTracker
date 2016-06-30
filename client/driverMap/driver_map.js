Template.driverMap.onCreated(function() {

    var instance = this;
    var userId = Meteor.userId();

    instance.autorun(function() {

        var truckSubs = instance.subscribe('latest_truck_markers');
        var myTruck = instance.subscribe('my_truck');
        var customerMark = instance.subscribe('customer_markers');

    });

    instance.findCustomer = function() {
        return CustomerMarkers.find({});
    }
});


Template.driverMap.onRendered(function () {
    Meteor.setTimeout(function() {
        geolocateUser();
    },300);
});

Template.driverMap.events({

    'click .refreshMap': function(e) {
        e.preventDefault();
        geolocateUser();
    },
    'click .iceCreamFind': function(e, t) {
        e.preventDefault();
        console.log("started");
        var lat1 = Session.get("UserLat");
        var lon2 = Session.get("UserLon");
        var customerMarkers = t.findCustomer();
        var customerArray = [];
        customerMarkers.forEach(function(doc) {
            var distanceArrUser = [];
            distanceArrUser.push(lon2);
            distanceArrUser.push(lat1);
            var distanceArrTruck = [];
            distanceArrTruck.push(doc.longitude);
            distanceArrTruck.push(doc.latitude);
            var distance = haversineDistance(distanceArrUser, distanceArrTruck, true);
            console.log("distance is " + distance);
            var customer = {
                latitude: doc.latitude,
                longitude: doc.longitude,
                distance: distance
            }
            customerArray.push(customer);
        });

        var truckArray2 = customerArray.sort(function(a, b) {
            return a.distance - b.distance;
        });

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
            icon: '/ttMapMarker.png'
        });

        marker.setMap(map);
        marker.addListener('click', function () {
            sAlert.info('<br><a href="#" class="mapClick">This is an Ice Cream Truck!</a>', {html: true});
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
                icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
            });

            marker.setMap(map);
            marker.addListener('click', function () {
                sAlert.info('<br><a href="#" class="mapClick">This is a customer who would like Ice Cream!</a>', {html: true});
            });
            console.log('added');
        });
    }

});

Template.driverMap.helpers({



});

function AddTruckMarker(lat, lon) {
    Meteor.call('AddTruckMarkers', lat, lon, function(err, res) {
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
    var date = new Date();
    var allCustomers = CustomerMarkers.find({});
    var ONE_HOUR = 60 * 60 * 1000;
    var recentCustomers = [];
    allCustomers.forEach(function(doc) {
        if(date - doc.date < ONE_HOUR){
            recentCustomers.push(doc);
        }
    });

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
        icon: '/ttMapMarker.png'
    });

    marker.setMap(map);
    marker.addListener('click', function () {
        sAlert.info('<br><a href="#" class="mapClick">This is an Ice Cream Truck!</a>', {html: true});
    });

        recentCustomers.forEach(function(doc) {
            var lat1 = doc.latitude;
            var lon1 = doc.longitude;
            var myLatLon = new google.maps.LatLng(lat1, lon1);
            var marker2 = new google.maps.Marker({
                position: myLatLon,
                animation: google.maps.Animation.DROP,
                icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
            });

            marker2.setMap(map);
            marker2.addListener('click', function () {
                sAlert.info('<br><a href="#" class="mapClick2">Here is a customer who would like to buy ice cream!</a>', {html: true});
            });
        });
    AddTruckMarker(lat, lon);
}

function geolocateUser() {
    console.log("running geo function");
    // If the browser supports the Geolocation API
    if (navigator.geolocation)
    {
        var positionOptions = {
            enableHighAccuracy: false,
            timeout: 5 * 3000 // 3 seconds
        };
        navigator.geolocation.getCurrentPosition(geolocationSuccess, geolocationError, positionOptions);
    }
    else
    //sAlert.warning('Enable Geolocation on your device to obtain accurate distances!');
        var lat = 47.609774;
    var lon = -122.258256;
    createMap(lat, lon);

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

