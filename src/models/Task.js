import * as DB from '../constants/db';

export class Task {
    constructor(doc) {
        let data = doc.data(); 

        this.id = doc.id; 
        this.ref = doc.ref; 
        this[DB.TITLE] = data[DB.TITLE]; 
        this[DB.IS_COMPLETED] = data[DB.IS_COMPLETED]; 
    }
}