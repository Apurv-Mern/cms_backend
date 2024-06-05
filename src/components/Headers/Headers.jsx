import React, { useEffect, useState } from "react";

import "./Headers.css";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import useLogout from "../../pages/Logout/Logout";
import { useSelector } from "react-redux";

const Header = () => {
  const logout = useLogout();
  // Retrieve the string from local storage
  const userLocalStorageString = localStorage.getItem("user-details");

  // Parse the string back to an object
  const userLocalStorageData = JSON.parse(userLocalStorageString);

  // Extract the name and roleName
  const { firstName, lastName, roleName } = userLocalStorageData;
  const formattedFirstName =
    firstName.charAt(0).toUpperCase() + firstName.slice(1);
  const formattedLastName =
    lastName.charAt(0).toUpperCase() + lastName.slice(1);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

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

          <div class="layout-menu-toggle menu-link text-large ms-auto">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.47365 11.7183C8.11707 12.0749 8.11707 12.6531 8.47365 13.0097L12.071 16.607C12.4615 16.9975 12.4615 17.6305 12.071 18.021C11.6805 18.4115 11.0475 18.4115 10.657 18.021L5.83009 13.1941C5.37164 12.7356 5.37164 11.9924 5.83009 11.5339L10.657 6.707C11.0475 6.31653 11.6805 6.31653 12.071 6.707C12.4615 7.09747 12.4615 7.73053 12.071 8.121L8.47365 11.7183Z"
                fill-opacity="0.9"
              />
              <path
                d="M14.3584 11.8336C14.0654 12.1266 14.0654 12.6014 14.3584 12.8944L18.071 16.607C18.4615 16.9975 18.4615 17.6305 18.071 18.021C17.6805 18.4115 17.0475 18.4115 16.657 18.021L11.6819 13.0459C11.3053 12.6693 11.3053 12.0587 11.6819 11.6821L16.657 6.707C17.0475 6.31653 17.6805 6.31653 18.071 6.707C18.4615 7.09747 18.4615 7.73053 18.071 8.121L14.3584 11.8336Z"
                fill-opacity="0.4"
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
            <ul className={`menu-sub ${isMenuOpen ? "show" : ""}`}>
              <li class="menu-item">
                <Link to={"/admin/users"} class="menu-link">
                  <div data-i18n="Dashboard">User</div>
                </Link>
              </li>
              {/* <li class="menu-item">
                <Link to={"/users/create"} class="menu-link">
                  <div data-i18n="Dashboard">Create User</div>
                </Link>
              </li> */}
            </ul>
          </li>
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
                {formattedFirstName} {formattedLastName}
              </div>
              <div className="role">Role: {roleName}</div>
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
