Router.configure({
    layoutTemplate: 'layout',
    loadingTemplate: 'loading',

    onAfterAction : function () {
        jQuery(window).scrollTop(0);
    }
});


Router.route('/', {name: 'map'});
Router.route('/driver/signIn', {name: 'driverSignIn'});
Router.route('/driver/signUp', {name: 'driverSignUp'});
Router.route('/acknowledgements', {name: 'acknowledgements'});
Router.route('/driver/map', {name: 'driverMap', onAfterAction() {
    var user = Meteor.userId();
    if(!user){
        Router.go('driverSignIn');
    }
}});