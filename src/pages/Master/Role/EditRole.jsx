import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { toast } from "react-toastify";
import {
  updateRole,
  fetchRolePermissions,
} from "../../../redux/Slices/RoleSlice";
import { fetchPermissions } from "../../../redux/Slices/PermissionSlice";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

const EditRolePage = () => {
  const { roleId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const permissions = useSelector((state) => state.permissions.permissions);
  const roles = useSelector((state) => state.role.roles);
  const role = roles.find((role) => role.roleId === parseInt(roleId));
  const rolesPermissions = useSelector((state) => state.role.rolePermissions);
  console.log("role", role);
  console.log("roleeeeeeeeeeeeeepermissions", rolesPermissions);
  const [roleName, setRoleName] = useState("");
  const [rolePermissions, setRolePermissions] = useState({});

  const [selectedPermissions, setSelectedPermissions] = useState({
    roleId: roleId,
    permissions: [],
  });
  console.log("selectedPermissions", selectedPermissions);

  useEffect(() => {
    dispatch(fetchRolePermissions(role?.roleId));
  }, [role?.roleId, dispatch]);

  useEffect(() => {
    if (!permissions.length) {
      dispatch(fetchPermissions());
    }

    if (role) {
      setRoleName(role.roleName);
    }
  }, [dispatch, permissions, role]);

  useEffect(() => {
    // Update selected permissions whenever rolePermissions changes
    setSelectedPermissions((prevState) => ({
      ...prevState,
      permissions: Object.keys(rolePermissions).filter(
        (permName) => rolePermissions[permName]
      ),
    }));
  }, [rolePermissions]);

  const handleUpdateRole = async () => {
    try {
      const result = await dispatch(
        updateRole({
          roleId,
          roleData: {
            roleName,
            permissionNames: selectedPermissions.permissions,
          },
        })
      );

      if (result.meta.requestStatus === "fulfilled") {
        toast.success("Role updated successfully!");
        navigate("/admin/roles");
      } else {
        toast.error("Failed to update role.");
      }
    } catch (error) {
      console.error("Error updating role:", error);
      toast.error("An error occurred while updating the role.");
    }
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setRolePermissions({
      ...rolePermissions,
      [name]: checked,
    });
  };

  const handleCategoryChange = (category, checked) => {
    const updatedPermissions = permissions.reduce((map, perm) => {
      if (perm.permissionName.startsWith(category)) {
        map[perm.permissionName] = checked;
      }
      return map;
    }, {});
    setRolePermissions({
      ...rolePermissions,
      ...updatedPermissions,
    });
  };

  const categories = Array.from(
    new Set(permissions.map((perm) => perm.permissionName.split("_")[0]))
  );

  return (
    <>
      <button
        onClick={() => navigate(-1)}
        className="btn btn-sm btn-danger waves-effect waves-light logout"
        tabIndex="0"
        type="button"
      >
        <ArrowBackIosNewIcon />
      </button>

      <div className="card mt-2">
        <h5 className="card-header mb-2">Edit Role</h5>
        <div className="card-body">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleUpdateRole();
            }}
          >
            <div className="row">
              <div className="col-xl-4">
                <div className="form-group">
                  <label htmlFor="roleName" className="form-label">
                    Role Name:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="roleName"
                    value={roleName}
                    onChange={(e) => setRoleName(e.target.value)}
                    autoComplete="off"
                  />
                </div>
              </div>
            </div>
            <div className="row mt-2">
              <div className="col-xl-4">
                <div className="form-groups">
                  <label className="form-label">Permissions:</label>

                  {categories.map((category) => (
                    <div key={category}>
                      <div className="form-check">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id={category}
                          name={category}
                          checked={permissions
                            .filter((perm) =>
                              perm.permissionName.startsWith(category)
                            )
                            .every(
                              (perm) => rolePermissions[perm.permissionName]
                            )}
                          onChange={(e) =>
                            handleCategoryChange(category, e.target.checked)
                          }
                        />
                        <label className="form-check-label" htmlFor={category}>
                          {category}
                        </label>
                      </div>
                      {permissions
                        .filter((perm) =>
                          perm.permissionName.startsWith(category)
                        )
                        .map((permission) => (
                          <div
                            className="form-check ml-3"
                            key={permission.permissionId}
                          >
                            <input
                              type="checkbox"
                              className="form-check-input"
                              id={permission.permissionId}
                              name={permission.permissionName}
                              checked={
                                rolePermissions[permission.permissionName]
                              }
                              onChange={handleCheckboxChange}
                            />
                            <label
                              className="form-check-label"
                              htmlFor={permission.permissionName}
                            >
                              {permission.permissionName
                                .split("_")
                                .map(
                                  (word) =>
                                    word.charAt(0).toUpperCase() + word.slice(1)
                                )
                                .join(" ")}
                            </label>
                          </div>
                        ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
            >
              Update Role
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => navigate("/admin/roles")}
              sx={{ mt: 2, ml: 2 }}
            >
              Cancel
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditRolePage;
