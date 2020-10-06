import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Notification from 'react-notify-toast'
import Home from './components/common/Home'
import Navbar from './components/common/Navbar'
import Register from './components/auth/Register'
import Login from './components/auth/Login'
import Profile from './components/common/Profile'
import SpotIndex from './components/spots/SpotIndex'
import SpotShow from './components/spots/SpotShow'
import SpotNew from './components/spots/SpotNew'
import SpotEdit from './components/spots/SpotEdit'

import UserIndex from './components/users/UserIndex'

import ErrorPage from './components/common/ErrorPage'
import SecureRoute from './components/common/SecureRoute'
const App = () => (
  <BrowserRouter>
    <main>
      <Notification />
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <SecureRoute path="/surfspots/:id/edit" component={SpotEdit} />
        <Route path="/surfspots/new" component={SpotNew} />
        <Route path="/surfspots/:id" component={SpotShow} />
        <Route path="/surfspots" component={SpotIndex} />
        <Route path="/users" component={UserIndex} />
        <SecureRoute exact path="/profile/:id" component={Profile} />
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <Route path="/*" component={ErrorPage} />
      </Switch>
    </main>
  </BrowserRouter>
)
export default App