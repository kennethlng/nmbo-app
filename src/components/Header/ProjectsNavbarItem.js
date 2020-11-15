import * as ROUTES from '../../constants/routes'
import { useRouter } from 'next/router'
import { firebase } from '../../lib/firebase'
import * as CONTENT_ID from '../../constants/contentId'
import * as CONTENT_TYPE from '../../constants/contentType'

export default function ProjectsNavbarItem() {
    const router = useRouter(); 

    const handleClick = () => {
        // Log button click event
        firebase.analytics().logEvent('select_content', {
            content_id: CONTENT_ID.HEADER_PROJECTS_BUTTON,
            content_type: CONTENT_TYPE.BUTTON
        })

        // Push route
        router.push(ROUTES.PROJECTS);
    }

    return (
        <a className="navbar-item" onClick={handleClick}>
            <span className="icon">
                <i className="fas fa-tasks" aria-hidden></i>
            </span>
            <span>
                My checklists
            </span>
        </a>
    )
}