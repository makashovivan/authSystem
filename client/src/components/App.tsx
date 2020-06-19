import React, {useEffect, useReducer} from 'react'
import {Route, Redirect, Switch} from 'react-router-dom'
import DocumentCreating from './pages/DocumentCreating'
import Documents from './pages/Documents'
import Document from './pages/Document'
import Register from './pages/Register'
import Login from './pages/Login' 
import authReducer, {authInitialState, storageName, loginActionCreator} from '../reducers/authReducer'
import authFormReducer, {authFormInitialState} from '../reducers/authFormReducer'
import './App.css'


const App : React.FC = () => {

  
  const [authState, authDispatch] = useReducer(authReducer, authInitialState);
  const [authFormState, authFormDispatch] = useReducer(authFormReducer, authFormInitialState)

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(storageName)!)

    if (data && data.token) {
      loginActionCreator(data.token)
    }
  }, [])



  return (
    <div className="App">
      {authState.isAuth? 
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
      
    : 
      <Switch>
        <Route exact path = '/register'>
          <Register/>
        </Route>
        <Route exact path = '/login'>
          <Login authFormState = {authFormState} authFormDispatch = {authFormDispatch} authState = {authState} authDispatch = {authDispatch} />
        </Route>
        <Redirect to = '/login'/>
      </Switch>
    }
    </div>
  );
}

export default App;

