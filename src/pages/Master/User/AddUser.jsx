import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { createUser, fetchRoles } from "../../../redux/Slices/UserSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { formSchema } from "../../../components/jordResolver";
const AddUser = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(formSchema) });

  const roles = useSelector((state) => state.user.roles);
  const dispatch = useDispatch();

  const isCreatingUser = useSelector((state) => state.user.isCreatingUser);

  const onSubmit = async (data) => {
    const result = await dispatch(createUser(data));
    console.log("resulttt for user ", result);
    if (result.meta.requestStatus === "fulfilled") {
      toast.success(result.payload.message);
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
                    autoComplete="off"
                    type="text"
                    className="form-control form-control-md"
                    {...register("firstName")}
                  />
                  {errors.firstName && (
                    <span className="text-danger">
                      {errors.firstName.message}
                    </span>
                  )}
                </div>
              </div>
              <div className="col-xl-4">
                <div className="form-group">
                  <label htmlFor="email">Last Name</label>
                  <input
                    type="text"
                    autoComplete="off"
                    className="form-control form-control-md"
                    {...register("lastName")}
                  />
                  {errors.lastName && (
                    <span className="text-danger">
                      {" "}
                      {errors.lastName.message}
                    </span>
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
                    {...register("email", {})}
                  />
                  {errors.email && (
                    <span className="text-danger"> {errors.email.message}</span>
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
                    {...register("password", {})}
                  />
                  {errors.password && (
                    <span className="text-danger">
                      {errors.password.message}
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
                  {errors.gender && (
                    <span className="text-danger">{errors.gender.message}</span>
                  )}
                </div>
              </div>
              <div className="col-xl-4">
                <div className="form-group">
                  <label htmlFor="status">Status:</label>
                  <select className="form-control" {...register("status")}>
                    <option value="Active">Active</option>
                    <option value="De-active">De-active</option>
                  </select>
                  {errors.status && (
                    <span className="text-danger">{errors.status.message}</span>
                  )}
                </div>
              </div>
              <div className="col-xl-4">
                <div className="form-group">
                  <label htmlFor="age">Age:</label>
                  <input
                    type="number"
                    className="form-control"
                    {...register("age")}
                  />
                  {errors.age && (
                    <span className="text-danger">{errors.age.message}</span>
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
                  {errors.roleName && (
                    <span className="text-danger">
                      {errors.roleName.message}
                    </span>
                  )}
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
