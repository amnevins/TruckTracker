TruckMarkers = new Mongo.Collection('truck_markers');
Meteor.methods({

    AddTruckMarkers: function (lat, lon) {
        if(lat === null || lon === null){
            return;
        }
        var user = Meteor.userId();
        console.log(user);
        var marker = {
            latitude: lat,
            longitude: lon,
            userId: user,
            date: new Date()
        }
try {
    var check = TruckMarkers.findOne({userId: user});

    TruckMarkers.update(check._id, {$set: marker});
}catch(e){

            TruckMarkers.insert(marker);
        }
    }
});