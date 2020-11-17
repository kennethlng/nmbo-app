import * as React from 'react'
import LogoNavBarItemButton from './LogoNavBarItemButton'
import AboutNavBarItemButton from './AboutNavBarItemButton'
import FeedbackNavBarItemButton from './FeedbackNavBarItemButton'
import AccountNavbarItemDropdown from './AccoutNavbarItemDropdown'
import { useRouter } from 'next/router'
import * as ROUTES from '../../constants/routes'

const Header = () => {
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

          {router.pathname !== ROUTES.SIGN_IN && router.pathname !== ROUTES.SIGN_UP ? (
            <div className="navbar-end">
              <AboutNavBarItemButton />
              <FeedbackNavBarItemButton />
              <AccountNavbarItemDropdown />
            </div>
          ) : null}
        </div>
      </nav>
    </header>
  )
}

export default Header
