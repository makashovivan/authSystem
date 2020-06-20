const TYPEEMAIL = 'TYPEEMAIL'
const TYPEPASSWORD = 'TYPEPASSWORD'
const BLOCKFORM = 'BLOCKFORM'
const UNBLOCKFORM = 'UNBLOCKFORM'

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

    case BLOCKFORM:
      state.passwordDisabled = true
      state.mailDisabled = true
      state.submitDisabled = true
      return {...state}
    
    case UNBLOCKFORM:
      state.passwordDisabled = false
      state.mailDisabled = false
      state.submitDisabled = false
      state.email = ''
      state.password = ''
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
      state.submitDisabled = checkCorrectness(state) ? false : true
      return {...state}

    case TYPEPASSWORD:
      state.password = action.password!
      if (state.password.length < 7) {
        state.errors.isPasswordError = true
        state.errors.passwordError = PASSWORDERROR
      } else {
        state.errors.isPasswordError = false
        state.errors.passwordError = ''
      }
      state.submitDisabled = checkCorrectness(state) ? false : true
      return {...state}

    default:
      return {...state}
  }
}

export default authFormReducer

export const typePasswordActionCreator = (password: string) => ({type: TYPEPASSWORD, password})
export const typeEmailActionCreator = (email: string) => ({type: TYPEEMAIL, email})
export const blockFormActionCreator = () => ({type: BLOCKFORM})
export const unBlockFormActionCreator = () => ({type: UNBLOCKFORM})