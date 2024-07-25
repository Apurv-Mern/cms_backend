import React from "react";
import { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import {
  fetchRoles,
  createRole,
  deleteRole,
} from "../../../redux/Slices/RoleSlice";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CreateRoleModal from "../../../components/CreateRoleModal";
import ConfirmDeleteDialog from "../../../components/ConfirmDeleteDialog";

import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { setPermissionNames } from "../../../redux/Slices/PermissionSlice";
import { fetchRolePermissions } from "../../../redux/Slices/RoleSlice";
import Cookies from "js-cookie";
function DisplayRole() {
  // const [error, setError] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [openCreateModal, setOpenCreateModal] = useState(false); // State for opening/closing create role modal
  const [isLoad, setIsLoad] = useState(false);
  const [filterTerm, setFilterTerm] = useState("");
  const [selectedRoleId, setSelectedRoleId] = useState(null);

  const navigate = useNavigate();
  const roles = useSelector((state) => state.role.roles);
  const dispatchDelete = useDispatch();
  const dispatch = useDispatch();
  const rolePermission = useSelector((state) => state.role.rolePermissions);
  console.log("role ki permission  display user see ", rolePermission);
  console.log("role", roles);

  //delete
  const handleOpenDialog = (roleId) => {
    setSelectedRoleId(roleId);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedRoleId(null);
  };
  const handleCreateRole = (roleName) => {
    dispatch(createRole({ roleName }))
      .then(() => {
        setIsLoad(true); // Assuming setIsLoad is used to refresh data, adjust as needed
        setOpenCreateModal(false);
      })
      .catch(() => {
        toast.error("Failed to create role");
      });
  };

  const filteredRoles = roles.filter((role) =>
    role.roleName.toLowerCase().includes(filterTerm.toLowerCase())
  );
  const handleConfirmDelete = () => {
    dispatchDelete(deleteRole(selectedRoleId))
      .then(() => {
        toast.success("User deleted successfully");
        setIsLoad(true); // Assuming setIsLoad is used to refresh data, adjust as needed
        handleCloseDialog();
      })
      .catch(() => {
        toast.error("Failed to delete user");
        handleCloseDialog();
      });
  };
  //update

  const handleUpdateRole = async (roleId) => {
    navigate(`/update/role/${roleId}`);
  };

  const handleClearSearch = () => {
    setFilterTerm("");
  };
  //createRole

  useEffect(() => {
    dispatch(fetchRoles());
    setIsLoad(false);
  }, [dispatch]);

  //filtering
  useEffect(() => {
    // Retrieve the string from the cookie
    const userCookieString = Cookies.get("user-details");
    if (userCookieString) {
      try {
        const userCookieData = JSON.parse(userCookieString);

        const { roleId = "" } = userCookieData || {};
        dispatch(fetchRolePermissions(roleId));

        console.log("role id   userrrrrr meeh se ", roleId);
      } catch (error) {
        console.error("Error parsing user details cookie:", error);
      }
    } else {
      console.log("User details cookie is not set.");
    }
  }, [dispatch]);
  useEffect(() => {
    if (rolePermission.length > 0) {
      dispatch(setPermissionNames(rolePermission));
    }
  }, [dispatch, rolePermission]);

  const permissionNames =
    useSelector((state) => state.permissions.permissionNames) || [];

  console.log("permissionNames", permissionNames);

  const hasRoleEdit = permissionNames.includes("role_edit");
  const hasRoleDelete = permissionNames.includes("role_delete");
  const hasRoleCreate = permissionNames.includes("role_add");

  console.log(
    "editt5ttt rolee",
    hasRoleEdit,
    "deleteeeeeen rolee  ",
    hasRoleDelete,
    "createeeerw role  ",
    hasRoleCreate
  );
  return (
    <>
      <div className="row">
        <div className="col-auto">
          <h3 class="card-header">Existing Roles</h3>
        </div>
        <div className="col ms-auto text-end">
          {hasRoleCreate && (
            <button
              className="btn btn-dark waves-effect waves-light"
              onClick={() => setOpenCreateModal(true)} // Open the create role modal
            >
              Create New Role
            </button>
          )}
        </div>
      </div>

      <div className="filter-box my-3">
        <div className="row g-2 align-items-center">
          <div className="col">
            <div className="form-grp">
              <label>Role Name</label>
              <input
                className="form-control"
                type="text"
                placeholder="Filter roles"
                value={filterTerm}
                onChange={(e) => setFilterTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="col-auto">
            <button
              className="btn btn-dark waves-effect waves-light"
              onClick={handleClearSearch}
            >
              Clear Filters
            </button>
          </div>
        </div>
      </div>
      <div className="card-body">
        <table className="table">
          <thead>
            <tr>
              <th>Role Name</th>
              {(hasRoleEdit || hasRoleDelete) && <th>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {filteredRoles.map((role) => (
              <tr key={role.roleId}>
                <td>{role.roleName}</td>
                <td>
                  {hasRoleEdit && (
                    <IconButton
                      aria-label="Edit user"
                      title="Edit User"
                      onClick={() => handleUpdateRole(role.roleId)}
                    >
                      <EditIcon style={{ color: "#e3bd3a" }} />
                    </IconButton>
                  )}
                  {hasRoleDelete && (
                    <IconButton
                      aria-label="Delete user"
                      title="Delete User"
                      onClick={() => handleOpenDialog(role.roleId)}
                    >
                      <DeleteIcon style={{ color: "#aa1313" }} />
                    </IconButton>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <ConfirmDeleteDialog
          open={openDialog}
          handleClose={handleCloseDialog}
          handleConfirm={handleConfirmDelete}
        />
        <CreateRoleModal
          open={openCreateModal}
          handleClose={() => setOpenCreateModal(false)}
          handleCreate={handleCreateRole}
        />
      </div>
    </>
  );
}

export default DisplayRole;
