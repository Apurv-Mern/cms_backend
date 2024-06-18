import React from "react";
import { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import {
  fetchRoles,
  createRole,
  updateRole,
  deleteRole,
} from "../../../../redux/Slices/RoleSlice";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import ConfirmDeleteDialog from "../../../../components/ConfirmDeleteDialog";

import EditRoleModal from "../../../../components/EditRoleModal";
import { toast } from "react-toastify";
import CreateRoleModal from "../../../../components/CreateRoleModal";

function DisplayRole() {
  // const [error, setError] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  const [openEditModal, setOpenEditModal] = useState(false);
  const [isLoad, setIsLoad] = useState(false);
  const [editedRoleName, setEditedRoleName] = useState("");
  const [filterTerm, setFilterTerm] = useState("");
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [currentRoleId, setCurrentRoleId] = useState(null);
  const [selectedRoleId, setSelectedRoleId] = useState(null);
  const roles = useSelector((state) => state.role.roles);

  const dispatch = useDispatch();
  console.log("role", roles);

  const dispatchDelete = useDispatch();
  //delete
  const handleOpenDialog = (roleId) => {
    setSelectedRoleId(roleId);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedRoleId(null);
  };

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
  const handleOpenEditModal = (roleId) => {
    const role = roles.find((role) => role.roleId === roleId);
    if (role) {
      setCurrentRoleId(roleId);
      setEditedRoleName(role.roleName);
      setOpenEditModal(true);
    }
  };
  const handleCloseEditModal = () => {
    setOpenEditModal(false);
    setCurrentRoleId(null);
  };
  const handleUpdateRoleName = async () => {
    try {
      const result = await dispatch(
        updateRole({
          roleId: currentRoleId,
          roleData: { roleName: editedRoleName },
        })
      );
      if (result.meta.requestStatus === "fulfilled") {
        toast.success("Role updated successfully!");
      } else {
        toast.error("Failed to update role.");
      }
    } catch (error) {
      console.error("Error updating role:", error);
      toast.error("An error occurred while updating the role.");
    } finally {
      handleCloseEditModal();
    }
  };

  const handleClearSearch = () => {
    setFilterTerm("");
  };
  //createRole

  const handleOpenCreateModal = () => {
    setOpenCreateModal(true);
  };

  const handleCloseCreateModal = () => {
    setOpenCreateModal(false);
  };

  const handleCreateRole = async (roleName) => {
    if (roleName) {
      await dispatch(createRole({ roleName }));
      setOpenCreateModal(false);
    }
  };

  const filteredRoles = roles.filter((role) =>
    role.roleName.toLowerCase().includes(filterTerm.toLowerCase())
  );

  useEffect(() => {
    dispatch(fetchRoles());
    setIsLoad(false);
  }, [dispatch]);
  return (
    <>
      <div className="row">
        <div className="col-auto">
          <h3 class="card-header">Existing Roles</h3>
        </div>
        <div className="col ms-auto text-end">
          <button
            className="btn btn-dark waves-effect waves-light"
            onClick={handleOpenCreateModal}
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
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredRoles.map((role) => (
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
        <CreateRoleModal
          open={openCreateModal}
          handleClose={handleCloseCreateModal}
          handleCreate={handleCreateRole}
        />
      </div>
    </>
  );
}

export default DisplayRole;
