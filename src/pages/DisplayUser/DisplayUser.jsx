import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchUsers,
  fetchRoles,
  deleteUser,
} from "../../redux/Slices/UserSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import EditUserModal from "../../components/EditUserModal";
import useLogout from "../Logout/Logout";
import "./DisplayUser.css";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import TablePagination from '@mui/material/TablePagination';
import Button from '@mui/material/Button';

const DisplayUser = () => {
 
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [isLoad, setIsLoad] = useState(false);
  const [records, setRecords] = useState([""]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(8);
  const [search, setSearch] = useState({
    name: '',
    email: '',
    gender: '',
    status: '',
    role: '',
  });


  const users = useSelector((state) => state.user.users);
  const roles = useSelector((state) => state.user.roles);
  const logout = useLogout();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleClickCreate = () => {
    navigate("/users/create");
  };

  //update user
  const handleUpdateUser = (userId) => {
    navigate('/update/user');
    setSelectedUserId(userId);
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
  const handleSearchChange = (e) => {
    const { name, value } = e.target;
    setSearch(prevSearch => ({
      ...prevSearch,
      [name]: value.toLowerCase(),
    }));
  };
 


  const filteredUsers = users.filter(user => {
    return (
      user.name.toLowerCase().includes(search.name) &&
      user.email.toLowerCase().includes(search.email) &&
      (search.gender === '' || user.gender.toLowerCase() === search.gender) &&
      (search.status === '' || user.status.toLowerCase() === search.status) &&
      (search.role === '' || user.roleName.toLowerCase() === search.role)
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
  }, [filteredUsers,users]);
  //filtering


  return (
    <div>
      <div className="search-container">
      <Button variant="contained"onClick={handleClickCreate}> create New User</Button>
        <input
          type="text"
          name="name"
          placeholder="Search by name"
          onChange={handleSearchChange}
        />
        <input
          type="text"
          name="email" 
          placeholder="Search by email"
          onChange={handleSearchChange}
        />
        <select name="gender" onChange={handleSearchChange}>
          <option value="">All Genders</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        <select name="status" onChange={handleSearchChange}>
          <option value="">All Status</option>
          <option value="active">Active</option>
          <option value="de-Active">De-Active</option>
        </select>
        <select name="role" onChange={handleSearchChange}>
          <option value="">All Roles</option>
          {roles.map((role) => (
            <option key={role.roleId} value={role.roleName}>
              {role.roleName}
            </option>
          ))}
        </select>
     
        <Button variant="contained"onClick={logout}>Logout</Button>
      </div>
      <h5>Existing Users</h5>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Gender</th>
            <th>Status</th>
            <th>Age</th>
            <th>Role</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {
              Array.isArray(filteredUsers) &&
             
              filteredUsers.slice(startIndex, endIndex)
            .map((user) => (
              <tr key={user.userId}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.gender}</td>
                <td>{user.status}</td>
                <td>{user.age}</td>
                <td>{user.roleName}</td>
                <td>
                  <IconButton
                    aria-label="edit"
                    onClick={() => handleUpdateUser(user.userId)}
                  >
                    <EditIcon />
                  </IconButton>
                </td>
                <td>
                  <IconButton
                    aria-label="delete"
                    onClick={() => handleDeleteUser(user.userId)}
                  >
                    <DeleteIcon />
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
  );
};

export default DisplayUser;
