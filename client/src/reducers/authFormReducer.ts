const TYPEEMAIL = 'TYPEEMAIL'
const TYPEPASSWORD = 'TYPEPASSWORD'
const SUBMITCLICK = 'SUBMITCLICK'

const MAILLERROR = 'mail error'
const PASSWORDERROR = 'password error'

const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/

export interface IauthFormState {
  email: string,
  password: string,
  errors: {
    isMailError: boolean,
    isPasswordError: boolean,
    mailError: string,
    passwordError: string
  },
  submitDisabled: boolean,
  mailDisabled: boolean,
  passwordDisabled: boolean
}
interface IauthAction {
  type: string,
  email?: string,
  password?: string,
}

export const authFormInitialState: IauthFormState = {
  email: '',
  password: '',
  errors: {
    isMailError: false,
    isPasswordError: false,
    mailError: '',
    passwordError: ''
  },
  submitDisabled: true,
  mailDisabled: false,
  passwordDisabled: false,
}

const checkCorrectness = (state: IauthFormState): boolean => {
  if ( !state.errors.isMailError && !state.errors.isPasswordError && !!(state.email.length) && !!(state.password.length)) return true
  return false
}
const authFormReducer = (state: IauthFormState, action: IauthAction) => {
  switch (action.type) {

    case SUBMITCLICK:
      state.passwordDisabled = true
      state.mailDisabled = true
      state.submitDisabled = true
      console.log(SUBMITCLICK)
      return {...state}

    case TYPEEMAIL:
      state.email = action.email!
      if (!state.email.match(emailPattern)) {
        state.errors.isMailError = true
        state.errors.mailError = MAILLERROR
      } else {
        state.errors.isMailError = false
        state.errors.mailError = ''
      }
      checkCorrectness(state) ? state.submitDisabled = false : state.submitDisabled = true
      return {...state}

    case TYPEPASSWORD:
      state.password = action.password!
      if (state.password.length < 5) {
        state.errors.isPasswordError = true
        state.errors.passwordError = PASSWORDERROR
      } else {
        state.errors.isPasswordError = false
        state.errors.passwordError = ''
      }
      checkCorrectness(state) ? state.submitDisabled = false : state.submitDisabled = true
      return {...state}

    default:
      return {...state}
  }
}

export default authFormReducer

export const typePasswordActionCreator = (password: string) => ({type: TYPEPASSWORD, password})
export const typeEmailActionCreator = (email: string) => ({type: TYPEEMAIL, email})
export const submitClickActionCreator = () => ({type: SUBMITCLICK})