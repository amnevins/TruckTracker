Template.driverSignUp.events({

    'click .signUp': function (e) {
        e.preventDefault();
        var username = $('#username1').val();
        var email = $('#email1').val();
        var password = $('#password1').val();
        Accounts.createUser({
            email: email,
            username: username,
            password: password,
            profile: {
                type: "driver",
                email: email,
                username: username
            }

        });
        Meteor.loginWithPassword(username, password, function (error) {
            if (Meteor.user()) {
                Router.go('driverMap');
            } else {
                sAlert.warning(error.reason);
            }
        });
    },

    'click .signIn': function (e) {
        e.preventDefault();
        Router.go('driverSignIn');
    }

});