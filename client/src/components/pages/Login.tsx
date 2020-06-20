import React from 'react'
import AuthForm from '../AuthForm'

import {useHttp} from '../../hooks/httpHook'

import { IauthFormState, blockFormActionCreator, unBlockFormActionCreator } from '../../reducers/authFormReducer'
import { IauthState, loginActionCreator} from '../../reducers/authReducer'
import { openToastActionCreator } from '../../reducers/toastReducer'

import Button from "@material-ui/core/Button";
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';

interface IloginProps  {
  authFormState: IauthFormState,
  authFormDispatch: any,
  authState: IauthState,
  authDispatch: any,
  toastDispatch: any,
}

const useStyles = makeStyles({
  root: {
    margin: '0 auto',
    marginTop: 20,
    padding: 10,
    width : 275,
    height: 300,
    textAlign: 'center',
  },
  btn: {
    margin: 10
  }
})



const Login: React.FC<IloginProps> = ({authFormState, authFormDispatch, authState, authDispatch, toastDispatch}) => {

  const {loading, request, error, clearError} = useHttp()
  const classes = useStyles()

  const loginHandler = async () => {
    authFormDispatch(blockFormActionCreator())
    try {
      const data = await request('api/auth/login', 'POST', {email: authFormState.email, 
                                                             password: authFormState.password})
      authDispatch(loginActionCreator(data.token))
      authFormDispatch(unBlockFormActionCreator())
    } catch (e) {
      toastDispatch(openToastActionCreator(e.message, 'error'))
      authFormDispatch(unBlockFormActionCreator())
    }
  }

  return (
    <div>    
      <Card className= {classes.root}>
        <div>LOGIN PAGE</div>
        <AuthForm authFormState = {authFormState} authFormDispatch = {authFormDispatch} />
        <br/>
        <Button 
          className = {classes.btn}
          variant="contained"
          disabled = {authFormState.submitDisabled}
          onClick = {loginHandler}
          >Default
        </Button>
        <div>{authFormState.email + '  ' + authFormState.password}</div>
      </Card>
    </div>
  )
}

export default Login