import * as React from 'react'
import Link from 'next/link'
import * as SOCIAL from '../../constants/social'
import * as ROUTES from '../../constants/routes'
import { useRouter } from 'next/router'
import { AuthUserContext } from '../Session'
import Logo from '../Logo'
import SignOutButton from '../SignOutButton'
import SignInButton from '../SignInButton'
import SignUpButton from '../SignUpButton'

const Header = ({ pathname }) => {
  const [menuIsActive, setMenuIsActive] = React.useState(false); 
  const router = useRouter();
  const authUser = React.useContext(AuthUserContext);

  const handleLogoClick = () => {
    setMenuIsActive(false);

    if (location.pathname === ROUTES.HOME) {
      window.location.reload();
    } else {
      router.push(ROUTES.HOME);
    }
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
            <a className="navbar-item" onClick={() => router.push(ROUTES.ABOUT)}>
              About
            </a>
            
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

          <div className="navbar-end">
            <div className="navbar-item">
              {router.pathname === ROUTES.SIGN_IN || router.pathname === ROUTES.SIGN_UP ? null 
              : authUser && authUser.isAnonymous ? (
                <div className="buttons">
                  <SignUpButton/>
                  <SignInButton/>
                </div>
                ) : (
                  <SignOutButton/>
                )
              }
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header
