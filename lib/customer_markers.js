CustomerMarkers = new Mongo.Collection('markers');

Meteor.methods({

    AddCustomerMarker: function(lat, lon){
        check(lat, Number);
        check(lon, Number);


        var marker = {
            latitude: lat,
            longitude: lon,
            date: new Date()
        }

        CustomerMarkers.insert(marker);
    }

});