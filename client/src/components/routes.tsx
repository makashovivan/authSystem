import React from 'react'
import {Route, Redirect, Switch} from 'react-router-dom'
import DocumentCreating from './pages/DocumentCreating'
import Documents from './pages/Documents'
import Document from './pages/Document'
import Register from './pages/Register'
import Login from './pages/Login'

const useRoutes = (isAuth : boolean)  => {
  if (isAuth){
    return (
      <Switch>
        <Route exact path = '/documentCreating'>
          <DocumentCreating/>
        </Route>
        <Route exact path = '/documents'>
          <Documents/>
        </Route>
        <Route exact path = '/documents/:id'>
        <Document/>
        </Route>
        <Redirect to = '/documents'/>
      </Switch>
      )
    }
    return(
      <Switch>
        <Route exact path = '/register'>
          <Register/>
        </Route>
        <Route exact path = '/login'>
          <Login/>
        </Route>
        <Redirect to = '/register'/>
      </Switch>
    )
}



export default  useRoutes