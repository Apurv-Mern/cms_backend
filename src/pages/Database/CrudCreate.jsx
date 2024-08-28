import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  createTableRows,
  createCRUDinfo,
} from "../../redux/Slices/DatabaseSlice";

import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
const CrudCreate = () => {
  const location = useLocation();
  const navigate = useNavigate();
  console.log("location", location.state);
  const { tableName, fields } = location.state || {};

  console.log("Table Name:", tableName);
  console.log("Fields:", fields);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log("data of crud", data);
    try {
      const result = await dispatch(createCRUDinfo(data));
      console.log("result of crud", result);
      if (result.meta.requestStatus === "fulfilled") {
        toast.success(result.payload.message);
        // navigate("/database");
      } else {
        toast.error("Failed to create crud.");
      }
    } catch (error) {
      // Handle error
      console.error("Error creating CRUD info:", error);
    }
  };

  // Form for Table Rows
  const {
    control: controlTableRows,
    handleSubmit: handleSubmitTableRows,
    formState: { errors: errorsTableRows },
  } = useForm({
    defaultValues: {
      tableName,
      rows: fields.map((field) => ({
        visibility: [],
        inputType: "",
        displayName: "",
        optionalDetails: "",
      })),
    },
  });
  // Your external function definition
  const handleCheckboxChange = (field, value) => {
    const visibility = Array.isArray(field.value) ? field.value : [];
    const newVisibility = visibility.includes(value)
      ? visibility.filter((v) => v !== value)
      : [...visibility, value];
    console.log("new visiblity", newVisibility);
    field.onChange(newVisibility);
  };
  const onSubmitRow = async (data, tableName) => {
    try {
      const { tableName } = location.state || {};
      console.log("data of tableeeee", tableName);
      console.log("data of rosseeee", data, tableName);
      await dispatch(createTableRows({ ...data, tableName })); // Sending form data as payload
    } catch (error) {
      console.error("Failed to create table rows:", error);
    }
  };
  return (
    <>
      <>
        <div>
          <h2>{tableName} CRUD Info</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label>Table Name:</label>
              <input
                type="text"
                {...register("tableName", { required: true })}
              />
              {errors.tableName && <p>This field is required</p>}
            </div>
            <div>
              <label>Display Name:</label>
              <input
                type="text"
                {...register("displayName", { required: true })}
              />
              {errors.displayName && <p>This field is required</p>}
            </div>
            <div>
              <label>URL Slug:</label>
              <input type="text" {...register("urlSlug", { required: true })} />
              {errors.urlSlug && <p>This field is required</p>}
            </div>
            <div>
              <label>Model Name:</label>
              <input
                type="text"
                {...register("modelName", { required: true })}
              />
              {errors.modelName && <p>This field is required</p>}
            </div>
            <div>
              <label>Controller Name:</label>
              <input
                type="text"
                {...register("controllerName", { required: true })}
              />
              {errors.controllerName && <p>This field is required</p>}
            </div>
            <button type="submit">Submit</button>
          </form>
        </div>
      </>{" "}
      <>
        {" "}
        <div className="col-auto">
          <h3 className="card-header">
            Edit the rows for the {tableName} table below:
          </h3>
          <form onSubmit={handleSubmitTableRows(onSubmitRow)}>
            <div className="card-body">
              <table className="table">
                <thead>
                  <tr>
                    <th>Field</th>
                    <th>Visibility</th>
                    <th>Input Type</th>
                    <th>Display Name</th>
                    <th>Optional Details</th>
                  </tr>
                </thead>
                <tbody>
                  {fields.map((item, index) => (
                    <tr key={item.databaseId}>
                      <td>
                        {item.fieldName}
                        <label>
                          Type: <span>{item.type}</span>
                        </label>
                        <label>
                          Key: <span>{item.index}</span>
                        </label>
                        <label>
                          Required: <span>{item.notNull ? "Yes" : "No"}</span>
                        </label>
                      </td>
                      <td>
                        <Controller
                          name={`rows[${index}].visibility`}
                          control={controlTableRows}
                          render={({ field }) => (
                            <>
                              <label>
                                <input
                                  type="checkbox"
                                  value="add"
                                  checked={field.value.includes("add")}
                                  onChange={() =>
                                    handleCheckboxChange(field, "add")
                                  }
                                />
                                Add
                              </label>
                              <label>
                                <input
                                  type="checkbox"
                                  value="read"
                                  checked={field.value.includes("read")}
                                  onChange={() =>
                                    handleCheckboxChange(field, "read")
                                  }
                                />
                                Read
                              </label>
                              <label>
                                <input
                                  type="checkbox"
                                  value="delete"
                                  checked={field.value.includes("delete")}
                                  onChange={() =>
                                    handleCheckboxChange(field, "delete")
                                  }
                                />
                                Delete
                              </label>
                              <label>
                                <input
                                  type="checkbox"
                                  value="edit"
                                  checked={field.value.includes("edit")}
                                  onChange={() =>
                                    handleCheckboxChange(field, "edit")
                                  }
                                />
                                Edit
                              </label>
                            </>
                          )}
                        />
                      </td>
                      <td>
                        <Controller
                          name={`rows[${index}].inputType`}
                          control={controlTableRows}
                          render={({ field }) => (
                            <select {...field}>
                              <option value="">Select Input Type</option>
                              <option value="checkbox">Checkbox</option>
                              <option value="color">Color</option>
                              <option value="file">File</option>
                              <option value="date">Date</option>
                              <option value="image">Image</option>
                              <option value="number">Number</option>
                              <option value="password">Password</option>
                              <option value="radio">Radio Button</option>
                              <option value="file">Multiple Images</option>
                              <option value="date">Rich Text Box</option>
                              <option value="image">Code Editor</option>
                              <option value="number">Markdown Editor</option>
                              <option value="password">Select Dropdown</option>
                              <option value="radio">Select Multiple</option>
                              <option value="file">Text</option>
                              <option value="date">TextArea</option>
                              <option value="image">Timestamp</option>
                              <option value="number">Hidden</option>
                              <option value="password">Coordinates</option>
                            </select>
                          )}
                        />
                      </td>
                      <td>
                        <Controller
                          name={`rows[${index}].displayName`}
                          control={controlTableRows}
                          render={({ field }) => (
                            <input type="text" {...field} />
                          )}
                        />
                      </td>
                      <td>
                        <Controller
                          name={`rows[${index}].optionalDetails`}
                          control={controlTableRows}
                          render={({ field }) => <textarea {...field} />}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan="5">
                      <button type="submit">Submit</button>
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </form>
        </div>
      </>
    </>
  );
};

export default CrudCreate;
