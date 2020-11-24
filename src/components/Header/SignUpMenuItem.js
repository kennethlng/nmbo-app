import { useRouter } from 'next/router'
import * as ROUTES from '../../constants/routes'
import * as CONTENT_TYPE from '../../constants/contentType'
import * as CONTENT_ID from '../../constants/contentId'
import { firebase } from '../../lib/firebase'
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    text: {
        color: theme.palette.primary.main
    }
}))

export default function SignUpMenuItem() {
    const router = useRouter();
    const classes = useStyles(); 

    const handleClick = () => {
        // Log Google Analytics event for button click 
        firebase.analytics().logEvent('select_content', {
            content_type: CONTENT_TYPE.BUTTON,
            content_id: CONTENT_ID.HEADER_SIGN_UP_BUTTON
        })

        // Push route
        router.push(ROUTES.SIGN_UP)
    }

    return (
        <MenuItem
            className={classes.text}
            onClick={handleClick}
        >
            Create account
        </MenuItem>
    )
}