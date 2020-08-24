import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { logout, isAuthenticated }  from '../../lib/auth'

const SecureRoute = ({ component: Component, ...rest }) => {
  if (isAuthenticated()) return <Route {...rest} component={Component}/>
  logout()
  return <Redirect to="/login"/>
}

export default SecureRoute
