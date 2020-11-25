import Button from '@material-ui/core/Button'
import PlaylistAddRoundedIcon from '@material-ui/icons/PlaylistAddRounded'
import { useRouter } from 'next/router'
import * as ROUTES from '../../constants/routes'
import * as DB from '../../constants/db'
import * as CONTENT_TYPE from '../../constants/contentType'
import * as CONTENT_ID from '../../constants/contentId'
import { db, firebase } from '../../lib/firebase'
import { AuthUserContext } from '../Session'
import { useContext, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
    checklist: {
        // [theme.breakpoints.down('xs')]: {
        //     display: 'none'
        // }
    }
}))

export default function AddProjectButton() {
    const router = useRouter(); 
    const classes = useStyles(); 
    const authUser = useContext(AuthUserContext); 
    const [loading, setLoading] = useState(false); 

    const handleClick = () => {
        // Log Google Analytics event for button click
        firebase.analytics().logEvent('select_content', {
            content_id: CONTENT_ID.HEADER_ADD_PROJECT_BUTTON,
            content_type: CONTENT_TYPE.BUTTON
        })

        setLoading(true); 

        db.collection(DB.PROJECTS).add({
            [DB.CREATED_BY]: authUser.uid
        })
        .then(function(docRef) {
            setLoading(false); 

            router.push(ROUTES.PROJECT(docRef.id));
        })
        .catch(function(error) {
            setLoading(false); 

            console.log("Error adding new project: ", error);
        })
    }

    return (
        <Button
            variant="outlined"
            color="primary"
            onClick={handleClick}
            disabled={loading}
            disableRipple
            disableElevation
            startIcon={<PlaylistAddRoundedIcon/>}
        >
            <span>New <span className={classes.checklist}>Checklist</span></span>
        </Button>
    )
}