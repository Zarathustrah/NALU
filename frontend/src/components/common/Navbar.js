import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = ( ) => (
  
  <nav className="navbar" role="navigation" aria-label="main navigation">
    <div className="navbar-brand">
      <div className="navbar-item" href="">
        <img src="https://st2.depositphotos.com/2195902/5808/v/450/depositphotos_58087965-stock-illustration-white-shark.jpg" alt="shark" width="82" height="28"/>
      </div>
    </div>
    <div className="navbar-item">
      <div className="field is-grouped">
        <p className="control">
        <Link to="/" className="button" >
            <span className="icon">
              <i className="fas fa-twitter" aria-hidden="true"></i>
            </span>
            <span>Home</span>
          </Link >
          <Link to="/spots" className="button" >
            <span className="icon">
              <i className="fas fa-twitter" aria-hidden="true"></i>
            </span>
            <span>Destination</span>
          </Link >
          <Link to="/groups" className="button">
            <span className="icon">
              <i className="fas fa-twitter" aria-hidden="true"></i>
            </span>
            <span>GroupIndex</span>
          </Link >
          <Link to="/register" className="button">
            <span className="icon">
              <i className="fas fa-twitter" aria-hidden="true"></i>
            </span>
            <span>Register</span>
          </Link >
          <Link to="/login" className="button">
            <span className="icon">
              <i className="fas fa-twitter" aria-hidden="true"></i>
            </span>
            <span>Login</span>
          </Link>
        </p>
      </div>
    </div>
  </nav>


   


) 
export default Navbar