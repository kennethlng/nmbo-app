import React, { useEffect, useState } from 'react'
import { db } from '../../lib/firebase'
import * as DB from '../../constants/db'
import { useRouter } from 'next/router'

export default function SetProjectTitleInput(props) {
    const { initialValue, onSuccess, onError } = props;
    const router = useRouter(); 
    const [title, setTitle] = useState(''); 
    const [isLoading, setIsLoading] = useState(false); 

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
            onSuccess();
            setIsLoading(false); 
        })
        .catch(function(error) {
            onError(); 
            setIsLoading(false); 
            console.error("Error adding document: ", error);
        });
    }

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            e.target.blur(); 
        }
    }
    
    const handleBlur = () => updateProject(); 

    return (
        <div className="field is-grouped">
            <div className="control is-expanded">
                <input 
                    className="input is-size-3 is-size-4-mobile has-text-weight-bold" 
                    style={{ 
                        // border: "none", 
                        borderColor: "transparent", 
                        padding: "0px",
                        boxShadow: "none"
                    }} 
                    type="text" 
                    placeholder="Checklist name"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    onKeyPress={handleKeyPress}
                    onBlur={handleBlur}
                />
            </div>
        </div>
    )
}