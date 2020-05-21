import React from 'react'
import AuthForm from '../AuthForm'

import { IauthFormState } from '../../reducers/authFormReducer'


interface IloginProps  {
  authFormState: IauthFormState,
  authFormDispatch: any
}

const Login: React.FC<IloginProps> = ({authFormState, authFormDispatch}) => {

  return (
    <div>
      <AuthForm authFormState = {authFormState} authFormDispatch = {authFormDispatch} />
    </div>
  )
}

export default Login