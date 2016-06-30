Meteor.publish('truck_markers', function() {
    return TruckMarkers.find({});
});

Meteor.publish('customer_markers', function() {
    return CustomerMarkers.find({});
});

Meteor.publish('my_truck', function() {
    var user = this.userId;
    return TruckMarkers.find({userId: user});
});

Meteor.publish('latest_truck_markers', function() {
    var user = this.userId;
    return TruckMarkers.find({});
});