import * as DB from '../../constants/db'; 
import * as ROUTES from '../../constants/routes'; 
import { useRouter } from 'next/router'

export default function UserProjectsMenuListRow(props) {
    const { userProject } = props;
    const router = useRouter();

    return (
        <a onClick={() => router.push(ROUTES.PROJECT(userProject[DB.ID]))}>
            <p className="is-size-5">
                {userProject[DB.TITLE]}
            </p>
        </a>
    )
}