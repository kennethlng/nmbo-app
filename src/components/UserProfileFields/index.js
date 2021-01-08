import TextField from '@material-ui/core/TextField';
import Avatar from '@material-ui/core/Avatar'; 
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton'; 
import Badge from '@material-ui/core/Badge';  
import Icon from '@material-ui/core/Icon'; 
import { useContext, useEffect, useState } from 'react';
import { AuthUserContext } from '../Session';
import { makeStyles } from '@material-ui/core/styles'; 
import { db, auth } from '../../lib/firebase'; 
import { User } from '../../models/User'; 
import * as DB from '../../constants/db'; 

const useStyles = makeStyles(theme => ({
    avatar: {
        width: theme.spacing(7),
        height: theme.spacing(7)
    },
    badge: {
        width: theme.spacing(3),
        height: theme.spacing(3),
        border: `2px solid ${theme.palette.background.paper}`
    }
}))

export default function UserProfileFields() {
    const authUser = useContext(AuthUserContext); 
    const classes = useStyles();
    const [displayName, setDisplayName] = useState(''); 
    const [photoURL, setPhotoURL] = useState(null); 
    const [currentDisplayName, setCurrentDisplayName] = useState(null); 
    const [currentPhotoURL, setCurrentPhotoURL] = useState(null);

    useEffect(() => {
        if (authUser) {
            setDisplayName(authUser.displayName); 
            setCurrentDisplayName(authUser.displayName); 
            setCurrentPhotoURL(authUser.photoURL);
            setPhotoURL(authUser.photoURL);
        }
    }, [authUser])

    const handleDisplayNameChange = e => setDisplayName(e.target.value); 

    return (
        <div>
            <IconButton
            >
                <Badge
                    overlap="circle"
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right'
                    }}
                    badgeContent={(
                        <Avatar className={classes.badge}>
                            <Icon className="fas fa-image" style={{ fontSize: 12 }}/>
                        </Avatar>
                    )}
                >
                    <Avatar
                        className={classes.avatar}
                        alt={currentDisplayName}
                        src={currentPhotoURL}
                    />
                </Badge>
            </IconButton>
            <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                label="Name"
                name="name"
                value={displayName}
                onChange={handleDisplayNameChange}
            />
        </div>
    )
}