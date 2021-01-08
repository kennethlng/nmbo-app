import React, { useContext, useEffect } from 'react';
import { AuthUserContext } from '../Session'; 
import * as LIST_ID from '../../constants/listId';
import * as LIST_NAME from '../../constants/listName';
import { firebase } from '../../lib/firebase';
import UserProjectsList from '../UserProjectsList';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles'
import { AppStateContext } from '../AppState'

const useStyles = makeStyles(theme => ({
    subheader: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2)
    },
    divider: {
        margin: theme.spacing(2)
    },
    nested: {
        // paddingLeft: theme.spacing(4)
    }
}))

export default function RecentAuthUserProjects() {
    const authUser = useContext(AuthUserContext); 
    const appState = useContext(AppStateContext); 
    const classes = useStyles(); 

    useEffect(() => {
        if (authUser) {
            // Log Google Analytics event for viewing item list
            firebase.analytics().logEvent('view_item_list', {
                item_list_id: LIST_ID.RECENT_USER_PROJECTS,
                item_list_name: LIST_NAME.RECENT_USER_PROJECTS
            })
        }
    }, [authUser])

    return (
        appState.recentUserProjects.length > 0 ? (
            <div className={classes.nested}>
                <UserProjectsList
                    userProjects={appState.recentUserProjects}
                />
            </div>
        ) : null
    )
}