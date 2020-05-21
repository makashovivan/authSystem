
const LOGIN = 'LOGIN'
const LOGOUT = 'LOGOUT'
export const storageName = 'userData'

export interface IauthState {
  isAuth: boolean,
  token: any,
 
}

interface IauthAction {
  type: string,
  token?: any,
}

export const authInitialState: IauthState = {
  isAuth: false,
  token: null,
}

const authReducer = (state: IauthState, action: IauthAction) => {
  switch (action.type) {
    
    case LOGIN:
      state.token = action.token
      localStorage.setItem(storageName, JSON.stringify({
        token: action.token
      }))
      return {...state}

    case LOGOUT:
      state.token = null
      localStorage.removeItem(storageName)
      return {...state}

    default:
      return {...state}
  }
}

export default authReducer

export const loginActionCreator = (token: any) => ({type: LOGIN, token})
export const logoutActionCreator = () => ({type: LOGOUT})
