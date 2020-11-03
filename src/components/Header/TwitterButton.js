import * as SOCIAL from '../../constants/social'
import * as CONTENT_TYPE from '../../constants/contentType'
import * as CONTENT_ID from '../../constants/contentId'
import { firebase } from '../../lib/firebase'

export default function TwitterButton() {
    const handleClick = () => {
        firebase.analytics().logEvent('select_content', {
            content_id: CONTENT_ID.HEADER_TWITTER_BUTTON,
            content_type: CONTENT_TYPE.BUTTON
        })
    }

    return (
        <a href={SOCIAL.TWITTER} target="_blank" onClick={handleClick}>
            <span className="icon is-large">
                <i className="fab fa-twitter fa-lg"></i>
            </span>
        </a>
    )
}