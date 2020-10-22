import React, { useEffect, useState } from 'react';
import * as DB from '../../constants/db';

export default function ProjectTasksListRow(props) {
    const { task } = props; 
    const [title, setTitle] = useState(''); 
    const [isLoading, setIsLoading] = useState(false); 

    useEffect(() => {
        setTitle(task[DB.TITLE])
    }, [task.title])

    const handleCheckClick = () => {
        task.ref.update({
            [DB.IS_COMPLETED]: !task[DB.IS_COMPLETED]
        })
        .then(function() {
            // Document successfully updated
        })
        .catch(function(error) {
            // The document probably doesn't exist.
            console.error("Error updating document: ", error);
        });
    }

    const handleDeleteClick = () => {
        task.ref.delete() 
        .then(function() {
            console.log("Document successfully deleted!");
        }).catch(function(error) {
            console.error("Error removing document: ", error);
        });
    }

    const handleHeartClick = () => {
        task.ref.update({
            [DB.IS_HEARTED]: !task[DB.IS_HEARTED]
        })
        .then(function() {
            // Document successfully updated
        })
        .catch(function(error) {
            // The document probably doesn't exist.
            console.error("Error updating document: ", error);
        });
    }

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            e.target.blur(); 
        }
    }

    const handleBlur = () => {
        updateTaskTitle(); 
    }

    const updateTaskTitle = () => {
        // If currently performing an update task or the title text hasn't changed, don't do anything
        if (isLoading || title === task[DB.TITLE]) {
            return;
        }

        setIsLoading(true); 

        task.ref.update({
            [DB.TITLE]: title
        })
        .then(function() {
            // Document successfully updated
            setIsLoading(false);
        })
        .catch(function(error) {
            // The document probably doesn't exist.
            console.error("Error updating document: ", error);
            setIsLoading(false);
        });
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
                <div className="field">
                    <div className="control">
                        <input
                            className="input"
                            style={{
                                border: "none", 
                                borderColor: "transparent",
                                padding: "0px",
                                boxShadow: "none",
                                height: "1.5rem"
                            }}
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            onKeyPress={handleKeyPress}
                            onBlur={handleBlur}
                        />
                    </div>
                </div>
            </div>
            <div className="column is-narrow has-text-right">
                <a className={`${task[DB.IS_HEARTED] ? 'has-text-primary' : 'has-text-grey-light'}`} onClick={handleHeartClick}>
                    <span className="icon">
                        <i className={`${task[DB.IS_HEARTED] ? 'fas' : 'far'} fa-heart fa-lg`}></i>
                    </span>
                </a>
            </div>
            <div className="column is-narrow has-text-right">
                <a className="has-text-grey-light" onClick={handleDeleteClick}>
                    <span className="icon">
                        <i className="far fa-times fa-lg"></i>
                    </span>
                </a>
            </div>
        </div>
    )
}