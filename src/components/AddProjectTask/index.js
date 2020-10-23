import React, { useContext, useState } from 'react'
import { AuthUserContext } from '../Session'
import * as DB from '../../constants/db'
import { useRouter } from 'next/router'
import { db } from '../../lib/firebase'

export default function AddProjectTask(props) {
    const { onSuccess, onError } = props; 
    const router = useRouter(); 
    const authUser = useContext(AuthUserContext); 
    const [title, setTitle] = useState(''); 
    const [loading, setLoading] = useState(false); 

    const add = () => {
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
            setTitle(''); 
            setLoading(false); 
            if (onSuccess) onSuccess(); 
        })
        .catch(function(error) {
            console.error("Error adding document: ", error);

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
                    placeholder="New item or task" 
                    value={title} 
                    disabled={loading}
                    onChange={e => setTitle(e.target.value)}
                    onKeyPress={handleKeyPress}
                />
                <span className="icon is-left">
                    <i className="fas fa-pen"></i>
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