import React from 'react'
import { BrowserRouter, Switch , Route } from 'react-router-dom'

import Home from './components/common/Home'

import SpotIndex from './components/spots/SpotIndex'
import SpotShow from './components/spots/SpotShow'
import SpotNew from './components/spots/SpotNew'
import SpotEdit from './components/spots/SpotEdit'

import GroupIndex from './components/groups/GroupIndex'
import GroupShow from './components/groups/GroupShow'
import GroupNew from './components/groups/GroupNew'
import GroupEdit from './components/groups/GroupEdit'

import UserIndex from './components/users/UserIndex'
import UserShow from './components/users/UserShow'

import Register from './components/auth/Register'
import Login from './components/auth/Login'
import ErrorPage from './components/common/ErrorPage'



const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Home} />
    
      <Route path="/spots/:id/edit" component={SpotEdit} />
      <Route path="/spots/new" component={SpotNew} />
      <Route path="/spots/:id" component={SpotShow} />
      <Route path="/spots" component={SpotIndex} />

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
  </BrowserRouter>
)

export default App



// class App extends React.Component {
//   async componentDidMount() {
//     try {
//       const res = await axios.get('/api/surfspots')
//       console.log(res.data)
//     } catch (err) {
//       console.log(err)
//     }
//   } 

// render() {
//   return <h1>Nalu here we are</h1>
//   }
// }



