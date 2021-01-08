import { useRouter } from 'next/router'
import * as ROUTES from '../../constants/routes'
import * as CONTENT_TYPE from '../../constants/contentType'
import * as CONTENT_ID from '../../constants/contentId'
import { firebase } from '../../lib/firebase'
import MenuItem from '@material-ui/core/MenuItem';
import { AppStateContext } from '../AppState'
import { useContext } from 'react'

export default function SettingsMenuItem() {
    const router = useRouter();
    const appState = useContext(AppStateContext); 

    const handleClick = () => {
        // // Log Google Analytics event for button click 
        // firebase.analytics().logEvent('select_content', {
        //     content_type: CONTENT_TYPE.BUTTON,
        //     content_id: CONTENT_ID.HEADER_SIGN_IN_BUTTON
        // })

        // Push route
        // router.push(ROUTES.SETTINGS)
        appState.setSettingsOpen(true); 
    }

    return (
        <MenuItem 
            onClick={handleClick}
        >
            ⚙️ Settings
        </MenuItem>
    )
}