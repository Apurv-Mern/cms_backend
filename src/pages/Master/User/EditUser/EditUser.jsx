import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { updateUser, fetchUserData } from "../../../../redux/Slices/UserSlice"; // Ensure this is the correct path to your thunk
import "./EditUser.css"; // Import the CSS file

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
  } = useForm();
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
      if (result.meta.requestStatus === "fulfilled") {
        toast.success("User updated successfully!");
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
    <button onClick={() => navigate(-1)}  class="btn btn-sm btn-danger  waves-effect waves-light logout" tabindex="0" type="button">
    <ArrowBackIosNewIcon />
    </button>
    <div className="">

      <h2>Edit User</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label htmlFor="name">First Name:</label>
          <input
            type="text"
            className="form-control"
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
        <div className="form-group">
          <label htmlFor="name">Last Name:</label>
          <input
            type="text"
            className="form-control"
            {...register("lastName", {
              required: true,
              minLength: 3,
              maxLength: 50,
            })}
          />
          {errors.name && (
            <span className="text-danger">
              Last Name is required and must be between 3 and 50 characters
            </span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
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
              Password is required and should be min of 6 words and max of 20
            </span>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            className="form-control"
            {...register("email", {
              required: true,
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email address",
              },
            })}
          />
          {errors.email && (
            <span className="text-danger">
              Email is required and must be a valid email address
            </span>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="gender">Gender:</label>
          <select
            className="form-control"
            {...register("gender", {
              required: true,
            })}
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="status">Status:</label>
          <select
            className="form-control"
        
            {...register("status")}
          >
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
