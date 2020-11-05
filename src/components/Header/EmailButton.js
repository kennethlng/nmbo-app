import * as SOCIAL from '../../constants/social'
import * as CONTENT_TYPE from '../../constants/contentType'
import * as CONTENT_ID from '../../constants/contentId'
import { firebase } from '../../lib/firebase'

export default function EmailButton() {
    const handleClick = () => {
        firebase.analytics().logEvent('select_content', {
            content_id: CONTENT_ID.HEADER_EMAIL_BUTTON,
            content_type: CONTENT_TYPE.BUTTON
        })
    }

    return (
        <a href={`mailto:${SOCIAL.EMAIL}`} onClick={handleClick}>
            <span className="icon is-large">
                <i aria-hidden className="fas fa-envelope fa-lg"></i>
            </span>
        </a>
    )
}