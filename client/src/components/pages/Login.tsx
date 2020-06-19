import React from 'react'
import AuthForm from '../AuthForm'
import Button from "@material-ui/core/Button";
import Card from '@material-ui/core/Card';
import {useHttp} from '../../hooks/httpHook'
import { makeStyles } from '@material-ui/core/styles';
import { IauthFormState, submitClickActionCreator } from '../../reducers/authFormReducer'
import { IauthState, loginActionCreator, logoutActionCreator } from '../../reducers/authReducer'


interface IloginProps  {
  authFormState: IauthFormState,
  authFormDispatch: any,
  authState: IauthState,
  authDispatch: any,
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



const Login: React.FC<IloginProps> = ({authFormState, authFormDispatch, authState, authDispatch}) => {

  const {loading, request, error, clearError} = useHttp()

  const classes = useStyles()

  const loginHandler = async () => {
    authFormDispatch(submitClickActionCreator())
    try {
      const data = await request('api/auth/login', 'POST', {email: authFormState.email, 
                                                             password: authFormState.password})
      authDispatch(loginActionCreator(data.token))
      console.log('REQUEST')
    } catch (e) {}
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