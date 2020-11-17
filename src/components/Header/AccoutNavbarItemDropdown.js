import ProjectsNavbarItem from './ProjectsNavbarItem'
import SignOutNavbarItem from './SignOutNavbarItem'
import SignUpNavbarItem from './SignUpNavbarItem'
import SignInNavbarItem from './SignInNavbarItem'
import { AuthUserContext } from '../Session'
import { useRouter } from 'next/router'

export default function AccountNavbarItemDropdown() {
    const authUser = React.useContext(AuthUserContext); 
    const router = useRouter(); 

    return (
        <div className="navbar-item has-dropdown is-hoverable">
            <a className="navbar-link has-background-white-ter">
                😗
            </a>
            <div className="navbar-dropdown is-right is-boxed">
                <ProjectsNavbarItem/>
                <hr className="navbar-divider"></hr>
                {authUser && authUser.isAnonymous ? (
                    <div>
                        <SignUpNavbarItem/>
                        <SignInNavbarItem/>
                    </div>
                ) : <SignOutNavbarItem/>}
            </div>
        </div>
    )
}