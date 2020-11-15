import SignOutNavbarItem from './SignOutNavbarItem'
import ProjectsNavbarItem from './ProjectsNavbarItem'

export default function AccountNavbarItemDropdown() {
    return (
        <div className="navbar-item has-dropdown is-hoverable">
            <a className="navbar-link has-background-white-ter">
                <span className="icon">
                    <i className="fas fa-user" aria-hidden></i>
                </span>
            </a>
            <div className="navbar-dropdown is-right is-boxed">
                <ProjectsNavbarItem/>
                <hr className="navbar-divider"></hr>
                <SignOutNavbarItem/>
            </div>
        </div>
    )
}