import React from 'react'
import TextField from "@material-ui/core/TextField/";
import { IauthFormState, typeEmailActionCreator, typePasswordActionCreator } from '../reducers/authFormReducer'

interface IAuthFormProps  {
  authFormState: IauthFormState,
  authFormDispatch: any
}

const AuthForm: React.FC<IAuthFormProps> = ({authFormState, authFormDispatch}) => {

  return (
    <div>
      <br/>
      <TextField
        name="email"
        disabled= {authFormState.mailDisabled}
        label= "email"
        error = {authFormState.errors.isMailError}
        helperText={authFormState.errors.mailError}
        value={authFormState.email}
        onChange={e => authFormDispatch( typeEmailActionCreator(e.target.value))}
      />
      <br/>
      <TextField
        name = "password"
        disabled = {authFormState.passwordDisabled}
        label = "password"
        type = "password"
        error = {authFormState.errors.isPasswordError} 
        helperText={authFormState.errors.passwordError}
        value={authFormState.password}
        onChange={e => authFormDispatch( typePasswordActionCreator(e.target.value))}
      />
      <br/>
  </div>
  )
}

export default AuthForm