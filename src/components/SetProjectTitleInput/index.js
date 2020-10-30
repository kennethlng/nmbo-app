import React, { useEffect, useState } from 'react'
import { db } from '../../lib/firebase'
import * as DB from '../../constants/db'
import { useRouter } from 'next/router'

export default function SetProjectTitleInput(props) {
    const { initialValue, onSuccess, onError } = props;
    const router = useRouter(); 
    const [title, setTitle] = useState(''); 
    const [isLoading, setIsLoading] = useState(false); 
    const [isEditing, setIsEditing] = useState(false); 

    useEffect(() => {
        setTitle(initialValue); 
    }, [props.initialValue])

    const updateProject = () => {
        if (isLoading || title === initialValue) return ;

        setIsLoading(true); 

        db.collection(DB.PROJECTS).doc(router.query.id).set({
            title
        }, { merge: true })
        .then(function() {
            setIsLoading(false); 
            if (onSuccess) onSuccess();
        })
        .catch(function(error) {
            setIsLoading(false); 
            console.error("Error adding document: ", error);
            if (onError) onError(); 
        });
    }

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            e.target.blur(); 
        }
    }
    
    const handleBlur = () => {
        setIsEditing(false); 
        updateProject();
    } 

    return (
        isEditing ? (
            <div className="field is-grouped">
                <div className="control is-expanded">
                    <input
                        className="input is-size-1 is-size-3-mobile has-text-weight-bold"
                        // style={{
                        //     border: "none", 
                        //     borderColor: "transparent",
                        //     padding: "0px",
                        //     boxShadow: "none"
                        // }}
                        type="text"
                        autoFocus
                        placeholder="Checklist name"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        onKeyPress={handleKeyPress}
                        onBlur={handleBlur}
                    />
                </div>
            </div>
        ) : (
            <div 
                className="block" 
                onClick={() => setIsEditing(true)}
            >
                <p className="is-size-1 is-size-3-mobile has-text-weight-bold">{title}</p>
            </div>
        )
    )
}