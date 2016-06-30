Meteor.startup(function() {
    sAlert.config({
        effect: 'genie',
        position: 'bottom-right',
        timeout: 5000,
        stack: false,
        beep: true
    });
});