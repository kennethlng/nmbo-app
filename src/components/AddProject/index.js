import React, { useContext, useState } from 'react';
import { db, firebase } from '../../lib/firebase'; 
import { AuthUserContext } from '../Session'; 
import * as DB from '../../constants/db'; 
import * as CONTENT_TYPE from '../../constants/contentType';
import * as CONTENT_ID from '../../constants/contentId';
import * as EVENTS from '../../constants/events'; 
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid'

export default function AddProject(props) {
    const { onSuccess, onError } = props; 
    const authUser = useContext(AuthUserContext); 
    const [newProjectTitle, setNewProjectTitle] = useState(''); 
    const [loading, setLoading] = useState(false); 

    const handleSubmit = (e) => {
        e.preventDefault(); 
        
        // Log Google Analytics event for button click 
        firebase.analytics().logEvent('select_content', {
            content_type: CONTENT_TYPE.BUTTON,
            content_id: CONTENT_ID.HOME_PAGE_ADD_PROJECT_BUTTON
        })
        
        if (newProjectTitle === '' || loading || !authUser) {
            return 
        }

        setLoading(true); 

        db.collection(DB.PROJECTS).add({
            [DB.TITLE]: newProjectTitle,
            [DB.CREATED_BY]: authUser.uid
        })
        .then(function(docRef) {
            // Log success event
            firebase.analytics().logEvent(EVENTS.ADD_PROJECT_SUCCESS);

            setLoading(false); 

            // Broadcast props method
            if (onSuccess) onSuccess(docRef.id);
        })
        .catch(function(error) {
            // Log error event
            firebase.analytics().logEvent(EVENTS.ADD_PROJECT_ERROR, {
                error_code: error.code,
                error_message: error.message
            });

            setLoading(false);

            if (onError) onError(); 

            console.error("Error adding document: ", error);
        });
    }

    return (
        <form noValidate onSubmit={handleSubmit}>
            <Grid container direction="column" spacing={1}>
                <Grid item md={6} sm={8}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        autoFocus
                        label="Checklist Name"
                        fullWidth
                        name="name"
                        type="text"
                        disabled={loading}
                        onChange={e => setNewProjectTitle(e.target.value)}
                    />
                </Grid>
                <Grid item sm={4}>
                    <Button
                        type="submit"
                        color="primary"
                        variant="contained"
                        disabled={loading}
                        disableElevation
                        disableRipple
                        fullWidth
                        size="large"
                    >
                        Create Checklist
                    </Button>
                </Grid>
            </Grid>
        </form>
    )
}