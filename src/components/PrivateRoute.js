import React from 'react';
import { Route, Redirect } from 'react-router-dom'

export const PrivateRoute = ({ component: Component, ...rest }) => {
  let diffInHours = new Date().getHours() - new Date(localStorage.getItem('currentUserSession')).getHours()
  let diffInMinutes = new Date().getMinutes() - new Date(localStorage.getItem('currentUserSession')).getMinutes()
  // return(
  //     <Route {...rest} render={(props) => (
  //       ((diffInHours === 0 && diffInMinutes < 1) || (diffInHours < 0))
  //         ? <Component {...props} />
  //         : <Redirect to={{
  //             pathname: '/'
  //           }} />
  //     )} />
  // )}

  return(
    <Route {...rest} render={(props) => {
      if((diffInHours === 0 && diffInMinutes < 10) || (diffInHours < 0)) {
        return <Component {...props} />
      } else {
        alert('Session timeout');
        return <Redirect to={{
          pathname: '/'
        }} />
      }
    }} />
)}