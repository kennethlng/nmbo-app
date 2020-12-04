import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    form: {
        width: '100%'
    },
    submit: {
        margin: theme.spacing(2, 0, 2)
    }
}))

export default function EmailPasswordSubmitForm(props) {
    const classes = useStyles(); 
    const { email, password, emailHelp, passwordHelp, onEmailChange, onPasswordChange, onSubmit, disabled, submitText } = props;

    const handleEmailChange = (e) => {
        onEmailChange(e.target.value); 
    }

    const handlePasswordChange = (e) => {
        onPasswordChange(e.target.value); 
    }

    const handleSubmit = e => {
        e.preventDefault(); 

        onSubmit();
    }

    return (
        <form className={classes.form} onSubmit={handleSubmit}>
            <TextField
                email={email}
                variant="outlined"
                required
                margin="normal"
                fullWidth
                label="Email"
                name="email"
                autoComplete="email"
                disabled={disabled}
                helperText={emailHelp}
                error={emailHelp === '' ? false : true}
                onChange={handleEmailChange}
            />
            <TextField
                value={password}
                variant="outlined"
                required
                type="password"
                margin="normal"
                fullWidth
                label="Password"
                name="password"
                autoComplete="password"
                disabled={disabled}
                helperText={passwordHelp}
                error={passwordHelp === '' ? false : true}
                onChange={handlePasswordChange}
            />
            <Button
                className={classes.submit}
                type="submit"
                variant="contained"
                color="primary"
                disableElevation
                disableRipple
                fullWidth
                disabled={disabled}
                size="large"
            >
                {submitText}
            </Button>
        </form>
    )
}