import InputBase from '@material-ui/core/InputBase'
import InputAdornment from '@material-ui/core/InputAdornment'
import FormControl from '@material-ui/core/FormControl'
import { firebase } from '../../lib/firebase'
import { useContext, useEffect, useState } from 'react';
import * as DB from '../../constants/db'
import * as CONTENT_TYPE from '../../constants/contentType';
import * as CONTENT_ID from '../../constants/contentId'; 
import * as EVENTS from '../../constants/events';
import Button from '@material-ui/core/Button'
import { AuthUserContext } from '../Session'

export default function ProjectTaskTitleInput(props) {
    const { task } = props;
    const [title, setTitle] = useState(''); 
    const [isLoading, setIsLoading] = useState(false); 
    const authUser = useContext(AuthUserContext);

    useEffect(() => {
        setTitle(task[DB.TITLE]); 
    }, [task])

    const updateTitle = () => {
        // Log event for input focus
        firebase.analytics().logEvent('select_content', {
            content_type: CONTENT_TYPE.INPUT,
            content_id: CONTENT_ID.TASK_TITLE_INPUT
        })

        if (isLoading || title === task[DB.TITLE] || !authUser) return;

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
            // Log event for error
            firebase.analytics().logEvent(EVENTS.TASK_TITLE_UPDATE_ERROR, {
                error_code: error.code,
                error_message: error.message
            })

            setIsLoading(false);

            console.error("Error updating project task title: ", error)
        })
    }

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            e.target.blur(); 
        }
    }

    const handleBlur = () => {
        updateTitle(); 
    }

    return (
        <FormControl fullWidth>
            <InputBase
                value={title}
                onBlur={handleBlur}
                onKeyPress={handleKeyPress}
                onChange={e => setTitle(e.target.value)}
                multiline
                endAdornment={title === task[DB.TITLE] ? null : (
                    <Button
                        color="primary"
                        disableRipple
                        disableElevation
                        disabled={isLoading}
                        onClick={updateTitle}
                    >
                        Save
                    </Button>
                )}
            />
        </FormControl>
    )
}