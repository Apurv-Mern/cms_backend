import React from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Users.module.css';
import { useEffect } from 'react';
import {useForm} from 'react-hook-form';
import {baseUrl} from '../../api/baseurl';

import { useSelector, useDispatch } from 'react-redux';
import {  createUser,fetchUsers,fetchRoles } from '../../redux/Slices/UserSlice';
import { toggleFormVisibility } from '../../redux/Slices/UserSlice';
 const AddUser = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const users = useSelector(state => state.user.users);
  const isFormVisible = useSelector(state => state.user.isFormVisible);
  const roles = useSelector(state => state.user.roles);
  const dispatch = useDispatch();
 ;
  const handleToggleFormVisibility = () => {
    dispatch(toggleFormVisibility()); // Dispatch the action to toggle form visibility
  };
  const handleCreateUser = () => {
    dispatch(createUser()); // Dispatch the action to create a new user
  };

  const handleUpdateUser = async (userId) => {
    // const response=await axios.put(`http://localhost:4044/api/user/${userId}`);
    // console.log('User updated successfully:', response.data);
  }
  const handleDeleteUser = async (userId) => {
    try {
      // Send a DELETE request to delete the user
      const response = await axios.delete(`http://localhost:4044/api/user/${userId}`);

      console.log('User deleted successfully:', response.data);

      // fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  }
  useEffect(() => {
    dispatch(fetchUsers()); // Fetch users when component mounts
    dispatch(fetchRoles());
  }, [dispatch]);

  return (
    <div className='container'>
      <button className='btn btn-primary mb-3' onClick={handleToggleFormVisibility}>
        {isFormVisible ? 'Close Form' : 'Create User'}
      </button>
      {isFormVisible && (
        <div className='row justify-content-center'>
          <div className='col-md-6'>
            <div className='card mt-5'>
              <div className='card-body'>
                <h2 className='card-title'>Add User</h2>
                <form onSubmit={(e) => { e.preventDefault(); handleCreateUser(); }}>
                  <div className='form-group'>
                    <label htmlFor='name'>Name:</label>
                    <input type='text' className='form-control' {...register('name', { required: true, minLength: 3, maxLength: 50 })} />
                    {errors.name && <span className='text-danger'>Name is required and must be between 3 and 50 characters</span>}
                  </div>
                  <div className='form-group'>
                    <label htmlFor='email'>Email:</label>
                    <input type='email' className='form-control' {...register('email', { required: true, pattern: /^\S+@\S+\.\S+$/i })} />
                    {errors.email && <span className='text-danger'>Email is required</span>}
                  </div>
                  <div className='form-group'>
                    <label htmlFor='gender'>Gender:</label>
                    <select className='form-control' {...register('gender')}>
                      <option value='Male'>Male</option>
                      <option value='Female'>Female</option>
                    </select>
                  </div>
                  <div className='form-group'>
                    <label htmlFor='status'>Status:</label>
                    <select className='form-control' {...register('status')}>
                      <option value='Active'>Active</option>
                      <option value='De-active'>De-active</option>
                    </select>
                  </div>

                  <div className='form-group'>
                    <label htmlFor='age'>Age:</label>
                    <input type='number' className='form-control' {...register('age', { required: true, min: 18, max: 100 })} />
                    {errors.age && <span className='text-danger'>Age is required and must be between 18 and 100</span>}
                  </div>

                  <div />
                  <div className='form-group'>
                    <label htmlFor='roleId'>Role:</label>
                    <select className='form-control' {...register('roleId', { required: true })}>
                      <option value=''>Select Role</option>
                      {roles.map((role) => (
                        <option key={role.roleId} value={role.roleId}>
                          {role.roleName}
                        </option>
                      ))}
                    </select>
                  </div>
                  <button type='submit' className='btn btn-primary'>Add User</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
      <h4>Existing Users</h4>
      <table className='table'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Gender</th>
            <th>Status</th>
            <th>Age</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(users) && users.map((user) => (
            <tr key={user.userId}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.gender}</td>
              <td>{user.status}</td>
              <td>{user.age}</td>
              <td><button className='btn btn-primary mb-3' onClick={() => handleUpdateUser(user.userId)}>Edit</button></td>
              <td><button className='btn btn-primary mb-3' onClick={() => handleDeleteUser(user.userId)}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

}

export default AddUser;
