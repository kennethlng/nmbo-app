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
import * as ROUTES from '../../constants/routes';
import * as CONTENT_ID from '../../constants/contentId'; 
import * as CONTENT_TYPE from '../../constants/contentType'; 
import { firebase } from '../../lib/firebase'; 

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
    const [isAnonymous, setIsAnonymous] = useState(false); 
    const [photoURL, setPhotoURL] = useState(null); 
    const open = Boolean(anchorEl);
    const router = useRouter(); 

    useEffect(() => {
        if (authUser) {
            setDisplayName(authUser.displayName); 
            setPhotoURL(authUser.photoURL); 
            setIsAnonymous(authUser.isAnonymous); 
        }
    }, [authUser, authUser && authUser.displayName, authUser && authUser.photoURL, authUser && authUser.isAnonymous])

    const handleClick = (e) => {
        setAnchorEl(e.currentTarget);
    }

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleSignUp = () => {
        // Log analytics event
        firebase.analytics().logEvent('select_content', {
            content_id: CONTENT_ID.ACCOUNT_BUTTON_NOTIF_SIGN_UP_BUTTON,
            content_type: CONTENT_TYPE.BUTTON
        })

        // Push route
        router.push(ROUTES.SIGN_UP);
    }

    const handleSignIn = () => {
        // Log analytics event
        firebase.analytics().logEvent('select_content', {
            content_id: CONTENT_ID.ACCOUNT_BUTTON_NOTIF_SIGN_IN_BUTTON,
            content_type: CONTENT_TYPE.BUTTON
        })

        router.push(ROUTES.SIGN_IN);
    }

    return (
        <div>
            <Button
                onClick={handleClick}
                disableElevation
                disableRipple
                color={isAnonymous ? "secondary" : "default"}
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
                {isAnonymous ? (
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