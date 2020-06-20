const OPENTOAST = 'OPENTOAST'
const CLOSETOAST = 'CLOSETOAST'

export interface ItoastState {
  isToast: boolean, 
  message?: string, 
  severity?: 'success' | 'info' | 'warning' | 'error' | undefined,
}

interface ItoastAction {
  type: string,
  message?: string, 
  severity?: 'success' | 'info' | 'warning' | 'error' | undefined,
}

export const toastInitialState: ItoastState = {
  isToast: false, 
  message: '', 
  severity: 'info',
}

const toastReducer = (state: ItoastState, action: ItoastAction) => {
  switch (action.type) {
    
    case OPENTOAST:
      state.isToast = true
      state.message = action.message
      state.severity = action.severity
      return {...state}

    case CLOSETOAST:
      state.isToast = false
      return {...state}

    default:
      return {...state}
  }
}

export default toastReducer

export const openToastActionCreator = (message: string, severity: string) => ({type: OPENTOAST, message, severity})
export const closeToastActionCreator = () => ({type: CLOSETOAST})
