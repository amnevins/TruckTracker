Template.driverSignIn.events({

    'click .signIn': function() {
        var username = $('#username').val();
        var password = $('#password').val();
        Meteor.loginWithPassword(username, password, function (error) {
            if (Meteor.user()) {
                Router.go('driverMap');
            } else {
                sAlert.warning(error.reason);
            }
        });
    },

    'click .goSignUp': function(e) {
        e.preventDefault();
        Router.go('driverSignUp');
    }

});