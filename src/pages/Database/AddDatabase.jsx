import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm, useFieldArray } from "react-hook-form";
import {
  createDatabase,
  fetchDataType,
  fetchIndexType,
} from "../../redux/Slices/DatabaseSlice";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton } from "@mui/material";

const AddDatabase = () => {
  const dispatch = useDispatch();
  const datatype = useSelector((state) => state.database.dataType);
  console.log("datatype", datatype);
  const indexType = useSelector((state) => state.database.indexType);
  console.log("indexType", indexType);

  const {
    control,
    handleSubmit,
    register,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      tableName: "",
      fields: [
        {
          fieldName: "",
          type: "",
          notNull: false,
          autoIncrement: false,
          index: "",
          defaultValue: "",
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "fields",
  });

  const addTimestampFields = () => {
    append({
      fieldName: "createdAt",
      type: "Date",
      notNull: false,
      autoIncrement: false,
      index: "",
      defaultValue: "",
    });
    append({
      fieldName: "updatedAt",
      type: "Date",
      notNull: false,
      autoIncrement: false,
      index: "",
      defaultValue: "",
    });
  };

  const onSubmit = (data) => {
    dispatch(createDatabase(data));
    reset();
  };

  useEffect(() => {
    dispatch(fetchDataType());
    dispatch(fetchIndexType());
  }, [dispatch]);

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Table Name:</label>
          <input
            type="text"
            {...register("tableName", { required: true })}
            required
          />
        </div>
        <div className="card-body">
          <table>
            <thead>
              <tr>
                <th>Field Name</th>
                <th>Type</th>
                <th>Not Null</th>

                <th>Auto Increment</th>
                <th>Index</th>
                <th>Default Value</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {fields.map((field, index) => (
                <tr key={field.id}>
                  <td>
                    <input
                      type="text"
                      {...register(`fields.${index}.fieldName`, {
                        required: true,
                      })}
                      required
                    />
                  </td>
                  <td>
                    <select
                      {...register(`fields.${index}.type`, { required: true })}
                    >
                      <option value="">Select Data Type</option>
                      {datatype.map((data) => (
                        <option
                          key={data.dataTypeId}
                          value={data.dataTypeNames}
                        >
                          {data.dataTypeNames}
                        </option>
                      ))}
                      {field.type &&
                        !datatype.find(
                          (data) => data.dataTypeNames === field.type
                        ) && <option value={field.type}>{field.type}</option>}
                    </select>
                    {errors.fields?.[index]?.type && (
                      <span className="text-danger">
                        <p>Field type is required</p>
                      </span>
                    )}
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      {...register("notNull", { required: true })}
                      defaultChecked={watch(`fields.${index}.notNull`)}
                    />
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      {...register("autoIncrement", { required: true })}
                      defaultChecked={watch(`fields.${index}.autoIncrement`)}
                    />
                  </td>
                  <td>
                    <select
                      {...register(`fields.${index}.index`, { required: true })}
                    >
                      <option value="">Select IndexType</option>
                      {indexType.map((data) => (
                        <option
                          key={data.dataTypeId}
                          value={data.indexTypeName}
                        >
                          {data.indexTypeName}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <input
                      type="text"
                      {...register(`fields.${index}.defaultValue`, {
                        required: true,
                      })}
                    />
                  </td>
                  <td>
                    <IconButton
                      aria-label="Delete field"
                      title="Delete Field"
                      onClick={() => remove(index)}
                    >
                      <DeleteIcon style={{ color: "#aa1313" }} />
                    </IconButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button
          type="button"
          onClick={() =>
            append({
              fieldName: "",
              type: "",
              notNull: false,
              autoIncrement: false,
              index: "",
              defaultValue: "",
            })
          }
        >
          + Add New Coloumn
        </button>
        <button type="button" onClick={addTimestampFields}>
          + Add Timestamps
        </button>
        <button type="submit">Create Database</button>
      </form>
    </div>
  );
};

export default AddDatabase;
