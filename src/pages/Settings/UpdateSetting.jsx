import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchSettingById,
  updateSetting,
} from "../../redux/Slices/SettingSlice";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useLocation } from "react-router-dom";
import { combineSlices } from "@reduxjs/toolkit";

const UpdateSettingForm = () => {
  const { settingId } = useParams();
  console.log("settingId", settingId);
  const navigate = useNavigate();
  const location = useLocation();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm();
  const dispatch = useDispatch();
  const { settings, loading } = useSelector((state) => state.settings);
  const [selectedType, setSelectedType] = useState("");
  const [fileContent, setFileContent] = useState("");

  useEffect(() => {
    if (settingId) {
      dispatch(fetchSettingById(settingId)).then((action) => {
        if (action.payload) {
          const fetchedData = action.payload.data;
          console.log("Fetched setting data", fetchedData);

          // Prefill the form fields using reset
          reset({
            displayName: fetchedData.displayName,
            [`${fetchedData.type}`]: fetchedData.value,
            [`${fetchedData.type}Options`]: JSON.stringify(fetchedData.options),
          });

          setSelectedType(fetchedData.type);

          // If the type is file, handle the file content separately
          if (fetchedData.type === "file") {
            setFileContent(fetchedData.value);
          }
        }
      });
    }
  }, [settingId, dispatch, reset]);

  const onSubmit = async (data) => {
    let value;
    let type;
    let options;
    console.log("data", data);
    console.log("selectedType", selectedType);
    console.log("sjhdjk", data.radioOptionsValue);
    try {
      switch (selectedType) {
        case "radio":
          value = data.radioOptionsValue;
          type = "radio";
          options = JSON.parse(data.radioOptions);
          break;
        case "textarea":
          value = data.textarea;
          type = "textarea";
          options = {};
          break;
        case "checkbox":
          value = data.checkboxOptionValue;
          type = "checkbox";
          options = JSON.parse(data.checkboxOptions);
          break;
        case "file":
          type = "file";
          options = {};
          value = fileContent;
          break;
        case "text":
          value = data.text;
          type = "text";
          options = {};
          break;
        default:
          value = "";
          options = {};
      }

      const formattedData = {
        name: data.displayName.toLowerCase().replace(/\s+/g, "_"),
        displayName: data.displayName,
        value,
        type,
        options,
      };
      console.log("formattedData", formattedData);
      const result = await dispatch(
        updateSetting({ settingId, settingData: formattedData })
      );

      console.log("resz", result);

      if (result.meta.requestStatus === "fulfilled") {
        toast.success(result.payload.message);
        reset();
        navigate("/settings");
      } else {
        toast.error("Failed to update setting.");
      }
    } catch (error) {
      console.error("Error updating setting:", error);
    }
  };

  const handleSelectChange = (e) => {
    setSelectedType(e.target.value);
  };

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
        <h5 className="card-header mb-2">Update Setting</h5>
        <div className="card-body">
          <form onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="displayName">Enter Setting Name:</label>
            <input
              type="text"
              id="displayName"
              name="displayName"
              placeholder="Ex: Admin Title"
              {...register("displayName", { required: true })}
            />
            {errors.displayName && (
              <span style={{ color: "red" }}>This field is required</span>
            )}
            <br />
            <label htmlFor="select_options">Select type:</label>
            <select
              id="select_options"
              name="select_options"
              onChange={handleSelectChange}
              value={selectedType}
            >
              <option value="">Select Type</option>
              <option value="radio">Radio</option>
              <option value="textarea">TextArea</option>
              <option value="checkbox">Checkbox</option>
              <option value="file">File</option>
              <option value="text">Text</option>
            </select>
            <br />
            <br />

            {selectedType === "radio" && (
              <>
                <label>Create JSON format for radio options</label>
                <input
                  type="text"
                  id="radioOptions"
                  placeholder='{ "0": "value1", "1": "value2" }'
                  {...register("radioOptions", {
                    required: true,
                    validate: (value) => {
                      try {
                        JSON.parse(value);
                        return true;
                      } catch {
                        return "Invalid JSON format";
                      }
                    },
                  })}
                />
                {errors.radioOptions && (
                  <span style={{ color: "red" }}>
                    {errors.radioOptions.message || "This field is required"}
                  </span>
                )}
                <br />
                <br />
                <label>Enter the selected option</label>
                <input
                  type="text"
                  id="radioOptionsValue"
                  placeholder="select an option"
                  {...register("radioOptionsValue", { required: true })}
                />
                {errors.radioOptionsValue && (
                  <span style={{ color: "red" }}>This field is required</span>
                )}
              </>
            )}

            {selectedType === "textarea" && (
              <>
                <label>Write a text area</label>
                <textarea {...register("textarea", { required: true })} />
                {errors.textarea && (
                  <span style={{ color: "red" }}>This field is required</span>
                )}
                <br />
                <br />
              </>
            )}

            {selectedType === "checkbox" && (
              <>
                <label>Create JSON format of options</label>
                <input
                  type="text"
                  id="checkboxOptions"
                  placeholder='{ "option1": "value1", "option2": "value2" }'
                  {...register("checkboxOptions", {
                    required: true,
                    validate: (value) => {
                      try {
                        JSON.parse(value);
                        return true;
                      } catch {
                        return "Invalid JSON format";
                      }
                    },
                  })}
                />
                {errors.checkboxOptions && (
                  <span style={{ color: "red" }}>
                    {errors.checkboxOptions.message || "This field is required"}
                  </span>
                )}
                <br />
                <br />
                <label>Enter the selected option</label>
                <input
                  type="text"
                  id="checkboxOptionValue"
                  placeholder="select an option"
                  {...register("checkboxOptionValue", { required: true })}
                />
                {errors.checkboxOptionValue && (
                  <span style={{ color: "red" }}>This field is required</span>
                )}
              </>
            )}

            {selectedType === "file" && (
              <>
                <label>Select a file</label>
                <input
                  type="file"
                  id="fileInput"
                  placeholder="Choose a file"
                  {...register("file", { required: true })}
                />
                {errors.file && (
                  <span style={{ color: "red" }}>This field is required</span>
                )}
                <br />
                <br />
              </>
            )}

            {selectedType === "text" && (
              <>
                <label>Type a text:</label>
                <input
                  type="text"
                  placeholder="Ex:text"
                  {...register("text", { required: true })}
                />
                {errors.text && (
                  <span style={{ color: "red" }}>This field is required</span>
                )}
                <br />
                <br />
              </>
            )}

            <div className="text-end">
              <button
                type="submit"
                className="btn btn-dark waves-effect waves-light"
                disabled={loading}
              >
                Update Setting
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default UpdateSettingForm;
