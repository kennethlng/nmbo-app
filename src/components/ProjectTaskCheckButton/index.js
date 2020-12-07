import { useContext, useState } from 'react';
import * as DB from '../../constants/db';
import * as CONTENT_TYPE from '../../constants/contentType';
import * as CONTENT_ID from '../../constants/contentId'; 
import * as EVENTS from '../../constants/events';
import { firebase } from '../../lib/firebase'
import { AuthUserContext } from '../Session'
import IconButton from '@material-ui/core/IconButton'
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import CheckCircleRoundedIcon from '@material-ui/icons/CheckCircleRounded';

export default function ProjectTaskCheckButton(props) {
    const { task } = props; 
    const [isLoading, setIsLoading] = useState(false); 
    const authUser = useContext(AuthUserContext);

    const handleClick = () => {
        if (isLoading || !authUser) return; 

        setIsLoading(true); 

        let bool = !task[DB.IS_COMPLETED];

        // Log event for button click
        firebase.analytics().logEvent('select_content', {
            content_id: bool ? CONTENT_ID.FINISH_TASK_BUTTON : CONTENT_ID.UNFINISH_TASK_BUTTON,
            content_type: CONTENT_TYPE.BUTTON
        })

        task.ref.update({
            [DB.IS_COMPLETED]: bool,
            [DB.MODIFIED_BY]: authUser.uid,
            [DB.MODIFIED_BY_DISPLAY_NAME]: authUser.displayName
        })
        .then(function() {
            // Log event for success
            firebase.analytics().logEvent(bool ? EVENTS.FINISH_TASK_SUCCESS : EVENTS.UNFINISH_TASK_SUCCESS)

            setIsLoading(false); 
        })
        .catch(function(error) {
            // The document probably doesn't exist.
            console.error("Error updating document: ", error);

            // Log event for error
            firebase.analytics().logEvent(bool ? EVENTS.FINISH_TASK_ERROR : EVENTS.UNFINISH_TASK_ERROR, {
                error_code: error.code,
                error_message: error.message
            })

            setIsLoading(false); 
        });
    }

    return (
        <IconButton 
            edge="start" 
            onClick={handleClick} 
            color="primary"
            disabled={isLoading}
        >
            {task[DB.IS_COMPLETED] ? <CheckCircleRoundedIcon /> : <RadioButtonUncheckedIcon />}
        </IconButton>
    )
}