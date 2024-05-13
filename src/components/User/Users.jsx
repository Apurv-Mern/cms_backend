import React from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Users.module.css';
import { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';



const AddUser = () => {
  const { register, handleSubmit, formState: { errors } } = React.useForm();
  const [users, setUsers] = React.useState([]);
  const [isFormVisible, setIsFormVisible] = React.useState(false);
  const [roles, setRoles] = React.useState([]);
 

 const dispatch = useDispatch();
  const handleCreateUser = () => {
    setIsFormVisible(!isFormVisible); // Toggle the form visibility
  };


  const onSubmit = async (data) => {
    try {
      const response = await axios.post('http://localhost:4044/api/user/', data);
      console.log('User added successfully:', response.data);
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:4044/api/user');
      console.log('Users:', response.data.data);
      setUsers(response.data.data);

    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };
  const fetchRoles = async () => {
    try {
      const response = await axios.get('http://localhost:4044/api/role/');
      console.log('Roles:', response.data.data);
      setRoles(response.data.data);
    } catch (error) {
      console.error('Error fetching roles:', error);
    }
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
    fetchUsers();
    fetchRoles();
  }, []); // Empty dependency array ensures the effect runs only once




  return (
    <div className='container'>
      <button className='btn btn-primary mb-3' onClick={handleCreateUser}>
        {isFormVisible ? 'Close Form' : 'Create User'}
      </button>
      {isFormVisible && (
        <div className='row justify-content-center'>
          <div className='col-md-6'>
            <div className='card mt-5'>
              <div className='card-body'>
                <h2 className='card-title'>Add User</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
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
