import * as ROUTES from '../../constants/routes'
import { useRouter } from 'next/router'
import SignInButton from './SignInButton'
import SignUpButton from './SignUpButton'
import SignOutButton from './SignOutButton'
import { AuthUserContext } from '../Session'
import { useContext } from 'react'

export default function AuthenticationButtons() {
    const router = useRouter();
    const authUser = useContext(AuthUserContext); 

    return (
        router.pathname === ROUTES.SIGN_IN || router.pathname === ROUTES.SIGN_UP ? null
            : authUser && authUser.isAnonymous ? (
                <div className="buttons">
                    <SignUpButton />
                    <SignInButton />
                </div>
            ) : (
                    <SignOutButton />
                )

    )
}