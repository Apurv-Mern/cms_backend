import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { createUser, fetchRoles } from "../../../../redux/Slices/UserSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import useLogout from "../../../Auth/Logout";
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
    <>
      <button
        onClick={() => navigate(-1)}
        class="btn btn-sm btn-danger  waves-effect waves-light logout"
        tabindex="0"
        type="button"
      >
        <ArrowBackIosNewIcon />
      </button>
      <div className="card mt-2">
        <h5 class="card-header mb-2">Add User</h5>
        <div className="card-body">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row">
              <div className="col-xl-4">
                <div className="form-group">
                  {/* Hidden dummy inputs to trick some browsers */}
                  <label htmlFor="name" className="form-label">
                    First Name:
                  </label>
                  <input
                    type="text"
                    style={{ display: "none" }}
                    autoComplete="username"
                  />
                  <input
                    type="password"
                    style={{ display: "none" }}
                    autoComplete="new-password"
                  />
                  <input
                    autoComplete="off"
                    type="text"
                    className="form-control form-control-md"
                    {...register("firstName", {
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
              </div>
              <div className="col-xl-4">
                <div className="form-group">
                  <label htmlFor="email">Last Name</label>
                  <input
                    autoComplete="off"
                    type="text"
                    className="form-control form-control-md"
                    {...register("lastName", {
                      required: true,
                      minLength: 3,
                      maxLength: 50,
                    })}
                  />
                  {errors.userEmail && (
                    <span className="text-danger">Last Name is required</span>
                  )}
                </div>
              </div>
              <div className="col-xl-4">
                <div className="form-group">
                  <label htmlFor="email">Email:</label>
                  <input
                    autoComplete="off"
                    type="text"
                    className="form-control"
                    id="user-email"
                    {...register("email", {
                      required: true,
                      pattern: /^\S+@\S+\.\S+$/i,
                    })}
                  />
                  {errors.userEmail && (
                    <span className="text-danger">Email is required</span>
                  )}
                </div>
              </div>
              <div className="col-xl-4">
                <div className="form-group">
                  <label htmlFor="password">Password:</label>
                  <input
                    autoComplete="new-password"
                    type="password"
                    className="form-control"
                    id="password"
                    {...register("password", {
                      required: true,
                      minLength: 6,
                      maxLength: 20,
                    })}
                  />
                  {errors.userPassword && (
                    <span className="text-danger">
                      Password is required and should be min of 6 words and max
                      of 20
                    </span>
                  )}
                </div>
              </div>
              <div className="col-xl-4">
                <div className="form-group">
                  <label htmlFor="gender">Gender:</label>
                  <select className="form-control" {...register("gender")}>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>
              </div>
              <div className="col-xl-4">
                <div className="form-group">
                  <label htmlFor="status">Status:</label>
                  <select className="form-control" {...register("status")}>
                    <option value="Active">Active</option>
                    <option value="De-active">De-active</option>
                  </select>
                </div>
              </div>
              <div className="col-xl-4">
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
              </div>
              <div className="col-xl-4">
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
              </div>
              <div className="col-12 text-end">
                <button
                  type="submit"
                  className="btn btn-dark waves-effect waves-light"
                  disabled={isCreatingUser}
                >
                  Add User
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddUser;
