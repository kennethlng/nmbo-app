export function getDisplayNameEmojiAvatar(displayName) {
    if (!displayName) return null; 

    let res = displayName.split(" "); 
    let word = res[res.length - 1]; 

    switch (word) {
        case "Santa":
            return "🎅";
        case "Giraffe":
            return "🦒";
        case "Grandma":
            return "👵";
        case "Grandpa":
            return "👴";
        case "Doggie":
            return "🐶";
        case "Cat":
            return "🐱"; 
        case "Boomer": 
            return "👴";
        case "Bear": 
            return "🐻";
        case "Wizard":
            return "🧙";
        case "Lover": 
            return "😘";
        case "Alien": 
            return "👽"; 
        case "Pirate": 
            return "☠️";
        case "Bot": 
            return "🤖"; 
        case "Pumpkin": 
            return "🎃";
        case "Poopoo": 
            return "💩";
        case "Ninja": 
            return "🥷"; 
        case "Baby":
            return "👶"; 
        default: 
            return null; 
    }
}