import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { logout, isAuthenticated } from '../../lib/auth'
import { popupNotification } from '../../lib/notification'

class Navbar extends React.Component {
  state = { 
    navbarOpen: false,
    spotsOpen: false,
    communityOpen: false,
    accountOpen: false,
  }

  handleNavToggle = tab => {
    if (tab === 'spots') {
      this.setState({
        spotsOpen: !this.state.spotsOpen,
        communityOpen: false,
        accountOpen: false
      })
    } else if (tab === 'community') {
      this.setState({
        spotsOpen: false,
        communityOpen: !this.state.communityOpen,
        accountOpen: false
      })
    } else if (tab === 'account') {
      this.setState({
        spotsOpen: false,
        communityOpen: false,
        accountOpen: !this.state.accountOpen
      })
    }
  }

  toggleNavbar = () => {
    this.setState({ navbarOpen: !this.state.navbarOpen })
  }

  handleLogout = () => {
    logout()
    popupNotification('Enjoy the ride!')
    this.props.history.push('/')
  }

  componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      this.setState({ navbarOpen: false })
    }
  }

  render() {
    const { navbarOpen, spotsOpen, communityOpen, accountOpen } = this.state
    // const surferID = getUserID()

    return (
      <nav className="navbar">
        <div className="container">
          <div className="navbar-brand">
            <Link to="/" className="navbar-item">N A L U</Link>
            <span onClick={this.toggleNavbar} className={`navbar-burger ${navbarOpen ? 'is-active' : ''}`}>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </span>
          </div>
          <div className={`navbar-menu ${navbarOpen? 'is-active' : ''}`}>
            <div className="navbar-end">
              {!isAuthenticated() && <Link to="/surfspots"><div className="navbar-item main-nav">World Spots</div></Link>}
              {isAuthenticated() && <div className={`navbar-item has-dropdown ${spotsOpen ? 'is-active' : ''}`} onClick={() => this.handleNavToggle('spots')}>
                <span className="main-nav">Spots</span>
                <div className="navbar-dropdown">
                  <Link to="/surfspots"><div className="navbar-item">All Spots</div></Link>
                  <Link to="/surfspots/new"><div className="navbar-item">Add New Spots</div></Link>
                </div>
              </div>}
              {!isAuthenticated() && <Link to="/groups" className="navbar-item">Community</Link>}
              {isAuthenticated() && <div className={`navbar-item has-dropdown ${communityOpen ? 'is-active' : ''}`} onClick={() => this.handleNavToggle('community')}>
                <span className="main-nav">Community</span>
                <div className="navbar-dropdown">
                  <Link to="/surfspots"><div className="navbar-item nav-color">Surfers</div></Link>
                  <Link to="/surfspots"><div className="navbar-item nav-color">Groups</div></Link>
                  <Link to="/surfspots/register"><div className="navbar-item nav-color">Add New Group</div></Link>
                </div>
              </div>}
              {!isAuthenticated() && <Link to="/login" className="navbar-item main-nav">Log In</Link>}
              {isAuthenticated() && <div className={`navbar-item has-dropdown ${accountOpen ? 'is-active' : ''}`} onClick={() => this.handleNavToggle('account')}>
                <span className="main-nav">Account</span>
                <div className="navbar-dropdown">
                  <Link to={`/surfspots/`}><div className="navbar-item nav-color">Profile</div></Link>
                  <span onClick={this.handleLogout} className="navbar-item nav-color">Log Out</span>
                </div>
              </div>}
            </div>
          </div>
        </div>
      </nav>
    )
  }
}


export default withRouter(Navbar)