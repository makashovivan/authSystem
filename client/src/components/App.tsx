import React, {useEffect, useReducer} from 'react'
import './App.css' 
import useRoutes from './routes'
import authReducer, {authInitialState, storageName, loginActionCreator} from '../reducers/authReducer'

const App : React.FC = () => {

  const [authState, authDispatch] = useReducer(authReducer, authInitialState);


  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(storageName)!)

    if (data && data.token) {
      loginActionCreator(data.token)
    }
  }, [])



  return (
    <div className="App">
      {useRoutes(authState.isAuth)}
    </div>
  );
}

export default App;

