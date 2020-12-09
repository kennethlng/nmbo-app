import ProjectUsersList from '../ProjectUsersList'; 
import { useEffect, useState } from 'react';
import { db } from '../../lib/firebase'; 
import * as DB from '../../constants/db'; 
import { ProjectUser } from '../../models/ProjectUser'; 
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles'; 

const useStyles = makeStyles(theme => ({
    paper: {
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2)
    },
    header: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2)
    }
}))

export default function ProjectUsersDialog(props) {
    const { projectId } = props;
    const classes = useStyles();  
    const [projectUsers, setProjectUsers] = useState([]); 

    useEffect(() => {
        if (projectId) {
            db.collection(DB.PROJECTS).doc(projectId).collection(DB.PROJECT_USERS).get()
                .then(function (querySnapshot) {
                    var arr = [];
                    querySnapshot.forEach(function (doc) {
                        let obj = new ProjectUser(doc);
                        arr.push(obj);
                    })
                    setProjectUsers(arr);
                })
        }
    }, [projectId])
    
    return (
        <Paper elevation={0} className={classes.paper}>
            <Typography variant="overline" className={classes.header}>
                Members
            </Typography>
            <ProjectUsersList
                projectUsers={projectUsers}
            />
        </Paper>
    )
}