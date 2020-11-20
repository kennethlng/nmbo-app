import IconButton from '@material-ui/core/IconButton';
import SettingsIcon from '@material-ui/icons/Settings';
import Menu from '@material-ui/core/Menu';
import { useState } from 'react';
import SignOutMenuItem from './SignOutMenuItem'

export default function AccountButton() {
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
            <IconButton
                onClick={handleClick}
                color="inherit"
            >
                <SettingsIcon/>
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
                <SignOutMenuItem/>
            </Menu>
        </div>
    )
}