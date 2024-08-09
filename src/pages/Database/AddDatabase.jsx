import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import {
  createDatabase,
  fetchDataType,
  fetchIndexType,
} from "../../redux/Slices/DatabaseSlice";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
const AddDatabase = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const datatype = useSelector((state) => state.database.dataType);
  console.log("datatype", datatype);
  const indexType = useSelector((state) => state.database.indexType);
  console.log("indexType", indexType);

  const {
    control,
    handleSubmit,
    register,
    reset,

    formState: { errors },
  } = useForm({
    defaultValues: {
      tableName: "",
      fields: [
        {
          fieldName: "",
          type: "",
          notNull: "false",
          autoIncrement: "false",
          unsigned: "false",
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
      type: "DATETIME",
      notNull: false,
      autoIncrement: false,
      index: "",
      defaultValue: "",
    });
    append({
      fieldName: "updatedAt",
      type: "DATETIME",
      notNull: false,
      autoIncrement: false,
      index: "",
      defaultValue: "",
    });
  };
  const addSoftDeleteFields = () => {
    append({
      fieldName: "deletedAt",
      type: "DATETIME",
      notNull: false,
      autoIncrement: false,
      index: "",
      defaultValue: "",
    });
  };

  const onSubmit = (data) => {
    // Convert length to integer
    data.fields.forEach((field) => {
      if (field.length) {
        field.length = parseInt(field.length, 10); // Convert length to integer
      }
    });
    dispatch(createDatabase(data));
    reset();
    navigate("/database");
  };

  useEffect(() => {
    dispatch(fetchDataType());
    dispatch(fetchIndexType());
  }, [dispatch]);

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
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label>Table Name:</label>
            <input type="text" {...register("tableName", { required: true })} />
            {errors.tableName && (
              <span className="text-danger">
                <p>Table name is required</p>
              </span>
            )}
          </div>
          <div className="card-body">
            <table>
              <thead>
                <tr>
                  <th>Field Name</th>

                  <th>Type</th>
                  <th>Length</th>
                  <th>Not Null</th>
                  <th>Unsigned</th>
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
                        {...register(`fields.${index}.type`, {
                          required: true,
                        })}
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
                        type="integer"
                        {...register(`fields.${index}.length`, {
                          valueAsNumber: true, // Automatically convert input value to number
                        })}
                      />
                    </td>
                    <td>
                      <Controller
                        name={`fields.${index}.notNull`}
                        control={control}
                        render={({ field }) => (
                          <input
                            type="checkbox"
                            onChange={(e) => field.onChange(e.target.checked)}
                          />
                        )}
                      />
                    </td>
                    <td>
                      <Controller
                        name={`fields.${index}.unsigned`}
                        control={control}
                        render={({ field }) => (
                          <input
                            type="checkbox"
                            onChange={(e) => field.onChange(e.target.checked)}
                          />
                        )}
                      />
                    </td>
                    <td>
                      <Controller
                        name={`fields.${index}.autoIncrement`}
                        control={control}
                        render={({ field }) => (
                          <input
                            type="checkbox"
                            onChange={(e) => field.onChange(e.target.checked)}
                          />
                        )}
                      />
                    </td>
                    <td>
                      <select {...register(`fields.${index}.index`)}>
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
                        {...register(`fields.${index}.defaultValue`, {})}
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
          <button type="button" onClick={addSoftDeleteFields}>
            + Add Paranoid
          </button>
          <button type="submit">Create Table</button>
        </form>
      </div>
    </>
  );
};

export default AddDatabase;
