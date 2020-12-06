import Button from '@material-ui/core/Button'; 
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
import ArchiveMenuItem from './ArchiveMenuItem';
import { getDisplayNameEmojiAvatar } from '../../lib/getDisplayNameEmojiAvatar';
import { useRouter } from 'next/router';
import * as DB from '../../constants/db';
import * as ROUTES from '../../constants/routes';
import * as CONTENT_ID from '../../constants/contentId'; 
import * as CONTENT_TYPE from '../../constants/contentType'; 
import { firebase, db } from '../../lib/firebase'; 

const useStyles = makeStyles(theme => ({
    avatar: {
        width: theme.spacing(3),
        height: theme.spacing(3),
        backgroundColor: 'transparent'
    },
    text: {
        padding: theme.spacing(2)
    },
    anonymous: {
        color: theme.palette.secondary.main
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
            <Button
                onClick={handleClick}
                disableElevation
                disableRipple
                color={authUser && authUser.isAnonymous ? "secondary" : "default"}
                startIcon={(
                    <Avatar
                        className={classes.avatar}
                        alt={displayName}
                        src={photoURL}
                    >
                        {getDisplayNameEmojiAvatar(displayName)}
                    </Avatar>
                )}
            >
                {displayName}
            </Button>
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
                {authUser && authUser.isAnonymous ? (
                    <div>
                        <div className={classes.text}>
                            <Typography  variant="body1" display="block" gutterBottom>
                                You are <strong className={classes.anonymous}>anonymous</strong>. 
                            </Typography>
                            <Typography variant="body2" gutterBottom>
                                Checklists you create or open will only be remembered on this device.
                            </Typography>
                            <Typography variant="body2">
                                <Link component="button" variant="body2" onClick={handleSignUp}>Create an account</Link> to save your checklists and access them anywhere.
                            </Typography>
                        </div>
                        {/* <Divider/> 
                        <ArchiveMenuItem/> */}
                        <Divider/> 
                        {/* <SignUpMenuItem/> */}
                        <SignInMenuItem/>
                    </div>
                ) : (
                    <div>
                        {/* <ArchiveMenuItem/>
                        <Divider/> */}
                        <SignOutMenuItem/>
                    </div>
                )}
            </Menu>
        </div>
    )
}