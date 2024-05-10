import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './User.css';
import { useEffect, useState } from 'react';



function AddUser() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [users, setUsers] = useState([]);
  const [showCreateUserForm, setShowCreateUserForm] = useState(false);


  const onSubmit = async (data) => {
    try {
      const response = await axios.post('http://localhost:4044/api/user/', data);
      console.log('User added successfully:', response.data);
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  const handleCreateUser = () => {
    setShowCreateUserForm(true); // Show the create user form
  };
  useEffect(() => {
    // Fetch users data from the backend API
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:4044/api/user');
        console.log('Users:', response.data.data);
        setUsers(response.data.data);
   
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []); // Empty dependency array ensures the effect runs only once

  return (
 

    <div className='container'>
    <button className='btn btn-primary mb-3' onClick={handleCreateUser}>Create User</button>
    <h2>Existing Users</h2>
   <table className='table'>
     <thead>
       <tr>
         <th>Name</th>
         <th>Email</th>
         <th>Gender</th>
         <th>Status</th>
         <th>Age</th>
         <th>Role ID</th>
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
           <td>{user.roleId}</td>
         </tr>
       ))}
     </tbody>
   </table>
   {showCreateUserForm ? (
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
                  <input type='number' className='form-control' {...register('age', { required: true, min: 18, max: 99 })} />
                  {errors.age && errors.age.type === "min" && <span className='text-danger'>Age must be at least 18</span>}
                  {errors.age && errors.age.type === "max" && <span className='text-danger'>Age must be at most 99</span>}
                  {errors.age && <span className='text-danger'>Age is required</span>}
                </div>
                <div className='form-group'>
                  <label htmlFor='roleId'>Role name</label>
                  <input type='number' className='form-control' {...register('roleId')} />
                </div>
                <button type='submit' className='btn btn-primary'>Add User</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    ) : (
       null
      )}
    </div>

  );
}

export default AddUser;
