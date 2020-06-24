import React, {useState} from 'react'
import AuthForm from '../AuthForm'
import { useHistory } from 'react-router-dom'

import { IauthFormState, blockFormActionCreator, unBlockFormActionCreator } from '../../reducers/authFormReducer'
import { openToastActionCreator, closeToastActionCreator } from '../../reducers/toastReducer'

import {useHttp} from '../../hooks/httpHook'

import Button from "@material-ui/core/Button";
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';

interface IRegisterProps  {
  authFormState: IauthFormState,
  authFormDispatch: any,
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

const Register: React.FC<IRegisterProps> = ({authFormState, authFormDispatch, toastDispatch}) => {

  const history = useHistory()
  const {loading, request, error, clearError} = useHttp()
  const classes = useStyles()

  const registerHandler = async () => {
    authFormDispatch(blockFormActionCreator())
    try {
      const data = await request('api/auth/register', 'POST', {email: authFormState.email, 
                                                             password: authFormState.password})
      toastDispatch(openToastActionCreator(data.message, 'success'))
      history.push('/login')
    } catch (e) {
      toastDispatch(openToastActionCreator(e.message, 'error'))
    } finally {
      authFormDispatch(unBlockFormActionCreator())
    }
  }


  return (
    <div>     
      <Card className= {classes.root}>
        <div>REGISTER PAGE</div>
        <AuthForm authFormState = {authFormState} authFormDispatch = {authFormDispatch} />
        <br/>
        <Button 
          className = {classes.btn}
          variant="contained"
          disabled = {authFormState.submitDisabled}
          onClick = {registerHandler}
          >Default
        </Button>
        <div>{authFormState.email + '  ' + authFormState.password}</div>
      </Card>
  </div>
  )
}

export default Register