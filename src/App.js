
import Roles from './components/Roles/Roles';
import './App.css';

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Users from './components/User/Users';
import Home from './components/Home';

function App() {
  return (
   
      <Routes>
        <Route path="/" element={<Home/>} />  
        <Route path="/roles" element={<Roles />} /> 
        <Route path="/users" element={<Users />} />  
       </Routes>
  );
}

export default App;
