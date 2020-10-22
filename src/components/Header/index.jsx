import * as React from 'react'
import Link from 'next/link'
import * as SOCIAL from '../../constants/social'
import * as ROUTES from '../../constants/routes'
import { useRouter } from 'next/router'
import { AuthUserContext } from '../Session'
import Logo from '../Logo'

const Header = ({ pathname }) => {
  const [menuIsActive, setMenuIsActive] = React.useState(false); 
  const router = useRouter();
  // const authUser = React.useContext(AuthUserContext);

  const handleLogoClick = () => {
    setMenuIsActive(false);

    if (location.pathname === ROUTES.HOME) {
      window.location.reload();
    } else {
      router.push(ROUTES.HOME);
    }
  }

  const handleSignOutClick = () => {
    firebase.signOut()
      .then(function () {
        // Sign-out successful.
        router.push(ROUTES.HOME);
      }).catch(function (error) {
        console.log("Error signing out: ", error)
      });
  }

  return (
    <header>
      <nav className="navbar is-transparent is-spaced" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <a className="navbar-item" onClick={handleLogoClick}>
            <Logo />
          </a>

          <a role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample" onClick={() => setMenuIsActive(!menuIsActive)}>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <div id="navbarBasicExample" className={`navbar-menu ${menuIsActive ? 'is-active' : ''}`}>
          <div className="navbar-start">
            <Link href="/">
              <a className="navbar-item" onClick={() => router.push(ROUTES.ABOUT)}>
                About
              </a>
            </Link>
            
            <div className="navbar-item has-dropdown is-hoverable">
              <a className="navbar-link">
                More
              </a>

              <div className="navbar-dropdown is-boxed">
                <a className="navbar-item" onClick={() => router.push(ROUTES.TERMS_OF_SERVICE)}>
                  Terms of Service
                </a>
                <a className="navbar-item" onClick={() => router.push(ROUTES.PRIVACY_POLICY)}>
                  Privacy Policy
                </a>
                <a className="navbar-item" onClick={() => router.push(ROUTES.FAQS)}>
                  FAQs
                </a>
                <hr className="navbar-divider" />
                <div className="navbar-item" onClick={() => setMenuIsActive(false)}>
                  <div className="field is-grouped">
                    <p className="control">
                      <a href={`mailto:${SOCIAL.EMAIL}`}>
                        <span className="icon is-large">
                          <i className="fas fa-envelope fa-lg"></i>
                        </span>
                      </a>
                      <a href={SOCIAL.MESSENGER} target="_blank">
                        <span className="icon is-large">
                          <i className="fab fa-facebook-messenger fa-lg"></i>
                        </span>
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* <div className="navbar-end">
            {authUser.isAnonymous ? (
              <div className="navbar-item">
                <div className="buttons">
                  <a className="button is-primary is-outlined has-text-weight-bold" onClick={() => router.push(ROUTES.SIGN_UP)}>
                    Create account
                  </a>
                  <a className="button is-light" onClick={() => router.push(ROUTES.SIGN_IN)}>
                    Log in
                  </a>
                </div>
              </div>
            ) : (
                <div className="navbar-item">
                  <div className="buttons">
                    <a className="button is-light" onClick={handleSignOutClick}>
                      Sign out
                    </a>
                  </div>
                </div>
              )}
          </div> */}
        </div>
      </nav>
    </header>
  )
}

export default Header
