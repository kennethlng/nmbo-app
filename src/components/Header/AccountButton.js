import Button from '@material-ui/core/Button'; 
import Menu from '@material-ui/core/Menu';
import { useContext, useEffect, useState } from 'react';
import { AuthUserContext } from '../Session'
import SignOutMenuItem from './SignOutMenuItem'
import SignInMenuItem from './SignInMenuItem'
import SignUpMenuItem from './SignUpMenuItem'
import { AppStateContext } from '../AppState'
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography'; 
import { auth } from '../../lib/firebase'
import IconButton from '@material-ui/core/IconButton';
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';

const useStyles = makeStyles(theme => ({
    text: {
        padding: theme.spacing(2)
    },
    anonymous: {
        color: theme.palette.secondary.main
    }
}))

export default function AccountButton() {
    const authUser = useContext(AuthUserContext); 
    const appState = useContext(AppStateContext); 
    const classes = useStyles(); 
    const [displayName, setDisplayName] = useState('');
    const [anchorEl, setAnchorEl] = useState(null); 
    const open = Boolean(anchorEl);

    // useEffect(() => {
    //     setDisplayName(authUser && authUser.displayName ? authUser.displayName : appState.displayName);
    // }, [authUser, appState.displayName])

    const handleClick = (e) => {
        setAnchorEl(e.currentTarget);
    }

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        // displayName ? (
            <div>
                <IconButton
                    disableRipple
                    onClick={handleClick}
                    color={authUser && authUser.isAnonymous ? "secondary" : "default"}
                >
                    <AccountCircleRoundedIcon/>
                </IconButton>
                {/* <Button
                    onClick={handleClick}
                    disableElevation
                    disableRipple
                    variant="contained"
                    color={authUser && authUser.isAnonymous ? "secondary" : "default"}
                >
                    {displayName}
                </Button> */}
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
                            <Typography className={classes.text} variant="body2" display="block">
                                You are currently signed in as an <strong className={classes.anonymous}>anonymous user</strong>. Create an account or log in to access your checklists anywhere you go.
                            </Typography>
                            <Divider/>
                            <SignUpMenuItem/>
                            <SignInMenuItem/>
                        </div>
                    ) : <SignOutMenuItem/>}
                </Menu>
            </div>
        // ) : null
    )
}