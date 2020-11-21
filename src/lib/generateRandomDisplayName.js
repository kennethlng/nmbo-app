import { avatars } from '../constants/avatars'
import { adjectives } from '../constants/adjectives'

function getRandomAvatar() {
    return avatars[Math.floor(Math.random() * avatars.length)];
}

function getRandomAdjective() {
    return adjectives[Math.floor(Math.random() * adjectives.length)];
}

export function generateRandomDisplayName() {
    let string = getRandomAdjective() + ' ' + getRandomAvatar(); 
    return string; 
}