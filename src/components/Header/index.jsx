import * as React from 'react'
import LogoNavBarItemButton from './LogoNavBarItemButton'
import MessengerButton from './MessengerButton'
import EmailButton from './EmailButton'
import TwitterButton from './TwitterButton'
import AboutNavBarItemButton from './AboutNavBarItemButton'
import AuthenticationButtons from './AuthenticationButtons'
import FeedbackNavBarItemButton from './FeedbackNavBarItemButton'

const Header = () => {
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

        <div id="navbarBasicExample" className={`navbar-menu ${menuIsActive ? 'is-active' : ''}`}>
          <div className="navbar-start">
            <AboutNavBarItemButton />
            <div className="navbar-item has-dropdown is-hoverable">
              <a className="navbar-link">
                More
              </a>
              <div className="navbar-dropdown is-boxed">
                {/* <hr className="navbar-divider" /> */}
                <div className="navbar-item" onClick={() => setMenuIsActive(false)}>
                  <div className="field is-grouped">
                    <p className="control">
                      <EmailButton />
                      <MessengerButton />
                      <TwitterButton />
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="navbar-end">
            <FeedbackNavBarItemButton/>
            <div className="navbar-item">
              <AuthenticationButtons/>
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header
