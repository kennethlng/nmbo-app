import React, { useContext, useEffect, useState } from 'react';
import { AuthUserContext } from '../Session'; 
import { UserProject } from '../../models/UserProject'; 
import * as DB from '../../constants/db'; 
import * as LIST_ID from '../../constants/listId';
import * as LIST_NAME from '../../constants/listName';
import { db, firebase } from '../../lib/firebase';
import { makeStyles } from '@material-ui/core/styles'
import UserProjectsListRow from '../UserProjectsListRow'
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    subheader: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2)
    },
    listSection: {
        backgroundColor: 'inherit',
    },
    ul: {
        backgroundColor: 'inherit',
        padding: 0,
    },
}));

export default function RecentAuthUserProjectsSubList() {
    const authUser = useContext(AuthUserContext); 
    const classes = useStyles(); 
    const [userProjects, setUserProjects] = useState([]); 
    const [loading, setLoading] = useState(false); 

    useEffect(() => {
        if (authUser) {
            // Fetch data
            list(); 

            // Log Google Analytics event for viewing item list
            firebase.analytics().logEvent('view_item_list', {
                item_list_id: LIST_ID.RECENT_USER_PROJECTS,
                item_list_name: LIST_NAME.RECENT_USER_PROJECTS
            })
        }
    }, [authUser])

    const list = () => {
        setLoading(true); 

        // Set last week date as start date
        var startDate = Date.now() - 604800000;
        var startDateObj = new Date(startDate);

        // Fetch all user_projects that were updated within the last week
        db.collection(DB.USERS).doc(authUser.uid).collection(DB.USER_PROJECTS)
        .where(DB.OPENED_ON, '>=', startDateObj)
        .orderBy(DB.OPENED_ON, "desc")
        .limit(10)
        .get()
        .then(function(querySnapshot) {
            var items = []; 
            querySnapshot.forEach(function(doc) {
                let item = new UserProject(doc); 
                items.push(item); 
            })
            setUserProjects(items); 

            setLoading(false); 
        }) 
        .catch(function(error) {
            console.log("Error listing current user's created projects: ", error); 
            setLoading(false); 
        })
    }

    return (
        loading ? <LinearProgress/> : (
            userProjects.length > 0 ? (
                <li className={classes.listSection}>
                    <ul className={classes.ul}>
                        <Typography className={classes.subheader} variant="overline" >
                            Recent checklists
                        </Typography>
                        {userProjects.map(userProject => (
                            <UserProjectsListRow
                                key={userProject[DB.ID]}
                                userProject={userProject}
                            />
                        ))}
                    </ul>
                </li>
            ) : null
        )
    )
}