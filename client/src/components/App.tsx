import React, {useState} from 'react'
import './App.css' 
import useRoutes from './routes'


const App : React.FC = () => {

  const [isAuth, setIsAuth] = useState(false)

  return (
    <div className="App">
      {useRoutes(isAuth)}
    </div>
  );
}

export default App;
