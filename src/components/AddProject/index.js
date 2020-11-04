import React, { useContext, useState } from 'react';
import { db, firebase } from '../../lib/firebase'; 
import { AuthUserContext } from '../Session'; 
import * as DB from '../../constants/db'; 
import * as CONTENT_TYPE from '../../constants/contentType';
import * as CONTENT_ID from '../../constants/contentId';

export default function AddProject(props) {
    const { onSuccess, onError } = props; 
    const authUser = useContext(AuthUserContext); 
    const [newProjectTitle, setNewProjectTitle] = useState(''); 
    const [loading, setLoading] = useState(false); 

    const createProject = () => {
        // Log Google Analytics event for button click 
        firebase.analytics().logEvent('select_content', {
            content_type: CONTENT_TYPE.BUTTON,
            content_id: CONTENT_ID.HOME_PAGE_ADD_PROJECT_BUTTON
        })
        
        if (newProjectTitle === '' || loading) {
            return 
        }

        setLoading(true); 

        db.collection(DB.PROJECTS).add({
            [DB.TITLE]: newProjectTitle,
            [DB.CREATED_BY]: authUser.uid
        })
        .then(function(docRef) {
            setLoading(false); 
            if (onSuccess) onSuccess(docRef.id);
        })
        .catch(function(error) {
            setLoading(false);
            if (onError) onError(); 
            console.error("Error adding document: ", error);
        });
    }

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            createProject(); 
        }
    }

    return (
        <div>
            <div className="field">
                <div className="control">
                    <input 
                        className="input is-size-1 is-size-2-tablet is-size-3-mobile has-text-weight-bold" 
                        type="text" 
                        placeholder="Checklist name" 
                        value={newProjectTitle}
                        onChange={e => setNewProjectTitle(e.target.value)}
                        onKeyPress={handleKeyPress}
                    />
                </div>
            </div>
            <div className="field">
                <div className="control">
                    <button className={`button is-medium is-primary has-text-weight-bold ${loading ? "is-loading" : ''}`} disabled={loading} onClick={createProject}>
                        <span>Create checklist</span>
                    </button>
                </div>
            </div>
        </div>
    )
}