import { useRouter } from 'next/router'
import * as ROUTES from '../../constants/routes'

export default function SignInButton() {
    const router = useRouter();

    return (
        <a className="button is-light" onClick={() => router.push(ROUTES.SIGN_IN)}>
            Log in
        </a>
    )
}