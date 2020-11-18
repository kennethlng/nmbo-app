import React, { useContext, useState } from 'react'
import { AuthUserContext } from '../Session'
import * as DB from '../../constants/db'
import * as CONTENT_ID from '../../constants/contentId'
import * as CONTENT_TYPE from '../../constants/contentType'
import * as EVENTS from '../../constants/events'
import { useRouter } from 'next/router'
import { db, firebase } from '../../lib/firebase'
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import IconButton from '@material-ui/core/IconButton';
import AddCircleOutlineRoundedIcon from '@material-ui/icons/AddCircleOutlineRounded';
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
    input: {
        marginTop: theme.spacing(3)
    }
}))

export default function AddProjectTask(props) {
    const { onSuccess, onError } = props; 
    const router = useRouter(); 
    const classes = useStyles(); 
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
        <FormControl variant="outlined" fullWidth className={classes.input}>
            <InputLabel htmlFor="outlined-adornment-password">New task</InputLabel>
            <OutlinedInput
                id="outlined-adornment-password"
                type='text'
                value={title}
                onChange={e => setTitle(e.target.value)}
                onKeyPress={handleKeyPress}
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="add task"
                            onClick={add}
                            edge="end"
                            color="primary"
                        >
                            <AddCircleOutlineRoundedIcon/>
                        </IconButton>
                    </InputAdornment>
                }
                labelWidth={70}
                disabled={loading}
            />
        </FormControl>
    )
}