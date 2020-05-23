import React from 'react'
import AuthForm from '../AuthForm'
import Button from "@material-ui/core/Button";
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import { IauthFormState, submitClickActionCreator } from '../../reducers/authFormReducer'


interface IloginProps  {
  authFormState: IauthFormState,
  authFormDispatch: any
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



const Login: React.FC<IloginProps> = ({authFormState, authFormDispatch}) => {

  const classes = useStyles()

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
          onClick = {() => authFormDispatch(submitClickActionCreator())}
          >Default
        </Button>
        <div>{authFormState.email + '  ' + authFormState.password}</div>
      </Card>
    </div>
  )
}

export default Login