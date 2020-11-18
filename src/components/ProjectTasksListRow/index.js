import React, { useContext, useEffect, useState } from 'react';
import * as DB from '../../constants/db';
import * as CONTENT_TYPE from '../../constants/contentType';
import * as CONTENT_ID from '../../constants/contentId'; 
import * as EVENTS from '../../constants/events';
import { AuthUserContext } from '../Session';
import { firebase } from '../../lib/firebase'; 
import CloseIcon from '@material-ui/icons/Close';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';

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
        <ListItem>
            <ListItemIcon>
                <IconButton edge="start" onClick={handleCheckClick}>
                    {task[DB.IS_COMPLETED] ? <CheckCircleIcon/> : <RadioButtonUncheckedIcon/>}
                </IconButton>
            </ListItemIcon>
            <ListItemText primary={title} />
            <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="close" onClick={handleDeleteClick}>
                    <CloseIcon />
              </IconButton>
            </ListItemSecondaryAction>
        </ListItem>
    )
}