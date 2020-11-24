import { firebase } from '../../lib/firebase'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close';
import * as CONTENT_TYPE from '../../constants/contentType';
import * as CONTENT_ID from '../../constants/contentId'; 
import * as EVENTS from '../../constants/events';
import { useState } from 'react';

export default function ProjectTaskDeleteButton(props) {
    const { task } = props; 
    const [isLoading, setIsLoading] = useState(false); 

    const handleClick = () => {
        // Log event for button click
        firebase.analytics().logEvent('select_content', {
            content_id: CONTENT_ID.DELETE_TASK_BUTTON,
            content_type: CONTENT_TYPE.BUTTON
        })

        setIsLoading(true); 

        task.ref.delete()
        .then(function () {
            // Log event for success
            firebase.analytics().logEvent(EVENTS.DELETE_TASK_SUCCESS);

            setIsLoading(false);
        }).catch(function (error) {
            console.error("Error deleting task: ", error);

            // Log event for error
            firebase.analytics().logEvent(EVENTS.DELETE_TASK_ERROR, {
                error_code: error.code,
                error_message: error.message
            });

            setIsLoading(false);
        });
    }

    return (
        <IconButton 
            edge="end" 
            aria-label="close" 
            onClick={handleClick}
            disabled={isLoading}
        >
            <CloseIcon />
        </IconButton>
    )
}