import SignOutNavbarItem from './SignOutNavbarItem'

export default function AccountNavbarItemDropdown() {
    return (
        <div className="navbar-item has-dropdown is-hoverable">
            <a className="navbar-link has-background-white-ter">
                <span className="icon">
                    <i className="fas fa-user"></i>
                </span>
            </a>
            <div className="navbar-dropdown is-right is-boxed">
                <SignOutNavbarItem/>
            </div>
        </div>
    )
}