import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
   var check = TruckMarkers.findOne({});
    if(check){

    } else {
        var marker = {
            latitude: 47.609774,
            longitude: -122.258256,
            date: new Date()
        }
        TruckMarkers.insert(marker);
    }
});
