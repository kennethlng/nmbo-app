import { useRouter } from 'next/router'
import * as ROUTES from '../../constants/routes'
import * as CONTENT_TYPE from '../../constants/contentType'
import * as CONTENT_ID from '../../constants/contentId'
import { firebase } from '../../lib/firebase'
import Button from '@material-ui/core/Button'

export default function SignUpButton() {
    const router = useRouter();

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
        <Button 
            variant="outlined" 
            color="primary" 
            onClick={handleClick}
            disableRipple
        >
            Create account
        </Button>
    )
}