import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { fetchSettings, createSetting } from "../../redux/Slices/SettingSlice";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import "./AddSetting.css"; // Assuming your CSS file is named AddSetting.css
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import styles
import { Controlled as ControlledEditor } from "react-codemirror2";
import "codemirror/lib/codemirror.css"; // Import the Codemirror CSS
import "codemirror/theme/material.css"; // Choose your preferred theme
import "codemirror/mode/javascript/javascript"; // Import the JavaScript mode
const SettingsForm = () => {
  const navigate = useNavigate();
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.settings);
  const [selectedType, setSelectedType] = useState("radio"); // Default to "Radio"

  useEffect(() => {
    dispatch(fetchSettings());
  }, [dispatch]);

  const onSubmit = async (data) => {
    let type = selectedType;
    let options = {};

    switch (selectedType) {
      case "radio":
        options = JSON.parse(extractPlainText(data[selectedType + "Options"]));
        console.log("options", options);
        break;
      case "checkbox":
        options = JSON.parse(extractPlainText(data[selectedType + "Options"]));
        break;
      case "file":
        type = "file";
        break;
      case "text":
        type = "text";
        break;
      default:
        break;
    }

    const formattedData = {
      name: data.displayName.toLowerCase().replace(/\s+/g, "_"),
      displayName: data.displayName,
      value: data.value || "",
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

  const handleSelectChange = (e) => {
    setSelectedType(e.target.value);
  };

  const extractPlainText = (html) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    return doc.body.textContent || "";
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
                <label>
                  Create JSON format for radio options . Ex:{" "}
                  {'{ "key1": "value1", "key2": "value2" }'}
                </label>
                <Controller
                  name="radioOptions"
                  control={control}
                  defaultValue=""
                  rules={{
                    required: "This field is required",
                  }}
                  render={({ field }) => (
                    <>
                      <ControlledEditor
                        value={field.value}
                        onBeforeChange={(editor, data, value) =>
                          field.onChange(value)
                        }
                        placeholder='{"option1": "value1", "option2": "value2", "option3": "value3"}'
                        options={{
                          lineWrapping: true, // Enable line wrapping
                          mode: "javascript", // Set the language mode
                          theme: "material", // Choose your preferred theme
                        }}
                      />
                      {errors.radioOptions && (
                        <p style={{ color: "red" }}>
                          {errors.radioOptions.message}
                        </p>
                      )}
                    </>
                  )}
                />
              </>
            )}

            {selectedType === "checkbox" && (
              <>
                <label>
                  Create JSON format of options Ex:{" "}
                  {'{ "key1": "value1", "key2": "value2" ,"key3": "value3"}'}
                </label>
                <Controller
                  name="checkboxOptions"
                  control={control}
                  defaultValue=""
                  rules={{
                    required: "This field is required",
                    validate: (value) => {
                      try {
                        const plainText = extractPlainText(value);
                        JSON.parse(plainText);
                        return true;
                      } catch (e) {
                        return "Invalid JSON format";
                      }
                    },
                  }}
                  render={({ field }) => (
                    <ControlledEditor
                      value={field.value}
                      onBeforeChange={(editor, data, value) =>
                        field.onChange(value)
                      }
                      placeholder='{"option1": "value1", "option2": "value2", "option3": "value3"}'
                      options={{
                        lineWrapping: true, // Enable line wrapping
                        mode: "javascript", // Set the language mode
                        theme: "material", // Choose your preferred theme
                      }}
                    />
                  )}
                />
                {errors.checkboxOptions && (
                  <p style={{ color: "red" }}>
                    {errors.checkboxOptions.message}
                  </p>
                )}
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
