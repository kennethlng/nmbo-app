import * as DB from '../constants/db';

export class ProjectUser {
    constructor(doc) {
        let data = doc.data(); 

        this[DB.ID] = doc[DB.ID]; 
        this.ref = doc.ref; 
        this[DB.DISPLAY_NAME] = data[DB.DISPLAY_NAME]; 
        this[DB.PHOTO_URL] = data[DB.PHOTO_URL]; 
    }
}