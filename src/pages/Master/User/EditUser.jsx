import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { updateUser, fetchUserData } from "../../../redux/Slices/UserSlice"; // Ensure this is the correct path to your thunk
import { formSchema } from "../../../components/jordResolver";
import { yupResolver } from "@hookform/resolvers/yup";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
const EditUser = () => {
  const { userId } = useParams();
  console.log("userId", userId);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(formSchema) });
  // const user = useSelector((state) => state.user.user.data);

  const roles = useSelector((state) => state.user.roles);

  useEffect(() => {
    if (userId) {
      dispatch(fetchUserData(userId)).then((action) => {
        if (action.payload) {
          console.log("Fetched user data", action.payload.data);
          reset(action.payload.data);
        }
      });
    }
  }, [userId, reset, dispatch]);

  const onSubmit = async (formData) => {
    try {
      const result = await dispatch(updateUser({ userId, userData: formData }));
      console.log("Update result:", result);
      if (result.meta.requestStatus === "fulfilled") {
        toast.success(result.payload.message);
        navigate("/admin/users");
      } else {
        toast.error("Failed to update user.");
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

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
      <div className="">
        <h2>Edit User</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <label htmlFor="name">First Name:</label>
            <input
              autoComplete="off"
              type="text"
              className="form-control"
              {...register("firstName", {})}
            />
            {errors.firstName && (
              <span className="text-danger">{errors.firstName.message}</span>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="name">Last Name:</label>
            <input
              type="text"
              className="form-control"
              {...register("lastName", {})}
            />
            {errors.lastName && (
              <span className="text-danger">{errors.lastName.message}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              autoComplete="off"
              type="password"
              className="form-control"
              id="password"
              {...register("password", {})}
            />

            {errors.userPassword && (
              <span className="text-danger">{errors.password.message}</span>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              autoComplete="off"
              type="email"
              className="form-control"
              {...register("email", {})}
            />
            {errors.email && (
              <span className="text-danger">{errors.email.message}</span>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="gender">Gender:</label>
            <select className="form-control" {...register("gender", {})}>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            {errors.gender && (
              <span className="text-danger">{errors.gender.message}</span>
            )}
          </div>

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
          <div className="form-group">
            <label htmlFor="roleName">Role:</label>
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
              <span className="text-danger">{errors.roleName.message}</span>
            )}
          </div>
          <button type="submit" className="btn btn-primary">
            Update User
          </button>
        </form>
      </div>
    </>
  );
};

export default EditUser;
