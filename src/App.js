import React, { Component } from 'react';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'
import { fakeAuth } from './config/config';
import Login from './components/Login'
import Home from './components/Home'
import Cart from './components/Cart'
import { PrivateRoute } from './components/PrivateRoute'

class App extends Component {
  render() {
    return (
      //to pass props to a component through Route component, follow Login component approach as shown below
      <BrowserRouter>
        <div className="App">
            <Switch>
              <Route exact path="/" render={(props) => <Login {...props} fakeAuth={fakeAuth} />} />
              <PrivateRoute path="/home" component={Home}/>
              <PrivateRoute path="/cart" component={Cart}/>
            </Switch>
          </div>
       </BrowserRouter>
    );
  }
}

export default App;
