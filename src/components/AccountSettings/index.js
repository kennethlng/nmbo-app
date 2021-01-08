import { AuthUserContext } from '../Session';
import { useContext, useState, useEffect } from 'react'
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button'; 
import Typography from '@material-ui/core/Typography'; 
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Link from '@material-ui/core/Link';
import * as EmailValidator from 'email-validator'
import { auth } from '../../lib/firebase';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    passwords: {
        '& .MuiTextField-root': {
            marginBottom: theme.spacing(1)
        },
        marginTop: theme.spacing(2)
    },
}));

export default function AccountSettings() {
    const authUser = useContext(AuthUserContext); 
    const classes = useStyles(); 
    const [email, setEmail] = useState(''); 
    const [currentEmail, setCurrentEmail] = useState(''); 
    const [oldPassword, setOldPassword] = useState(''); 
    const [newPassword, setNewPassword] = useState(''); 
    const [retypePassword, setRetypePassword] = useState(''); 
    const [loading, setLoading] = useState(false); 

    useEffect(() => {
        if (authUser) {
            setEmail(authUser.email); 
            setCurrentEmail(authUser.email); 
        }
    }, [authUser])

    const handleEmailChange = e => setEmail(e.target.value); 

    const reauthenticate = () => {
        auth.currentUser.reauthenticate
    }

    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <FormControl fullWidth variant="outlined">
                    <InputLabel>Email</InputLabel>
                    <OutlinedInput
                        type="email"
                        value={email}
                        onChange={handleEmailChange}
                        endAdornment={
                            <InputAdornment position="end">
                                <Button
                                    color="primary"
                                    disabled={!(email !== currentEmail && EmailValidator.validate(email))}
                                >
                                    Save
                                </Button>
                            </InputAdornment>
                        }
                        labelWidth={40}
                    />
                </FormControl>
            </Grid>
            <Grid item xs={12}>
                <Typography variant="h6">
                    Change password
                </Typography>
                <form noValidate className={classes.passwords}>
                    <TextField
                        variant="outlined"
                        fullWidth
                        type="password"
                        label="Current password"
                        name="current password"
                        helperText={<Link component="button">Forgot password?</Link>}
                        value={oldPassword}
                        // onChange={}
                    />
                    <TextField
                        variant="outlined"
                        fullWidth
                        type="password"
                        label="New password"
                        name="new password"
                        value={newPassword}
                        // onChange={}
                    />
                    <TextField
                        variant="outlined"
                        fullWidth
                        type="password"
                        label="Retype password"
                        name="retype password"
                        value={retypePassword}
                        // onChange={}
                    />
                </form>
            </Grid>
        </Grid>
    )
}