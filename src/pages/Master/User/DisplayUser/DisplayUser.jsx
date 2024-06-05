import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchUsers,
  fetchRoles,
  deleteUser,
} from "../../../../redux/Slices/UserSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";



import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import TablePagination from "@mui/material/TablePagination";


const DisplayUser = () => {
  const [isLoad, setIsLoad] = useState(false);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(8);
  const [search, setSearch] = useState({
    firstName: "",
    lastName: "",
    email: "",
    gender: "",
    status: "",
    role: "",
  });

  const users = useSelector((state) => state.user.users);
  const roles = useSelector((state) => state.user.roles);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleClickCreate = () => {
    navigate("/users/create");
  };

  //update user
  const handleUpdateUser = (userId) => {
    navigate(`/update/user/${userId}`);
  };

  //delete user
  const handleDeleteUser = (userId) => {
    dispatch(deleteUser(userId))
      .then(() => {
        toast.success("User deleted successfully");
        setIsLoad(true);
      })
      .catch(() => {
        toast.error("Failed to delete user");
      });
  };
  const handleClearSearch = () => {
    setSearch({
      firstName: "",
      email: "",
      gender: "",
      status: "",
      role: "",
    });
    setPage(0); // Reset page to 0 when search criteria is cleared
  };
  const handleSearchChange = (e) => {
    const { name, value } = e.target;
    setSearch((prevSearch) => ({
      ...prevSearch,
      [name]: value.toLowerCase(),
    }));
    setPage(0);
  };

  const filteredUsers = users.filter((user) => {
    const firstName = user.firstName || "";
    const email = user.email || "";
    const gender = user.gender || "";
    const status = user.status || "";
    const roleName = user.roleName || "";

    return (
      firstName.toLowerCase().includes(search.firstName.toLowerCase()) &&
      email.toLowerCase().includes(search.email.toLowerCase()) &&
      (search.gender === "" ||
        gender.toLowerCase() === search.gender.toLowerCase()) &&
      (search.status === "" ||
        status.toLowerCase() === search.status.toLowerCase()) &&
      (search.role === "" ||
        roleName.toLowerCase() === search.role.toLowerCase())
    );
  });

  //pagination

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const startIndex = page * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;

  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(fetchRoles());
  }, [dispatch]);

  useEffect(() => {
    setIsLoad(false);
  }, [filteredUsers, users]);
  //filtering

  return (
    <>
      <div className="row">
        <div className="col-auto">
          <h3 class="card-header">Existing Users</h3>
        </div>
        <div className="col ms-auto text-end">
          <button className="btn btn-dark waves-effect waves-light" onClick={handleClickCreate}>
  
            Create New User
          </button>
        </div>
      </div>

      <div className="filter-box my-3">
        <div className="row g-2 align-items-center">
          <div className="col">
            <div className="form-grp">
            <label>First Name</label>
            <input
            className="form-control"
              type="text"
              name="firstName"
              value={search.firstName}
              placeholder="Search by name"
              onChange={handleSearchChange}
            />
            </div>
          </div>
          <div className="col">
          <div className="form-grp">
          <label>Email</label>

          <input
            className="form-control"

            type="text"
            name="email"
            placeholder="Search by email"
            value={search.email}
            onChange={handleSearchChange}
          />
          </div>
          </div>
         

          <div className="col">
            <div className="form-grp">
            <label>Select Gender</label>
            <select
            name="gender"
            className="form-control"

            value={search.gender}
            onChange={handleSearchChange}
          >
            <option value="">All Genders</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
            </div>
          </div>
          <div className="col">
            <div className="form-grp">
            <label>Select Status</label>
            <select
            name="status"
            className="form-control"

            value={search.status}
            onChange={handleSearchChange}
          >
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="de-active">De-Active</option>
          </select>
            </div>
          </div>
          <div className="col">
            <div className="form-grp">
            <label>Select Role</label>
            <select 
            className="form-control"
            
             name="role" value={search.role} onChange={handleSearchChange}>
            <option value="">All Roles</option>
            {roles.map((role) => (
              <option key={role.roleId} value={role.roleName}>
                {role.roleName}
              </option>
            ))}
          </select>
            </div>
          </div>


          <div className="col-auto">
        <button className="btn btn-dark waves-effect waves-light" onClick={handleClearSearch}>Clear Filters</button>
        </div>
        </div>
      </div>

      <div className="card-body">
        <table className="table">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Gender</th>
              <th>Status</th>
              <th>Age</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(filteredUsers) &&
              filteredUsers.slice(startIndex, endIndex).map((user) => (
                <tr key={user.userId}>
                  <td>{user.firstName}</td>
                  <td>{user.lastName === null ? "-" : user.lastName}</td>
                  <td>{user.email}</td>
                  <td>{user.gender === null ? "-" : user.gender}</td>
                  {/* <td>{user.gender}</td> */}

                  <td>{user.status}</td>

                  <td>{user.age === null ? "-" : user.age}</td>

                  <td>{user.roleName}</td>
                  <td>
                    <IconButton
                      aria-label="Edit user"
                      title="Edit User"
                      onClick={() => handleUpdateUser(user.userId)}
                    >
                      <EditIcon style={{ color: "#e3bd3a" }} />
                    </IconButton>

                    <IconButton
                      aria-label="Delete user"
                      title="Delete User"
                      onClick={() => handleDeleteUser(user.userId)}
                    >
                      <DeleteIcon style={{ color: "#aa1313" }} />
                    </IconButton>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>

        <TablePagination
          component="div"
          count={filteredUsers.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </div>
    </>
  );
};

export default DisplayUser;
