import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Notification from 'react-notify-toast'

import Home from './components/common/Home'
import Navbar from './components/common/Navbar'
import Register from './components/auth/Register'
import Login from './components/auth/Login'

import SpotIndex from './components/spots/SpotIndex'
import SpotShow from './components/spots/SpotShow'
import SpotNew from './components/spots/SpotNew'
import SpotEdit from './components/spots/SpotEdit'

// import SpotMap from './components/spots/SpotMap'

import GroupIndex from './components/groups/GroupIndex'
import GroupShow from './components/groups/GroupShow'
import GroupNew from './components/groups/GroupNew'
import GroupEdit from './components/groups/GroupEdit'

import UserIndex from './components/users/UserIndex'
import UserShow from './components/users/UserShow'

import ErrorPage from './components/common/ErrorPage'


const App = () => (
  <BrowserRouter>
    <main>
      {/* <SpotMap /> */}
      <Notification />
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
      
        <Route path="/surfspots/:id/edit" component={SpotEdit} />
        <Route path="/surfspots/new" component={SpotNew} />
        <Route path="/surfspots/:id" component={SpotShow} />
        <Route path="/surfspots" component={SpotIndex} />
        {/* <Route path="/surfspots/map" component={SpotMap} />   */}

        <Route path="/groups/:id/edit" component={GroupEdit} /> 
        <Route path="/groups/new" component={GroupNew} /> 
        <Route path="/groups/:id" component={GroupShow} /> 
        <Route path="/groups" component={GroupIndex} /> 

        <Route path="/users/:id" component={UserShow} />
        <Route path="/users" component={UserIndex} />

        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <Route path="/*" component={ErrorPage} />
      </Switch>
    </main>
  </BrowserRouter>
)

export default App