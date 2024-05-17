import React from 'react'
import {  Routes, Route } from "react-router-dom";
import AddUser from '../pages/AddUser/AddUser';
import Login from '../pages/Login/Login';
import Roles from '../pages/Roles/Roles';
import DisplayUser from '../pages/DisplayUser/DisplayUser';
import NotFound from '../components/NotFound';
const Navigation = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login/>} />  
        <Route path="/roles" element={<Roles />} /> 
        <Route path="/users/create" element={<AddUser />} />  
        <Route path="/admin/users" element={<DisplayUser />} />
        <Route path="*" element={<NotFound/>}/>
       </Routes>
    </div>
  )
}

export default Navigation
