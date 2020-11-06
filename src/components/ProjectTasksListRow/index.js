import React, { useContext, useEffect, useState } from 'react';
import * as DB from '../../constants/db';
import * as CONTENT_TYPE from '../../constants/contentType';
import * as CONTENT_ID from '../../constants/contentId'; 
import * as EVENTS from '../../constants/events';
import { AuthUserContext } from '../Session';
import { firebase } from '../../lib/firebase'; 

export default function ProjectTasksListRow(props) {
    const { task } = props; 
    const [title, setTitle] = useState(''); 
    const [isLoading, setIsLoading] = useState(false); 
    const authUser = useContext(AuthUserContext); 
    const [isEditing, setIsEditing] = useState(false); 

    useEffect(() => {
        setTitle(task[DB.TITLE])
    }, [task.title])

    const handleCheckClick = () => {
        let isCompleted = !task[DB.IS_COMPLETED];

        // Log event for button click
        firebase.analytics().logEvent('select_content', {
            content_id: isCompleted ? CONTENT_ID.FINISH_TASK_BUTTON : CONTENT_ID.UNFINISH_TASK_BUTTON,
            content_type: CONTENT_TYPE.BUTTON
        })

        task.ref.update({
            [DB.IS_COMPLETED]: isCompleted,
            [DB.MODIFIED_BY]: authUser.uid
        })
        .then(function() {
            // Log event for success
            firebase.analytics().logEvent(isCompleted ? EVENTS.FINISH_TASK_SUCCESS : EVENTS.UNFINISH_TASK_SUCCESS)
        })
        .catch(function(error) {
            // The document probably doesn't exist.
            console.error("Error updating document: ", error);

            // Log event for error
            firebase.analytics().logEvent(isCompleted ? EVENTS.FINISH_TASK_ERROR : EVENTS.UNFINISH_TASK_ERROR, {
                error_code: error.code,
                error_message: error.message
            })
        });
    }

    const handleDeleteClick = () => {
        // Log event for button click
        firebase.analytics().logEvent('select_content', {
            content_id: CONTENT_ID.DELETE_TASK_BUTTON,
            content_type: CONTENT_TYPE.BUTTON
        })

        task.ref.delete() 
        .then(function() {
            // Log event for success
            firebase.analytics().logEvent(EVENTS.DELETE_TASK_SUCCESS);
        }).catch(function(error) {
            console.error("Error removing document: ", error);

            // Log event for error
            firebase.analytics().logEvent(EVENTS.DELETE_TASK_ERROR, {
                error_code: error.code,
                error_message: error.message
            });
        });
    }

    const handleHeartClick = () => {
        task.ref.update({
            [DB.IS_HEARTED]: !task[DB.IS_HEARTED],
            [DB.MODIFIED_BY]: authUser.uid
        })
        .then(function() {
            // Document successfully updated
        })
        .catch(function(error) {
            // Log event for error
            console.error("Error updating document: ", error);
        });
    }

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            e.target.blur(); 
        }
    }

    const handleBlur = () => {
        setIsEditing(false); 
        updateTaskTitle(); 
    }

    const updateTaskTitle = () => {
        // Log event for input focus
        firebase.analytics().logEvent('select_content', {
            content_type: CONTENT_TYPE.INPUT,
            content_id: CONTENT_ID.TASK_TITLE_INPUT
        })

        // If currently performing an update task or the title text hasn't changed, don't do anything
        if (isLoading || title === task[DB.TITLE]) {
            return;
        }

        setIsLoading(true); 

        task.ref.update({
            [DB.TITLE]: title,
            [DB.MODIFIED_BY]: authUser.uid
        })
        .then(function() {
            // Log event for success
            firebase.analytics().logEvent(EVENTS.TASK_TITLE_UPDATE_SUCCESS); 

            setIsLoading(false);
        })
        .catch(function(error) {
            console.error("Error updating document: ", error);

            // Log event for error
            firebase.analytics().logEvent(EVENTS.TASK_TITLE_UPDATE_ERROR, {
                error_code: error.code,
                error_message: error.message
            })

            setIsLoading(false);
        });
    }

    const handleTitleClick = () => {
        setIsEditing(true)
    }

    return (
        <div className="columns is-mobile px-2">
            <div className="column is-narrow">
                <a className="has-text-primary" onClick={handleCheckClick}>
                    <span className="icon">
                        <i className={`${task[DB.IS_COMPLETED] ? 'fas fa-check-circle' : 'far fa-circle'} fa-2x`}></i>
                    </span>
                </a>
            </div>
            <div className="column has-text-left">
                {isEditing ? (
                    <div className="field">
                        <div className="control">
                            <textarea
                                className="textarea"
                                autoFocus
                                // style={{
                                //     border: "none", 
                                //     borderColor: "transparent",
                                //     padding: "0px",
                                //     boxShadow: "none",
                                //     height: "1.5rem"
                                // }}
                                type="text"
                                rows="2"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                onKeyPress={handleKeyPress}
                                onBlur={handleBlur}
                            />
                        </div>
                    </div>
                ) : (
                    <div 
                        onClick={handleTitleClick}
                        style={{
                            wordWrap: "break-word",
                            overflowWrap: "break-word",
                            // wordBreak: "break-all"
                        }}
                    >
                        {title}
                    </div>
                )}
            </div>
            {/* <div className="column is-narrow has-text-right">
                <a className={`${task[DB.IS_HEARTED] ? 'has-text-primary' : 'has-text-grey-lighter'}`} onClick={handleHeartClick}>
                    <span className="icon">
                        <i className={`${task[DB.IS_HEARTED] ? 'fas' : 'far'} fa-heart fa-lg`}></i>
                    </span>
                </a>
            </div> */}
            <div className="column is-narrow has-text-right">
                <a className="has-text-grey-lighter" onClick={handleDeleteClick}>
                    <span className="icon">
                        <i className="fas fa-times fa-lg"></i>
                    </span>
                </a>
            </div>
        </div>
    )
}