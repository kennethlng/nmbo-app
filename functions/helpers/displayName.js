const CONSTANTS = require('../constants'); 

function getRandomAvatar() {
    let avatars = CONSTANTS.DISPLAY_NAME.avatars;
    return avatars[Math.floor(Math.random() * avatars.length)];
}

function getRandomAdjective() {
    let adjectives = CONSTANTS.DISPLAY_NAME.adjectives;
    return adjectives[Math.floor(Math.random() * adjectives.length)];
}

exports.generateRandomDisplayName = function() {
    let name = getRandomAdjective() + ' ' + getRandomAvatar(); 
    return name; 
}