import React from 'react'
import ReactDOM from 'react-dom'
import './styles/main.scss'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import 'bulma'

import Home from './components/common/Home'
import Navbar from './components/common/Navbar'
import UserShow from './components/users/UserShow'
import FailedPage from './components/common/FailedPage'
import UserMap from './components/users/UserMap'
import UserIndex from './components/users/UserIndex'

import Login from './components/auth/Login'
import Register from './components/auth/Register'
//import SecureRoute from '../lib/secureRoute'
// import ErrorPage from './components/common/ErrorPage'


const App = () => (
  <BrowserRouter>
    <>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/users/:id" component={UserShow} />
        <Route path="/map" component={UserMap} />
<<<<<<< HEAD
        <Route path="/users" component={UserIndex} />
        <Route path="/users/login" component={Login} />
<<<<<<< HEAD

=======
=======
        <Route path="/chefs" component={UserIndex} />
>>>>>>> development
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <Route path="/*" component={FailedPage} />
>>>>>>> development
      </Switch>
    </>
  </BrowserRouter>
)

ReactDOM.render(
  <App />,
  document.getElementById('root')
)