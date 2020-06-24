import React, {useEffect, useReducer} from 'react'
import {Route, Redirect, Switch, useHistory} from 'react-router-dom'

import Documents from './pages/Documents'
import Register from './pages/Register'
import Login from './pages/Login' 

import authReducer, {authInitialState, storageName, loginActionCreator, logoutActionCreator} from '../reducers/authReducer'
import authFormReducer, {authFormInitialState} from '../reducers/authFormReducer'
import toastReducer, {toastInitialState, closeToastActionCreator} from '../reducers/toastReducer'

import './App.css'
import Button from "@material-ui/core/Button";
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';

const Alert = (props: AlertProps) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}


const App : React.FC = () => {

  const [authState, authDispatch] = useReducer(authReducer, authInitialState)
  const [authFormState, authFormDispatch] = useReducer(authFormReducer, authFormInitialState)
  const [toastState, toastDispatch] = useReducer(toastReducer, toastInitialState)
  const history = useHistory()

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(storageName)!)
    if (data && data.token) {
      authDispatch(loginActionCreator(data.token))
    }
  }, [authDispatch])

  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          {authState.isAuth ? 
          <Button onClick = {() => authDispatch(logoutActionCreator())} color="inherit">Logout</Button>
          :
          <div>
            <Button onClick = {() => history.push('/login')} color="inherit">Login</Button>
            <Button onClick = {() => history.push('/register')} color="inherit">Register</Button>
          </div>
          } 
        </Toolbar>
      </AppBar>       
      {authState.isAuth ? 
      <Switch>
        <Route exact path = '/documents'>
          <Documents authState = {authState} authDispatch = {authDispatch} toastDispatch = {toastDispatch}/>
        </Route>
        <Redirect to = '/documents'/>
      </Switch>
      
    : 
      <Switch>
        <Route exact path = '/register'>
          <Register authFormState = {authFormState} authFormDispatch = {authFormDispatch} toastDispatch = {toastDispatch}/>
        </Route>
        <Route exact path = '/login'>
          <Login authFormState = {authFormState}
                 authFormDispatch = {authFormDispatch}
                 authState = {authState}
                 authDispatch = {authDispatch}
                 toastDispatch = {toastDispatch}
          />
        </Route>
        <Redirect to = '/register'/>
      </Switch>
    }
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
          }}
          open={toastState.isToast}
          onClose={() => toastDispatch(closeToastActionCreator())}
          autoHideDuration={3000}
          
      >
        <Alert onClose={() => toastDispatch(closeToastActionCreator())} severity = {toastState.severity}>
          {toastState.message}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default App;

