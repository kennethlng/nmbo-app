import { AuthUserContext } from '../Session';
import { useContext, useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'; 
import TextField from '@material-ui/core/TextField';
import Avatar from '@material-ui/core/Avatar'; 
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton'; 
import Badge from '@material-ui/core/Badge';  
import Icon from '@material-ui/core/Icon'; 
import Button from '@material-ui/core/Button'; 
import { getDisplayNameEmojiAvatar } from '../../lib/getDisplayNameEmojiAvatar';
import { grey } from '@material-ui/core/colors'
import { auth, db, storage, firebase } from '../../lib/firebase'
import * as DB from '../../constants/db'
import { AppStateContext } from '../AppState'
import { v4 as uuid } from 'uuid'
import LinearProgress from '@material-ui/core/LinearProgress'
import Link from '@material-ui/core/Link'

const useStyles = makeStyles(theme => ({
    avatar: {
        width: theme.spacing(10),
        height: theme.spacing(10),
        backgroundColor: grey['200']
    },
    badge: {
        width: theme.spacing(3),
        height: theme.spacing(3),
        border: `2px solid ${theme.palette.background.paper}`
    }
}))

export default function EditProfile() {
    const authUser = useContext(AuthUserContext); 
    const appState = useContext(AppStateContext); 
    const classes = useStyles(); 
    const [displayName, setDisplayName] = useState(''); 
    const [photoURL, setPhotoURL] = useState(null); 
    const [currentDisplayName, setCurrentDisplayName] = useState(''); 
    const [currentPhotoURL, setCurrentPhotoURL] = useState(null);
    const [loading, setLoading] = useState(false); 
    const [uploading, setUploading] = useState(false); 

    useEffect(() => {
        if (authUser) {
            setDisplayName(authUser.displayName); 
            setCurrentDisplayName(authUser.displayName); 
            setCurrentPhotoURL(authUser.photoURL);
            setPhotoURL(authUser.photoURL);
        }
    }, [authUser])

    const handleDisplayNameChange = e => setDisplayName(e.target.value); 

    const disabled = loading || !authUser || (displayName === currentDisplayName && photoURL === currentPhotoURL);

    const handleImageUploadChange = (e) => {
        const file = e.target.files[0];

        // Create reference for uploaded image
        var ref = storage.ref(); 
        var imageRef = ref.child('images/' + uuid());

        setUploading(true); 

        var uploadTask = imageRef.put(file);
        uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, 
            // Task progress
            function(snapshot) {

            }, 
            // Error
            function(error) {
                setUploading(false); 
            }, 
            // Upload completed successfully, now we can get the download URL
            function() {
                uploadTask.snapshot.ref.getDownloadURL()
                    .then(function (downloadURL) {
                        setPhotoURL(downloadURL);
                    })

                setUploading(false); 
            })
    }

    const handleRemovePictureClick = e => {
        setPhotoURL(null); 
    }

    const handleUpdateClick = () => {
        if (disabled) return; 

        setLoading(true); 

        auth.currentUser.updateProfile({
            displayName,
            photoURL
        })
        .then(function() {
            return db.collection(DB.USERS).doc(authUser.uid).update({
                [DB.DISPLAY_NAME]: displayName,
                [DB.PHOTO_URL]: photoURL
            })
        })
        .then(function() {
            setCurrentDisplayName(displayName); 
            setCurrentPhotoURL(photoURL); 

            appState.setSnackbarMessage("Profile successfully updated!");
            appState.setSnackbarOpen(true); 

            setLoading(false); 
        })
        .catch(function(error) {
            console.log("Error updating user's profile: ", error);

            appState.setSnackbarMessage("Oops! Something went wrong. Please try again.");
            appState.setSnackbarOpen(true); 

            setLoading(false); 
        })
    } 

    return (
        <Grid container spacing={1}>
            <Grid container item xs={12} justify="center" alignItems="center" direction="column">
                <Grid item>
                    <input
                        accept="image/*"
                        hidden
                        multiple={false}
                        type="file"
                        id="button-file"
                        onChange={handleImageUploadChange}
                    />
                    <label htmlFor="button-file">
                        <IconButton
                            component="span"
                        >
                            <Badge
                                overlap="circle"
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'right'
                                }}
                                badgeContent={(
                                    <Avatar className={classes.badge}>
                                        <Icon className="fas fa-image" style={{ fontSize: 12 }} />
                                    </Avatar>
                                )}
                            >
                                <Avatar
                                    className={classes.avatar}
                                    alt={currentDisplayName}
                                    src={photoURL}
                                    style={{ fontSize: 48}}
                                >
                                    {getDisplayNameEmojiAvatar(currentDisplayName)}
                                </Avatar>
                            </Badge>
                        </IconButton>
                    </label>
                    {uploading ? <LinearProgress/> : null}
                </Grid>
                {photoURL && photoURL !== '' ? (
                    <Grid item>
                        <Link
                            component="button"
                            color="textSecondary"
                            onClick={handleRemovePictureClick}
                        >
                            Remove picture
                        </Link>
                    </Grid>
                ) : null}
            </Grid>
            <Grid item xs={12}>
                <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    label="Name"
                    name="name"
                    value={displayName}
                    onChange={handleDisplayNameChange}
                />
            </Grid>
            <Grid item xs={12}>
                <Button
                    disableElevation
                    color="primary"
                    variant="contained"
                    onClick={handleUpdateClick}
                    disabled={disabled}
                    fullWidth
                >
                    Save
                </Button>
            </Grid>
        </Grid>
    )
}