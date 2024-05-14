import React from 'react'
import {  Routes, Route } from "react-router-dom";
import Users from '../pages/AddUser/Users';
import Home from '../components/Home';
import Roles from '../pages/Roles/Roles';
const Navigation = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home/>} />  
        <Route path="/roles" element={<Roles />} /> 
        <Route path="/users" element={<Users />} />  
       </Routes>
    </div>
  )
}

export default Navigation
