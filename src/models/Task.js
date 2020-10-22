import { delBasePath } from 'next/dist/next-server/lib/router/router';
import * as DB from '../constants/db';

export class Task {
    constructor(doc) {
        let data = doc.data(); 

        this.id = doc.id; 
        this.ref = doc.ref; 
        this.title = data.title; 
        this[DB.IS_COMPLETED] = data[DB.IS_COMPLETED]; 
        this[DB.IS_HEARTED] = data[DB.IS_HEARTED]; 
    }
}