import React, { useEffect, useState } from "react";

import "./Headers.css";
import { Link, useParams } from "react-router-dom";
import { Button } from "@mui/material";
import useLogout from "../../pages/Auth/Logout";
import { useSelector, useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { fetchRolePermissions } from "../../redux/Slices/RoleSlice";
import {
  fetchPermissions,
  setPermissionNames,
  selectPermissionNames,
} from "../../redux/Slices/PermissionSlice";
const Header = () => {
  const dispatch = useDispatch();
  const permissions = useSelector((state) => state.permissions.permissions);
  console.log("permissions", permissions);
  const permissionNames = useSelector(selectPermissionNames) || [];
  const rolePermission = useSelector((state) => state.role.rolePermissions);

  console.log("role ki permission ", rolePermission);

  const logout = useLogout();

  const [userDetails, setUserDetails] = useState({
    firstName: "",
    lastName: "",
    roleName: "",
  });

  useEffect(() => {
    // Retrieve the string from the cookie
    const userCookieString = Cookies.get("user-details");
    if (userCookieString) {
      try {
        // Parse the string back to an object
        const userCookieData = JSON.parse(userCookieString);

        // Extract the name and roleName
        // Example of safe destructuring with default values
        const {
          firstName = "",
          lastName = "",
          roleName = "",
          roleId = "",
        } = userCookieData || {};
        dispatch(fetchRolePermissions(roleId));
        dispatch(fetchPermissions());

        // Format the first name and last name
        const formattedFirstName =
          firstName.charAt(0).toUpperCase() + firstName.slice(1);
        const formattedLastName =
          lastName && lastName.charAt(0).toUpperCase() + lastName.slice(1);

        console.log("role id", roleId);

        // Update state
        setUserDetails({
          firstName: formattedFirstName,
          lastName: formattedLastName,
          roleName: roleName,
        });
      } catch (error) {
        console.error("Error parsing user details cookie:", error);
      }
    } else {
      console.log("User details cookie is not set.");
    }
  }, []); // Empty dependency array ensures this runs only once

  // useEffect(() => {
  //   const toggleSidebar = () => {
  //     const sidebar = document.getElementById("layout-menu");
  //     sidebar.classList.toggle("hidden");
  //   };

  //   const sidebarToggle = document.getElementById("sidebarToggle");
  //   sidebarToggle.addEventListener("click", toggleSidebar);

  //   // Clean up the event listener on component unmount
  //   return () => {
  //     sidebarToggle.removeEventListener("click", toggleSidebar);
  //   };
  // }, [dispatch]);

  useEffect(() => {
    if (rolePermission.length > 0) {
      dispatch(setPermissionNames(rolePermission));
    }
  }, [dispatch, rolePermission]);

  console.log("permission Names", permissionNames);

  const hasSettingsRead = permissionNames.includes("settings_read");
  const hasUserRead = permissionNames.includes("user_read");
  const hasRoleRead = permissionNames.includes("role_read");

  console.log(
    "setting readdd ",
    hasSettingsRead,
    "has user read ",
    hasUserRead,
    "has role read ",
    hasRoleRead
  );
  return (
    <>
      <aside
        id="layout-menu"
        class="layout-menu menu-vertical menu bg-menu-theme"
      >
        <div class="app-brand demo ">
          <div class="app-brand-link">
            <span class="app-brand-text demo menu-text fw-semibold">CMS</span>
          </div>

          <div
            id="sidebarToggle"
            class="layout-menu-toggle menu-link text-large ms-auto"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.47365 11.7183C8.11707 12.0749 8.11707 12.6531 8.47365 13.0097L12.071 16.607C12.4615 16.9975 12.4615 17.6305 12.071 18.021C11.6805 18.4115 11.0475 18.4115 10.657 18.021L5.83009 13.1941C5.37164 12.7356 5.37164 11.9924 5.83009 11.5339L10.657 6.707C11.0475 6.31653 11.6805 6.31653 12.071 6.707C12.4615 7.09747 12.4615 7.73053 12.071 8.121L8.47365 11.7183Z"
                fillOpacity="0.9"
              />
              <path
                d="M14.3584 11.8336C14.0654 12.1266 14.0654 12.6014 14.3584 12.8944L18.071 16.607C18.4615 16.9975 18.4615 17.6305 18.071 18.021C17.6805 18.4115 17.0475 18.4115 16.657 18.021L11.6819 13.0459C11.3053 12.6693 11.3053 12.0587 11.6819 11.6821L16.657 6.707C17.0475 6.31653 17.6805 6.31653 18.071 6.707C18.4615 7.09747 18.4615 7.73053 18.071 8.121L14.3584 11.8336Z"
                fillOpacity="0.4"
              />
            </svg>
          </div>
        </div>

        <div class="menu-inner-shadow"></div>

        <ul class="menu-inner py-1">
          <li class="menu-item active">
            <Link to={"/dashboard"} class="menu-link">
              <i class="menu-icon tf-icons ri-home-smile-line"></i>
              <div data-i18n="Dashboards">Dashboard</div>
            </Link>
          </li>

          <li class="menu-item open">
            <Link to={"#"} class="menu-link">
              <i class="menu-icon tf-icons ri-home-smile-line"></i>
              <div data-i18n="Dashboards">Master</div>
            </Link>
            <ul
              className="menu-sub"
              style={{ display: hasUserRead ? "inline" : "block" }}
            >
              {hasUserRead && (
                <li class="menu-item">
                  <Link to={"/admin/users"} class="menu-link">
                    <div data-i18n="Dashboard">User</div>
                  </Link>
                </li>
              )}
              {hasRoleRead && (
                <li
                  class="menu-item"
                  style={{ display: hasRoleRead ? "inline" : "block" }}
                >
                  <Link to={"/admin/roles"} class="menu-link">
                    <div data-i18n="Dashboard">Role</div>
                  </Link>
                </li>
              )}
            </ul>
          </li>
          {hasSettingsRead && (
            <li class="menu-item open">
              <Link to={"#"} class="menu-link">
                <i class="menu-icon tf-icons ri-home-smile-line"></i>
                <div data-i18n="Dashboards">Settings</div>
              </Link>
              <ul className="menu-sub">
                <li class="menu-item">
                  <Link to={"/settings"} class="menu-link">
                    <div data-i18n="Dashboard">setting</div>
                  </Link>
                </li>
              </ul>
            </li>
          )}
        </ul>
      </aside>
      <nav
        class="
        layout-navbar"
        id="layout-navbar"
      >
        <div
          className="row align-items-center"
          style={{
            height: "64px",
          }}
        >
          <div className="col-auto"></div>
          <div className="col-auto ms-auto">
            <span className="user-name text-white">
              <div>
                {userDetails.firstName} {userDetails.lastName}
              </div>
              <div className="role">Role: {userDetails.roleName}</div>
            </span>
          </div>
          <div className="col-auto text-end ps-0">
            <div className="header-detail pe-2">
              <Button
                class="btn btn-sm btn-danger  waves-effect waves-light logout"
                onClick={logout}
              >
                <i class="ri-logout-box-r-line  ri-16px"></i>
              </Button>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
