import { names } from '../constants/names'
import { adjectives } from '../constants/adjectives'

function getRandomName() {
    return names[Math.floor(Math.random() * names.length)];
}

function getRandomAdjective() {
    return adjectives[Math.floor(Math.random() * adjectives.length)];
}

export function generateRandomDisplayName() {
    let string = getRandomAdjective() + ' ' + getRandomName(); 
    return string; 
}