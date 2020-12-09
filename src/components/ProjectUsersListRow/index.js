import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar'; 
import Typography from '@material-ui/core/Typography';
import { getDisplayNameEmojiAvatar } from '../../lib/getDisplayNameEmojiAvatar';
import * as DB from '../../constants/db'; 
import { grey } from '@material-ui/core/colors'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    avatar: {
        backgroundColor: grey['200']
    }
}))

export default function ProjectUsersListRow(props) {
    const { projectUser } = props; 
    const classes = useStyles(); 

    return (
        <ListItem>
            <ListItemAvatar>
                <Avatar className={classes.avatar} alt={projectUser[DB.DISPLAY_NAME]} src={projectUser[DB.PHOTO_URL]}>
                    {getDisplayNameEmojiAvatar(projectUser[DB.DISPLAY_NAME])}
                </Avatar>
            </ListItemAvatar>
            <ListItemText
                primary={(
                    <Typography variant="body1">
                        {projectUser[DB.DISPLAY_NAME]}
                    </Typography>
                )}
            />
        </ListItem>
    )
}