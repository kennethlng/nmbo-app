import Avatar from '@material-ui/core/Avatar'; 
import { makeStyles } from '@material-ui/core/styles';
import { grey } from '@material-ui/core/colors'
import { getDisplayNameEmojiAvatar } from '../../lib/getDisplayNameEmojiAvatar';
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles(theme => ({
    avatar: {
        width: theme.spacing(4),
        height: theme.spacing(4),
        backgroundColor: grey['200']
        // backgroundColor: 'transparent'
    }
}))

export default function UserAvatar(props) {
    const { displayName, photoURL } = props; 
    const classes = useStyles();

    return (
        <Avatar
            className={classes.avatar}
            alt={displayName}
            src={photoURL}
        >
            {getDisplayNameEmojiAvatar(displayName)}
        </Avatar>
    )
}