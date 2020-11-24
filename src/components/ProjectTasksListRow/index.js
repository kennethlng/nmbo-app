import ProjectTaskTitleInput from '../ProjectTaskTitleInput';
import ProjectTaskDeleteButton from '../ProjectTaskDeleteButton';
import ProjectTaskCheckButton from '../ProjectTaskCheckButton'; 
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    input: {
        paddingTop: theme.spacing(1)
    }
}))

export default function ProjectTasksListRow(props) {
    const classes = useStyles(); 
    const { task } = props; 

    return (
        <Grid container>
            <Grid item>
                <ProjectTaskCheckButton
                    task={task}
                />
            </Grid>
            <Grid item xs className={classes.input}>
                <ProjectTaskTitleInput
                    task={task}
                />
            </Grid>
            <Grid item>
                <ProjectTaskDeleteButton
                    task={task}
                />
            </Grid>
        </Grid>
    )
}