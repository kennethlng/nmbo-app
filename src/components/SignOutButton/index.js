import { auth } from '../../lib/firebase'
import { useRouter } from 'next/router'
import * as ROUTES from '../../constants/routes'

export default function SignOutButton() {
    const router = useRouter();

    const handleSignOutClick = () => {
        auth.signOut()
            .then(function () {
                // Sign-out successful.
                router.push(ROUTES.HOME);
            }).catch(function (error) {
                console.log("Error signing out: ", error)
            });
    }

    return (
        <a className="button is-light" onClick={handleSignOutClick}>
            Sign out
        </a>
    )
}