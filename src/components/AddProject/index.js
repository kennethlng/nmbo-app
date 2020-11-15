import React, { useContext, useState } from 'react';
import { db, firebase } from '../../lib/firebase'; 
import { AuthUserContext } from '../Session'; 
import * as DB from '../../constants/db'; 
import * as CONTENT_TYPE from '../../constants/contentType';
import * as CONTENT_ID from '../../constants/contentId';
import * as EVENTS from '../../constants/events'; 

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
        
        if (newProjectTitle === '' || loading || !authUser) {
            return 
        }

        setLoading(true); 

        db.collection(DB.PROJECTS).add({
            [DB.TITLE]: newProjectTitle,
            [DB.CREATED_BY]: authUser.uid
        })
        .then(function(docRef) {
            // Log success event
            firebase.analytics().logEvent(EVENTS.ADD_PROJECT_SUCCESS);

            setLoading(false); 

            // Broadcast props method
            if (onSuccess) onSuccess(docRef.id);
        })
        .catch(function(error) {
            // Log error event
            firebase.analytics().logEvent(EVENTS.ADD_PROJECT_ERROR, {
                error_code: error.code,
                error_message: error.message
            });

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
                <div className="control has-icons-left">
                    <input 
                        className="input is-size-1 is-size-2-tablet is-size-3-mobile has-text-weight-bold" 
                        type="text" 
                        placeholder="Checklist name" 
                        value={newProjectTitle}
                        onChange={e => setNewProjectTitle(e.target.value)}
                        onKeyPress={handleKeyPress}
                    />
                    <span className="icon is-size-1 is-size-2-tablet is-size-3-mobile is-left">
                        <i className="fas fa-tasks"></i>
                    </span>
                </div>
            </div>
            <div className="field">
                <div className="control">
                    <button className={`button is-fullwidth is-medium is-primary has-text-weight-bold ${loading ? "is-loading" : ''}`} disabled={loading} onClick={createProject}>
                        <span>Create checklist</span>
                    </button>
                </div>
            </div>
        </div>
    )
}