import Button from '@material-ui/core/Button'; 
import Menu from '@material-ui/core/Menu';
import { useContext, useState } from 'react';
import { AuthUserContext } from '../Session'
import SignOutMenuItem from './SignOutMenuItem'
import SignInMenuItem from './SignInMenuItem'
import SignUpMenuItem from './SignUpMenuItem'

export default function AccountButton() {
    const authUser = useContext(AuthUserContext); 
    const [anchorEl, setAnchorEl] = useState(null); 
    const open = Boolean(anchorEl);

    const handleClick = (e) => {
        setAnchorEl(e.currentTarget);
    }

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <Button
                onClick={handleClick}
                disableElevation
                disableRipple
                variant="contained"
            >
                Sus 🦁
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
                        <SignUpMenuItem/>
                        <SignInMenuItem/>
                    </div>
                ) : <SignOutMenuItem/>}
            </Menu>
        </div>
    )
}