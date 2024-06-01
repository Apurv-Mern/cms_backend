import React from 'react'
import {  Routes, Route } from "react-router-dom";
import AddUser from '../pages/AddUser/AddUser';
import Login from '../pages/Login/Login';
import Roles from '../pages/Roles/Roles';
import DisplayUser from '../pages/DisplayUser/DisplayUser';
import NotFound from '../components/NotFound';
import ProtectedRoute from '../components/ProtectedRoutes';
import RequestPasswordReset from '../pages/RequestPasswordReset/RequestPasswordReset';
import ResetPassword from '../pages/ResetPassword/ResetPassword';
import DashBoard from '../pages/Dashboard/DashBoard';
import EditUser from '../pages/EditUser/EditUser';
const Navigation = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login/>} />  
        <Route path="/roles" element={<Roles />} /> 
        <Route path="/dashboard" element={<ProtectedRoute><DashBoard/></ProtectedRoute>} />
        <Route path="/users/create" element={<ProtectedRoute><AddUser/></ProtectedRoute>} />  
        <Route path="/update/user" element={<ProtectedRoute><EditUser/></ProtectedRoute>} />  
        <Route path="/admin/users"  element={<ProtectedRoute><DisplayUser /></ProtectedRoute>} />
       
        <Route path="/admin" element={<ProtectedRoute><DisplayUser /></ProtectedRoute>} />
        <Route path="/request-password-reset" element={<RequestPasswordReset/>} />
        <Route path="/reset-password/:token" element={<ResetPassword/>} />
        <Route path="*" element={<NotFound/>}/>
       </Routes>
    </div>                           
  )
}

export default Navigation
