import React, { useContext, useState } from 'react'
import { AuthUserContext } from '../Session'
import * as DB from '../../constants/db'
import * as CONTENT_ID from '../../constants/contentId'
import * as CONTENT_TYPE from '../../constants/contentType'
import * as EVENTS from '../../constants/events'
import { useRouter } from 'next/router'
import { db, firebase } from '../../lib/firebase'

export default function AddProjectTask(props) {
    const { onSuccess, onError } = props; 
    const router = useRouter(); 
    const authUser = useContext(AuthUserContext); 
    const [title, setTitle] = useState(''); 
    const [loading, setLoading] = useState(false); 

    const add = () => {
        // Log event for button click 
        firebase.analytics().logEvent('select_content', {
            content_id: CONTENT_ID.ADD_TASK_BUTTON,
            content_type: CONTENT_TYPE.BUTTON
        })

        if (title === '' || loading) {
            return; 
        }

        setLoading(true);

        db.collection(DB.PROJECTS).doc(router.query.id).collection(DB.PROJECT_TASKS).add({
            [DB.TITLE]: title,
            [DB.CREATED_BY]: authUser.uid,
            [DB.MODIFIED_BY]: authUser.uid,
            [DB.IS_HEARTED]: false,
            [DB.IS_COMPLETED]: false 
        })
        .then(function(docRef) {
            // Log event for success
            firebase.analytics().logEvent(EVENTS.ADD_TASK_SUCCESS);

            // Reset the input
            setTitle(''); 

            setLoading(false); 

            if (onSuccess) onSuccess(); 
        })
        .catch(function(error) {
            console.error("Error adding document: ", error);

            // Log event for error
            firebase.analytics().logEvent(EVENTS.ADD_TASK_ERROR, {
                error_code: error.code,
                error_message: error.message
            });

            setLoading(false); 

            if (onError) onError(); 
        })
    }

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            add(); 
        }
    }

    return (
        <div className="field has-addons">
            <div className="control has-icons-left is-expanded">
                <input 
                    className="input" 
                    type="text" 
                    placeholder="New task" 
                    value={title} 
                    disabled={loading}
                    onChange={e => setTitle(e.target.value)}
                    onKeyPress={handleKeyPress}
                />
                <span className="icon is-left">
                    <i className="far fa-check"></i>
                </span>
            </div>
            <div className="control">
                <button 
                    className={`button is-primary has-text-weight-bold ${loading ? "is-loading" : ""}`} 
                    disabled={loading} 
                    onClick={add}
                >
                    Add
                </button>
            </div>
        </div>
    )
}