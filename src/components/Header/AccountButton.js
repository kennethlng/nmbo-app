import Button from '@material-ui/core/Button'; 
import IconButton from '@material-ui/core/IconButton'; 
import Menu from '@material-ui/core/Menu';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar'; 
import Typography from '@material-ui/core/Typography'; 
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import { useContext, useEffect, useState } from 'react';
import { AuthUserContext } from '../Session'
import SignOutMenuItem from './SignOutMenuItem'
import SignInMenuItem from './SignInMenuItem'
import { useRouter } from 'next/router';
import * as DB from '../../constants/db';
import * as ROUTES from '../../constants/routes';
import * as CONTENT_ID from '../../constants/contentId'; 
import * as CONTENT_TYPE from '../../constants/contentType'; 
import { firebase, db } from '../../lib/firebase'; 
import UserAvatar from '../UserAvatar'; 
import InputBase from '@material-ui/core/InputBase';
import FormControl from '@material-ui/core/FormControl';
import InputAdornment from '@material-ui/core/InputAdornment';

const useStyles = makeStyles(theme => ({
    text: {
        padding: theme.spacing(2)
    },
    anonymous: {
        color: theme.palette.secondary.main
    },
    displayName: {
        fontWeight: 800
    }
}))

export default function AccountButton() {
    const authUser = useContext(AuthUserContext); 
    const classes = useStyles(); 
    const [anchorEl, setAnchorEl] = useState(null); 
    const [displayName, setDisplayName] = useState(null); 
    const [photoURL, setPhotoURL] = useState(null); 
    const open = Boolean(anchorEl);
    const router = useRouter(); 

    useEffect(() => {
        var unsubscribe; 

        if (authUser) {   
            // Get the user's displayName and photoURL
            unsubscribe = db.collection(DB.USERS).doc(authUser.uid).onSnapshot(function(doc) {
                const data = doc.data(); 
                if (data) {
                    setDisplayName(data[DB.DISPLAY_NAME]); 
                    setPhotoURL(data[DB.PHOTO_URL]); 
                }
            })
        }

        return () => {
            if (unsubscribe) unsubscribe(); 
        }
    }, [authUser])

    const handleClick = (e) => setAnchorEl(e.currentTarget);

    const handleClose = () => setAnchorEl(null);

    const handleSignUp = () => {
        // Log analytics event
        firebase.analytics().logEvent('select_content', {
            content_id: CONTENT_ID.ACCOUNT_BUTTON_NOTIF_SIGN_UP_BUTTON,
            content_type: CONTENT_TYPE.BUTTON
        })

        // Push route to signup page
        router.push(ROUTES.SIGN_UP);
    }

    return (
        <div>
            <IconButton
                onClick={handleClick}
                edge="end"
                color="inherit"
            >
                <UserAvatar
                    displayName={displayName}
                    photoURL={photoURL}
                />
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
                onClick={handleClose}
            >
                <div>
                    <div className={classes.text}>
                        <FormControl>
                            <InputBase
                                className={classes.displayName}
                                readOnly
                                value={displayName}
                                startAdornment={
                                    <InputAdornment position="start">
                                        <UserAvatar
                                            displayName={displayName}
                                            photoURL={photoURL}
                                        />
                                    </InputAdornment>
                                }
                            />
                        </FormControl>
                        {authUser && authUser.isAnonymous ? (
                            <div>
                                <Typography variant="body1" display="block" gutterBottom>
                                    You are <strong className={classes.anonymous}>anonymous {displayName}</strong>.
                           </Typography>
                                <Typography variant="body2" gutterBottom>
                                    This is how you will appear to others in a checklist.
                           </Typography>
                                <Typography variant="body2" gutterBottom color="error">
                                    Checklists you create or open will only be remembered on this device. <Link component="button" variant="body2" onClick={handleSignUp}><strong>Create an account</strong></Link> to save your checklists and access them anywhere.
                           </Typography>
                            </div> 
                        ) : null}
                    </div>
                    <Divider/> 
                    {authUser && authUser.isAnonymous ? (
                        <SignInMenuItem/>
                    ) : (
                        <SignOutMenuItem/>
                    )}
                </div>
            </Menu>
        </div>
    )
}