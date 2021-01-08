import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box'; 
import { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import EditProfile from '../EditProfile';
import AccountSettings from '../AccountSettings'; 
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';

const styles = (theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
});

const DialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant="h4">{children}</Typography>
            {onClose ? (
                <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

function TabPanel(props) {
    const { children, value, index, ...other } = props; 

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box py={3}>
                    {children}
                </Box>
            )}
        </div>
    );
}

export default function SettingsDialog(props) {
    const { open, onClose } = props;
    const [value, setValue] = useState(0); 

    return (
        <Dialog open={open} onClose={() => onClose()}>
            <DialogTitle onClose={() => onClose()}>Settings</DialogTitle>
            <DialogContent>
                <Tabs
                    value={value}
                    onChange={(e, newVal) => setValue(newVal)}
                >
                    <Tab label="Edit profile"/>
                    <Tab label="Account settings"/>
                </Tabs>
                <TabPanel value={value} index={0}>
                    <EditProfile/>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <AccountSettings/>
                </TabPanel>
            </DialogContent>
        </Dialog>
    )
}