import * as CONTENT_TYPE from '../../constants/contentType'
import * as CONTENT_ID from '../../constants/contentId'
import * as SOCIAL from '../../constants/social'
import { firebase } from '../../lib/firebase'
import IconButton from '@material-ui/core/IconButton'
import Icon from '@material-ui/core/Icon'

export default function TwitterButton() {
    const handleClick = () => {
        firebase.analytics().logEvent('select_content', {
            content_id: CONTENT_ID.FOOTER_TWITTER_BUTTON,
            content_type: CONTENT_TYPE.BUTTON
        })

        // Open link
        window.open(SOCIAL.TWITTER, '_blank');
    }

    return (
        <IconButton onClick={handleClick}>
            <Icon className="fa fa-twitter" />
        </IconButton>
    )
}