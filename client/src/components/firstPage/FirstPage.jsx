import './FirstPage.css'
import { useAuth0 } from "@auth0/auth0-react";
import mainLogo from '../../static/images/main_logo.png'
import mainBackground from '../../static/images/main_bg.png'

export default function FirstPage() {
  const { loginWithRedirect } = useAuth0()

  return (
    <div className="first-page-wrapper">
      <div className="first-page-left">
        <div className="first-page-logo">
          <img src={mainLogo} alt="Main Logo" draggable={false} />
        </div>
        <div className="first-page-buttons">
          <div>
            <button className="first-page-button"
              onClick={() => loginWithRedirect({ appState: { targetUrl: window.location.pathname } })}>
              login
              </button>
          </div>
        </div>
      </div>
      <div className="first-page-right">
        <img src={mainBackground} alt="Main Logo" draggable={false} />
      </div>
    </div>
  )
}