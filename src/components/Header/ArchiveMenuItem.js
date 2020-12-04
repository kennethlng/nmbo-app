import { useRouter } from 'next/router'
import MenuItem from '@material-ui/core/MenuItem'
import * as ROUTES from '../../constants/routes'
import * as CONTENT_ID from '../../constants/contentId'
import * as CONTENT_TYPE from '../../constants/contentType'
import { firebase } from '../../lib/firebase'

export default function ArchiveMenuItem() {
    const router = useRouter(); 

    const handleClick = () => {
        // Log analytics event
        firebase.analytics().logEvent('select_content', {
            content_id: CONTENT_ID.HEADER_PROJECTS_BUTTON,
            content_type: CONTENT_TYPE.BUTTON
        })

        // Push route
        router.push(ROUTES.PROJECTS);
    }

    return (
        <MenuItem
            onClick={handleClick}
        >
            🕙 Archive
        </MenuItem>
    )
}