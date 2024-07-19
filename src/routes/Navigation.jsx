import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import AddUser from "../pages/Master/User/AddUser";
import Login from "../pages/Auth/Login/Login";
import Roles from "../pages/Master/Role/DisplayRole";
import DisplayUser from "../pages/Master/User/DisplayUser";
import NotFound from "../components/NotFound";
import ProtectedRoute from "../components/ProtectedRoutes";
import RequestPasswordReset from "../pages/Auth/RequestPasswordReset";
import ResetPassword from "../pages/Auth/ResetPassword";

import EditUser from "../pages/Master/User/EditUser";
import Header from "../components/Headers/Headers";
import Settings from "../pages/Settings/Settings";

import EditRole from "../pages/Master/Role/EditRole";
import AddSetting from "../pages/Settings/AddSetting";
import UpdateSetting from "../pages/Settings/UpdateSetting";
import DashBoard from "../pages/DashBoard";
import Database from "../pages/Database/Database";
import AddDatabase from "../pages/Database/AddDatabase";
const Navigation = () => {
  const location = useLocation();
  const isLoginPage =
    location.pathname === "/" ||
    location.pathname === "/request-password-reset" ||
    location.pathname.startsWith("/reset-password/");

  // useEffect(() => {
  //   if (isLoginPage) {
  //     window.location.replace("/"); // Redirect to home if on login page
  //   }
  // }, []);

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
                    <Route
                      path="/database"
                      element={
                        <ProtectedRoute>
                          <Database />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/database/create"
                      element={
                        <ProtectedRoute>
                          <AddDatabase />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/dashboard"
                      element={
                        <ProtectedRoute>
                          <DashBoard />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/admin/roles"
                      element={
                        <ProtectedRoute>
                          <Roles />
                        </ProtectedRoute>
                      }
                    />

                    <Route
                      path="update/role/:roleId"
                      element={
                        <ProtectedRoute>
                          <EditRole />
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
                      path="/settings"
                      element={
                        <ProtectedRoute>
                          <Settings />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/settings/create"
                      element={
                        <ProtectedRoute>
                          <AddSetting />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/settings/update/:settingId"
                      element={
                        <ProtectedRoute>
                          <UpdateSetting />
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
