import React from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUsers, fetchRoles } from '../../redux/Slices/UserSlice';
import { useNavigate } from 'react-router-dom';

const DisplayUser = () => {
    const navigate = useNavigate();
    const users = useSelector(state => state.user.users);
    const dispatch = useDispatch();


    const handleClick = () => {
        navigate('/users/create');
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
        <div>
            <h4>Existing Users</h4>
            <button onClick={handleClick}>create User</button>
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
                        <th>Role</th>
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
                            <td>{user.roleName}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default DisplayUser
