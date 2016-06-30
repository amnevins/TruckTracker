Template.layout.onRendered(function() {



    $('#mainSidebar').first()
        .sidebar('attach events', '.sideMenuActivate');

    //$('.sideMenuActivate')
    //    .removeClass('disabled');
    //$('.sideMenuDeactivate')
    //    .removeClass('visible');


});

Template.layout.events({


    'click .driversign': function(e){
        e.preventDefault();
        Router.go('driverSignIn')
    },
    'click .drivermap': function(e){
        e.preventDefault();
        Router.go('driverMap')
    },
    'click .usermap': function(e){
        e.preventDefault();
        Router.go('map')
    },
    'click .acknowledgements': function(e){
        e.preventDefault();
        Router.go('acknowledgements')
    },
    'click .sideMenuActivate': function(e) {
        e.preventDefault();
        $('#mainSidebar').first()
            .sidebar('attach events', '.sideMenuActivate');
    }

});