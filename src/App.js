import React from 'react';
import { BrowserRouter,Route,Switch } from 'react-router-dom';

import Login from './components/Login';
import Register from './components/Register';
import ListUsers from './components/ListUsers';
import Dashboard from './components/Dashboard';
import Leads from './components/Leads';
import PrivateRoute from './components/PrivateRoute';
import ServiceRequests from './components/ServiceRequests';
import Alert from './components/Alerts';

export default function App(){
  return(
    <BrowserRouter>
      <Switch>
          <Route exact path='/login' component={Login}></Route>
          <Route exact path='/' component={Login}></Route>
          <Route exact path='/register' component={Register}></Route>
          <Route exact path='/forgot-password' component={Login}></Route>
          <Route exact path='/alert' component={Alert}></Route>
          <PrivateRoute exact path='/dashboard' component={Dashboard}></PrivateRoute>
          <PrivateRoute exact path='/leads' component={Leads}></PrivateRoute>
          <PrivateRoute exact path='/users' component={ListUsers}></PrivateRoute>
          <PrivateRoute exact path='/service-requests' component={ServiceRequests}></PrivateRoute>
          <Route path='*' render={()=><p>404 NOT FOUND</p>}></Route>
      </Switch>
    </BrowserRouter>
  )
}
