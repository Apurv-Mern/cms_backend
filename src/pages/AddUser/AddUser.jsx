import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./AddUsers.module.css";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { createUser, fetchRoles } from "../../redux/Slices/UserSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import useLogout from "../Logout/Logout";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
const AddUser = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const roles = useSelector((state) => state.user.roles);
  const dispatch = useDispatch();

  const isCreatingUser = useSelector((state) => state.user.isCreatingUser);
  const logout = useLogout();

  const onSubmit = async (data) => {
    const result = await dispatch(createUser(data));
    if (result.meta.requestStatus === "fulfilled") {
      toast.success("User created successfully!");
      navigate("/admin/users");
    } else {
      toast.error("Failed to create user.");
    }
  };

  useEffect(() => {
    dispatch(fetchRoles());
  }, [dispatch]);

  return (
    <div className="container">
     <button onClick={() => navigate(-1)}>
        {" "}
        <ArrowBackIosNewIcon />
      </button>

      <button onClick={logout}>Logout</button>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card mt-5">
            <div className="card-body">
              <h2 className="card-title">Add User</h2>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                  <label htmlFor="name">Name:</label>
                  <input
                  autocomplete="off"
                    type="text"
                    className="form-control"
                    {...register("name", {
                      required: true,
                      minLength: 3,
                      maxLength: 50,
                    })}
                  />
                  {errors.name && (
                    <span className="text-danger">
                      Name is required and must be between 3 and 50 characters
                    </span>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email:</label>
                  <input
                    autocomplete="off"
                    type="email"
                    className="form-control"
                    {...register("email", {
                      required: true,
                      pattern: /^\S+@\S+\.\S+$/i,
                    })}
                  />
                  {errors.email && (
                    <span className="text-danger">Email is required</span>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="email">Password::</label>
                  <input
                  autocomplete="off"
                    type="password"
                    className="form-control"
                    {...register("password", {
                      required: true,
                      minLength: 6,
                      maxLength: 20,
                    })}
                  />
                </div>
                {errors.email && (
                  <span className="text-danger">
                    Password is required and should be min of 6 words and max of
                    20
                  </span>
                )}

                <div className="form-group">
                  <label htmlFor="gender">Gender:</label>
                  <select className="form-control" {...register("gender")}>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="status">Status:</label>
                  <select className="form-control" {...register("status")}>
                    <option value="Active">Active</option>
                    <option value="De-active">De-active</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="age">Age:</label>
                  <input
                    type="number"
                    className="form-control"
                    {...register("age", { required: true, min: 18, max: 100 })}
                  />
                  {errors.age && (
                    <span className="text-danger">
                      Age is required and must be between 18 and 100
                    </span>
                  )}
                </div>

                <div />
                <div className="form-group">
                  <label htmlFor="roleId">Role:</label>
                  <select
                    className="form-control"
                    {...register("roleName", { required: true })}
                  >
                    <option value="">Select Role</option>
                    {roles.map((role) => (
                      <option key={role.roleId} value={role.roleName}>
                        {role.roleName}
                      </option>
                    ))}
                  </select>
                </div>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={isCreatingUser}
                >
                  Add User
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddUser;
