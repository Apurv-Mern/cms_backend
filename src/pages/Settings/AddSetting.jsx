import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { fetchSettings, createSetting } from "../../redux/Slices/SettingSlice";
import { ToastContainer, toast } from "react-toastify";

import { useNavigate } from "react-router-dom";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import "./AddSetting.css"; // Assuming your CSS file is named AddSetting.css

const SettingsForm = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const dispatch = useDispatch();
  const { settings, loading } = useSelector((state) => state.settings);
  const [selectedType, setSelectedType] = useState("radio"); // Default to "Radio"
  const [options, setOptions] = useState({}); // State to store options

  useEffect(() => {
    dispatch(fetchSettings());
  }, [dispatch]);

  const onSubmit = async (data) => {
    let value;
    let type;
    let options;
    console.log("datttaaa", data);
    // console.log("ASDSAD", selectedType);
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
        value = JSON.stringify(data.file[0]);
        console.log("filesssssss", value);
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

    // Convert display name to lowercase with underscores
    const formattedData = {
      name: data.displayName.toLowerCase().replace(/\s+/g, "_"),
      displayName: data.displayName,
      value,
      type,
      options,
    };
    const result = await dispatch(createSetting(formattedData));

    if (result.meta.requestStatus === "fulfilled") {
      toast.success("Settings created successfully!");
      reset();
    } else {
      toast.error("Failed to create setting.");
    }
  };
  // const validateJson = (value) => {
  //   try {
  //     JSON.parse(value);
  //     return true;
  //   } catch (error) {
  //     return false;
  //   }
  // };
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
        <h5 className="card-header mb-2">Settings</h5>
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
                  placeholder="{ex:'0': 'value1', '1': 'value2'}"
                  {...register("radioOptions", {
                    required: true,
                    // validate: validateJson,
                  })}
                />
                {errors.radioOptions && (
                  <span style={{ color: "red" }}>This field is required</span>
                )}
                <br />
                <br />
                <label>Enter the selected option</label>
                <input
                  type="text"
                  id="values"
                  placeholder="select a option"
                  {...register("radioOptionsValue", {})}
                />
              </>
            )}

            {selectedType === "textarea" && (
              <>
                <label>Write a text area</label>
                <textarea {...register("textarea")} />
                {/* {errors.textarea && (
                  <span style={{ color: "red" }}>This field is required</span>
                )} */}
                <br />
                <br />
              </>
            )}

            {selectedType === "checkbox" && (
              <>
                <label>Create JSON format of options</label>
                <input
                  type="text"
                  id="checkboxOption"
                  placeholder="{'option1': 'value1', 'option2': 'value2', 'option3': 'value3'}"
                  {...register("checkboxOptions", {
                    required: true,
                    // validate: validateJson,
                  })}
                />
                {errors.checkboxOptions && (
                  <span style={{ color: "red" }}>This field is required</span>
                )}
                <br />
                <br />
                <label>Enter the selected option</label>
                <input
                  type="text"
                  id="value"
                  placeholder="select a option"
                  {...register("checkboxOptionValue", {})}
                />
                {/* {errors.checkboxOptionValue && (
                  <span style={{ color: "red" }}>This field is required</span>
                )} */}
              </>
            )}

            {selectedType === "file" && (
              <>
                <label>Select a file</label>
                <input
                  type="file"
                  id="fileInput"
                  placeholder="Choose a file"
                  {...register("file")}
                />
                {/* {errors.file && (
                  <span style={{ color: "red" }}>This field is required</span>
                )} */}
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
                  {...register("text")}
                />
                {/* {errors.text && (
                  <span style={{ color: "red" }}>This field is required</span>
                )} */}
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
                Add Settings
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default SettingsForm;
