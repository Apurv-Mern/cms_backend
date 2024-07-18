import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchSettings,
  deleteSetting,
  updateSetting,
} from "../../redux/Slices/SettingSlice.js";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import ConfirmDeleteDialog from "../../components/ConfirmDeleteDialog.jsx";
import { toast } from "react-toastify";
import { setPermissionNames } from "../../redux/Slices/PermissionSlice.js";
import { fetchRolePermissions } from "../../redux/Slices/RoleSlice";
import Cookies from "js-cookie";
const Settings = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [currentSetting, setCurrentSetting] = useState(null);
  const [formValues, setFormValues] = useState({});
  const [fetchTrigger, setFetchTrigger] = useState(false); // State to trigger fetchSettings

  const { handleSubmit, control } = useForm();
  const navigate = useNavigate();
  const settings = useSelector((state) => state.settings.settings);

  console.log("settings", settings);
  const rolePermission = useSelector((state) => state.role.rolePermissions);
  console.log("role ki permission  display user see ", rolePermission);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSettings());
    setFetchTrigger(false); // Reset trigger after fetching
  }, [dispatch, fetchTrigger]);

  const handleCreateSetting = () => {
    navigate(`/settings/create`);
  };

  const handleOpenEditModal = (settingId) => {
    navigate(`/settings/update/${settingId}`);
  };

  const handleOpenDialog = (settingId) => {
    setCurrentSetting(settingId);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setCurrentSetting(null);
  };
  const handleSaveAll = () => {
    setFetchTrigger(true); // Trigger fetch after updating
  };
  const handleConfirmDelete = () => {
    dispatch(deleteSetting(currentSetting))
      .then(() => {
        toast.success("Setting deleted successfully");
        setFetchTrigger(true); // Trigger fetch after deletion
      })
      .catch(() => {
        toast.error("Failed to delete setting");
      })
      .finally(() => {
        handleCloseDialog();
      });
  };

  const handleInputChange = (settingId, value) => {
    console.log("setting ki id ", settingId, "aur value", value);
    setFormValues((prevValues) => ({
      ...prevValues,
      [settingId]: value,
    }));
  };

  const renderCheckboxOptions = (setting) => {
    return Object.entries(setting.options).map(([key, value]) => (
      <div key={key} className="form-check">
        <input
          type="checkbox"
          className="form-check-input"
          id={`checkbox-${setting.settingId}-${key}`}
          value={key}
          checked={(setting.value || []).includes(key)}
          onChange={(e) => {
            const newValue = e.target.checked
              ? [...(setting.value || []), key]
              : (setting.value || []).filter((val) => val !== key);
            handleInputChange(setting.settingId, JSON.parse(newValue));
          }}
        />
        <label
          className="form-check-label"
          htmlFor={`checkbox-${setting.settingId}-${key}`}
        >
          {value}
        </label>
      </div>
    ));
  };

  const renderRadioOptions = (setting) => {
    return Object.entries(setting.options).map(([key, value]) => (
      <div key={key} className="form-check">
        <input
          type="radio"
          className="form-check-input"
          id={`radio-${setting.settingId}-${key}`}
          name={`radio-${setting.settingId}`}
          value={key}
          checked={(setting.value || []).includes(key)}
          onChange={(e) => handleInputChange(setting.settingId, e.target.value)}
        />
        <label
          className="form-check-label"
          htmlFor={`radio-${setting.settingId}-${key}`}
        >
          {value}
        </label>
      </div>
    ));
  };

  const renderInputField = (setting) => {
    switch (setting.type) {
      case "textarea":
        return (
          <Controller
            key={setting.settingId}
            name={`value-${setting.settingId}`}
            control={control}
            defaultValue={setting.value}
            render={({ field }) => (
              <textarea
                {...field}
                placeholder="Enter text"
                className="form-control"
                onChange={(e) => {
                  field.onChange(e);
                  handleInputChange(setting.settingId, e.target.value);
                }}
              />
            )}
          />
        );
      case "checkbox":
        return (
          <div key={setting.settingId}>{renderCheckboxOptions(setting)}</div>
        );
      case "radio":
        return <div key={setting.settingId}>{renderRadioOptions(setting)}</div>;
      case "text":
        return (
          <Controller
            key={setting.settingId}
            name={`value-${setting.settingId}`}
            control={control}
            defaultValue={setting.value}
            render={({ field }) => (
              <input
                {...field}
                type="text"
                placeholder="Enter text"
                className="form-control"
                onChange={(e) => {
                  field.onChange(e);
                  handleInputChange(setting.settingId, e.target.value);
                }}
              />
            )}
          />
        );
      case "file":
        return (
          <div>
            {setting.value && (
              <a
                href={setting.pathForFile}
                target="_blank"
                rel="noopener noreferrer"
              >
                {setting.value.split("/").pop()}
              </a>
            )}
            <input
              key={setting.settingId}
              type="file"
              className="form-control"
              onChange={(e) =>
                handleInputChange(setting.settingId, e.target.files[0].name)
              }
            />
          </div>
        );
      default:
        return (
          <Controller
            key={setting.settingId}
            name={`value-${setting.settingId}`}
            control={control}
            defaultValue={setting.value}
            render={({ field }) => (
              <input
                {...field}
                type="text"
                placeholder="Enter text"
                className="form-control"
              />
            )}
          />
        );
    }
  };

  const onSubmit = async () => {
    try {
      const updatePromises = settings.map(async (setting) => {
        const updated = {
          value: formValues[setting.settingId],
        };
        const result = await dispatch(
          updateSetting({
            settingId: setting.settingId,
            settingData: updated,
          })
        );
        return result;
      });

      await Promise.all(updatePromises);
      toast.success("All settings updated successfully!");
      setFetchTrigger(true); // Trigger fetch after updating
    } catch (error) {
      toast.error("Failed to update settings.");
      console.error("Error updating settings:", error);
    }
  };
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

  const hasSettingEdit = permissionNames.includes("settings_edit");
  const hasSettingDelete = permissionNames.includes("settings_delete");
  const hasSettingCreate = permissionNames.includes("settings_add");

  console.log(
    "editt5ttt seeetingggg",
    hasSettingEdit,
    "deleteeeeeen seeetingggg  ",
    hasSettingDelete,
    "createeeerw seeetingggg  ",
    hasSettingCreate
  );
  return (
    <>
      <div className="row">
        <div className="col-auto">
          <h3 className="card-header">Existing Settings</h3>
        </div>
        <div className="col ms-auto text-end">
          {hasSettingCreate && (
            <button
              className="btn btn-dark waves-effect waves-light"
              onClick={handleCreateSetting}
            >
              Create New Setting
            </button>
          )}
        </div>
      </div>

      <div className="filter-box my-3">
        <div className="row g-2 align-items-center">
          <div className="col">
            <div className="form-grp">
              <label>Setting Name</label>
            </div>
          </div>
          <div className="col-auto"></div>
        </div>
      </div>

      <div className="card-body">
        <form onSubmit={handleSubmit(onSubmit)}>
          <table className="table">
            <thead>
              <tr>
                <th>Setting Name</th>
                <th>Type</th>
                <th>Value</th>
                {(hasSettingDelete || hasSettingEdit) && <th>Actions</th>}
              </tr>
            </thead>
            <tbody>
              {settings.map((setting) => (
                <tr key={setting.settingId}>
                  <td>{setting.name}</td>
                  <td>{setting.type}</td>
                  <td>{renderInputField(setting)}</td>
                  <td>
                    {hasSettingEdit && (
                      <IconButton
                        aria-label="Edit setting"
                        title="Edit setting"
                        onClick={() => handleOpenEditModal(setting.settingId)}
                      >
                        <EditIcon style={{ color: "#e3bd3a" }} />
                      </IconButton>
                    )}
                    {hasSettingDelete && (
                      <IconButton
                        aria-label="Delete setting"
                        title="Delete setting"
                        onClick={() => handleOpenDialog(setting.settingId)}
                      >
                        <DeleteIcon style={{ color: "#aa1313" }} />
                      </IconButton>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button
            type="submit"
            className="btn btn-dark"
            onClick={handleSaveAll}
          >
            Save All
          </button>
        </form>
        <ConfirmDeleteDialog
          open={openDialog}
          handleClose={handleCloseDialog}
          handleConfirm={handleConfirmDelete}
        />
      </div>
    </>
  );
};

export default Settings;
