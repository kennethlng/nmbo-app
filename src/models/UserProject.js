import * as DB from '../constants/db';

export class UserProject {
    constructor(doc) {
        let data = doc.data(); 

        this[DB.ID] = doc[DB.ID]; 
        this.ref = doc.ref; 
        this[DB.TITLE] = data[DB.TITLE]; 
    }
}