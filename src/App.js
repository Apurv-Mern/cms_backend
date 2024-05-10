
import Roles from './components/Roles';
import './App.css';

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Users from './components/User/Users';
import Home from './components/Home';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}>  </Route>
        <Route path="/roles" element={<Roles />}>  </Route>
        <Route path="/users" element={<Users />}>  </Route>
       </Routes>
    </BrowserRouter>
  );
}

export default App;
