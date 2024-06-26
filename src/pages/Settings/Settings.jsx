import { useDispatch, useSelector } from "react-redux";
import {
  fetchSettings,
  deleteSetting,
} from "../../redux/Slices/SettingSlice.js";
import { IconButton, Tooltip } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import ConfirmDeleteDialog from "../../components/ConfirmDeleteDialog.jsx";
import { toast } from "react-toastify";
const truncateText = (text, maxLength) => {
  return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
};
const Settings = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [currentSetting, setCurrentSetting] = useState(null);
  const [isLoad, setIsLoad] = useState(false);
  const handleOpenCreateModal = () => {};
  const navigate = useNavigate();
  const settings = useSelector((state) => state.settings.settings);
  const dispatch = useDispatch();
  console.log(settings);

  //update settings
  const handleCreateSetting = () => {
    navigate(`/settings/create`);
  };
  //update settings
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
  // const handleConfirmDelete = () => {
  //   dispatch(deleteSetting(currentSetting));
  //   setOpenDialog(false);
  // };

  const handleConfirmDelete = () => {
    dispatch(deleteSetting(currentSetting))
      .then(() => {
        toast.success("setting deleted successfully");
        setIsLoad(true); // Assuming setIsLoad is used to refresh data, adjust as needed
        handleCloseDialog();
      })
      .catch(() => {
        toast.error("Failed to delete user");
        handleCloseDialog();
      });
  };

  useEffect(() => {
    dispatch(fetchSettings());
    setIsLoad(false);
  }, [dispatch]);
  return (
    <>
      <div className="row">
        <div className="col-auto">
          <h3 class="card-header">Existing Settings</h3>
        </div>
        <div className="col ms-auto text-end">
          <button
            className="btn btn-dark waves-effect waves-light"
            onClick={handleCreateSetting}
          >
            Create New Setting
          </button>
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
        <table className="table">
          <thead>
            <tr>
              <th>Setting Name</th>
              <th>Type</th>
              <th>Options </th>

              <th>Value</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {settings.map((setting) => (
              <tr key={setting.settingId}>
                <td>{setting.displayName}</td>
                <td>{setting.type}</td>
                <td>{JSON.stringify(setting.options)}</td>
                <td>
                  {" "}
                  <Tooltip title={setting.value}>
                    <span>{truncateText(setting.value, 30)}</span>
                  </Tooltip>
                </td>
                <td>
                  <IconButton
                    aria-label="Edit setting"
                    title="Edit setting"
                    onClick={() => handleOpenEditModal(setting.settingId)}
                  >
                    <EditIcon style={{ color: "#e3bd3a" }} />
                  </IconButton>

                  <IconButton
                    aria-label="Delete setting"
                    title="Delete setting"
                    onClick={() => handleOpenDialog(setting.settingId)}
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
      </div>
    </>
  );
};

export default Settings;
