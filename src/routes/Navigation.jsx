import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import AddUser from "../pages/Master/User/AddUser/AddUser";
import Login from "../pages/Login/Login";
import Roles from "../pages/Roles/Roles";
import DisplayUser from "../pages/Master/User/DisplayUser/DisplayUser";
import NotFound from "../components/NotFound";
import ProtectedRoute from "../components/ProtectedRoutes";
import RequestPasswordReset from "../pages/RequestPasswordReset/RequestPasswordReset";
import ResetPassword from "../pages/ResetPassword/ResetPassword";
import DashBoard from "../pages/Dashboard/DashBoard";
import EditUser from "../pages/Master/User/EditUser/EditUser";
import Header from "../components/Headers/Headers";

const Navigation = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === "/"|| location.pathname === '/request-password-reset' || location.pathname.startsWith('/reset-password/');;

  return (
    <>
      {isLoginPage ? (
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/request-password-reset"
            element={<RequestPasswordReset />}
          />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      ) : (
        <div className="layout-wrapper layout-content-navbar">
          <div className="layout-container">
            <Header />
            <div className="layout-page">
              <div className="content-wrapper">
                <div className="container-xxl">
                  <Routes>
                    <Route path="/roles" element={<Roles />} />
                    <Route
                      path="/dashboard"
                      element={
                        <ProtectedRoute>
                          <DashBoard />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/users/create"
                      element={
                        <ProtectedRoute>
                          <AddUser />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/update/user/:userId"
                      element={
                        <ProtectedRoute>
                          <EditUser />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/admin/users"
                      element={
                        <ProtectedRoute>
                          <DisplayUser />
                        </ProtectedRoute>
                      }
                    />

                    <Route
                      path="/admin"
                      element={
                        <ProtectedRoute>
                          <DisplayUser />
                        </ProtectedRoute>
                      }
                    />
                       <Route path="*" element={<NotFound />} />
                  </Routes>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navigation;
