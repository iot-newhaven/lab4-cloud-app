// NodeJS Javascript App
// Replace DEVICE-ID, YOUR-EMAIL, and YOUR-PASSWORD text with your information.
// This script registers a timer interval event every 10 sec to read temp variable from the device

var Particle = require('particle-api-js');
var particle = new Particle();
var token;

// Timer interval function
// Get Particle variable using token
function pollTemperature(arg) {
    particle.getVariable({ deviceId: 'DEVICE-ID', name: 'temp', auth: token }).then(function (data) {
        console.log('Device variable retrieved successfully:', data);
    }, function (err) {
        console.log('An error occurred while getting attrs:', err);
    });
}

// Login into Particle cloud, and get Authorization token for our app
// Start interval event if successful
particle.login({ username: 'YOUR-EMAIL', password: 'YOUR-PASSWORD' }).then(
    function (data) {
        token = data.body.access_token;

        // Poll temperature every 10 sec
        setInterval(pollTemperature, 10000);
    },
    function (err) {
        console.log('Could not log in.', err);
    }
);
