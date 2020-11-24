import { useRouter } from 'next/router'
import * as ROUTES from '../../constants/routes'
import * as CONTENT_TYPE from '../../constants/contentType'
import * as CONTENT_ID from '../../constants/contentId'
import MenuItem from '@material-ui/core/MenuItem'

export default function ArchiveMenuItem() {
    const router = useRouter();

    const handleClick = () => {
        // Log Google Analytics event for button click 
        firebase.analytics().logEvent('select_content', {
            content_type: CONTENT_TYPE.BUTTON,
            content_id: CONTENT_ID.HEADER_ARCHIVE_BUTTON
        })

        // Push route
        router.push(ROUTES.PROJECTS)
    }

    return (
        <MenuItem 
            onClick={handleClick}
        >
            Archive
        </MenuItem>
    )
}