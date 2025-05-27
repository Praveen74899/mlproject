// App.js
import { useAppContext } from './context/AppContext';
import { Toaster } from 'react-hot-toast';
import {  Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ProductFrom from './component/ProjectForm';

function App() {
   const { isLoggedIn, setIsLoggedIn  } = useAppContext();
  return (
    <>
  <Toaster/>

    <Routes>
        <Route  path="/"element={ isLoggedIn ? (<Navigate to="/dashboard" />) : (<Login setIsLoggedIn={setIsLoggedIn} />)}/>
        <Route path="/dashboard" element={isLoggedIn ? (<Dashboard />) : (<Navigate to="/"/>)}/>
        <Route path="/productform" element={<ProductFrom/>} />
      </Routes>
    
    </>

      
    
  );
}

export default App;
