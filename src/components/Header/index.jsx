import * as React from 'react'
import LogoNavBarItemButton from './LogoNavBarItemButton'
import AboutNavBarItemButton from './AboutNavBarItemButton'
import FeedbackNavBarItemButton from './FeedbackNavBarItemButton'
import SignInButton from './SignInButton'
import SignUpButton from './SignUpButton'
import { AuthUserContext } from '../Session'
import { useRouter } from 'next/router'
import * as ROUTES from '../../constants/routes'
import AccountNavbarItemDropdown from './AccoutNavbarItemDropdown'

const Header = () => {
  const authUser = React.useContext(AuthUserContext); 
  const router = useRouter(); 
  const [menuIsActive, setMenuIsActive] = React.useState(false); 

  return (
    <header>
      <nav className="navbar is-transparent is-spaced" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <LogoNavBarItemButton/>

          <a role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample" onClick={() => setMenuIsActive(!menuIsActive)}>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <div id="navbarBasicExample" className={`navbar-menu ${menuIsActive ? 'is-active' : ''}`} onClick={() => setMenuIsActive(false)}>
          <div className="navbar-start">
            
          </div>

          <div className="navbar-end">
            <AboutNavBarItemButton />
            <FeedbackNavBarItemButton />
            {router.pathname === ROUTES.SIGN_IN || router.pathname === ROUTES.SIGN_UP ? null
              : authUser && authUser.isAnonymous ? (
                <div className="navbar-item">
                  <div className="buttons">
                    <SignUpButton />
                    <SignInButton />
                  </div>
                </div>
              ) : <AccountNavbarItemDropdown/>
            }
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header
