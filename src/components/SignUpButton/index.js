import { useRouter } from 'next/router'
import * as ROUTES from '../../constants/routes'

export default function SignUpButton() {
    const router = useRouter();

    return (
        <a className="button is-primary is-outlined has-text-weight-bold" onClick={() => router.push(ROUTES.SIGN_UP)}>
            Create account
        </a>
    )
}