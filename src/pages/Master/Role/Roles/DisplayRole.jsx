import React from "react";
import { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { fetchRoles } from "../../../../redux/Slices/RoleSlice";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import ConfirmDeleteDialog from "../../../../components/ConfirmDeleteDialog";

import EditRoleModal from "../../../../components/EditRoleModal";
import { toast } from "react-toastify";
function DisplayRole() {
  // const [error, setError] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  const [openEditModal, setOpenEditModal] = useState(false);
  const [editedRoleId, setEditedRoleId] = useState(null);
  const [editedRoleName, setEditedRoleName] = useState("");

  const roles = useSelector((state) => state.role.roles);

  const dispatch = useDispatch();
  console.log("role", roles);

  //update
  const handleOpenDialog = (userId) => {
    // setSelectedUserId(userId);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    // setSelectedUserId(null);
  };

  const handleOpenEditModal = (roleId) => {
    const role = roles.find((role) => role.roleId === roleId);
    if (role) {
      setEditedRoleId(roleId);
      setEditedRoleName(role.roleName);
      setOpenEditModal(true);
    }
  };
  const handleUpdateRoleName = async () => {
    // Perform API call to update the role name
    // Example:
    // await axios.put(`${baseUrl}/api/role/${editedRoleId}`, { roleName: editedRoleName });
    // Re-fetch roles or update state accordingly
    setOpenEditModal(false);
  };

  //delete
  const handleCloseEditModal = () => {
    setOpenEditModal(false);
  };
  const handleConfirmDelete = () => {
    // dispatch(deleteUser(selectedUserId))
    //   .then(() => {
    //     toast.success("User deleted successfully");
    //     // setIsLoad(true); // Assuming setIsLoad is used to refresh data, adjust as needed
    //     handleCloseDialog();
    //   })
    //   .catch(() => {
    //     toast.error("Failed to delete user");
    //     handleCloseDialog();
    //   });
  };
  const handleClearSearch = () => {};
  const handleClickCreate = () => {};
  const handleSearchChange = () => {};

  useEffect(() => {
    dispatch(fetchRoles());
  }, [dispatch]);
  return (
    <>
      <div className="row">
        <div className="col-auto">
          <h3 class="card-header">Existing Users</h3>
        </div>
        <div className="col ms-auto text-end">
          <button
            className="btn btn-dark waves-effect waves-light"
            onClick={handleClickCreate}
          >
            Create New Role
          </button>
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
                name="firstName"
                // value={}
                placeholder="Search by name"
                onChange={handleSearchChange}
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
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {roles.map((role) => (
              <tr key={role.roleId}>
                <td>{role.roleName}</td>
                <td>
                  <IconButton
                    aria-label="Edit user"
                    title="Edit User"
                    onClick={() => handleOpenEditModal(role.roleId)}
                  >
                    <EditIcon style={{ color: "#e3bd3a" }} />
                  </IconButton>

                  <IconButton
                    aria-label="Delete user"
                    title="Delete User"
                    onClick={() => handleOpenDialog(role.roleId)}
                  >
                    <DeleteIcon style={{ color: "#aa1313" }} />
                  </IconButton>
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
        <EditRoleModal
          open={openEditModal}
          handleClose={handleCloseEditModal}
          roleName={editedRoleName}
          setRoleName={setEditedRoleName}
          handleUpdate={handleUpdateRoleName}
        />
      </div>
    </>
  );
}

export default DisplayRole;
