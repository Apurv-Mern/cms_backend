import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUsers, fetchRoles, deleteUser } from '../../redux/Slices/UserSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import EditUserModal from '../../components/EditUserModal';
import useLogout from '../Logout/Logout';
const DisplayUser = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [isLoad, setIsLoad] = useState(false);

  const users = useSelector(state => state.user.users);
  const roles = useSelector(state => state.user.roles);
  const logout=useLogout();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleClick = () => {
    navigate('/users/create');
  };
  const handleUpdateUser = (userId) => {
    setSelectedUserId(userId);
    setIsModalOpen(true);

  };
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUserId(null);
  };
  const handleDeleteUser = (userId) => {
    dispatch(deleteUser(userId))
      .then(() => {
        toast.success('User deleted successfully');
        setIsLoad(true); 
      })
      .catch(() => {
        toast.error('Failed to delete user');
      });
  };

  
  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(fetchRoles());
    setIsLoad(false);
  }, [dispatch,isLoad]);

  return (
    <div>
          <button onClick={logout}>Logout</button>
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
            <th>Role</th>
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
              <td>{user.roleName}</td>
              <td><button className='btn btn-primary mb-3' onClick={() => handleUpdateUser(user.userId)}>Edit</button></td>
              <td><button className='btn btn-primary mb-3' onClick={() => handleDeleteUser(user.userId)}>Delete</button></td>
              
            </tr>
          ))}
          {isModalOpen && (
        <EditUserModal
          isModalOpen={isModalOpen}
          closeModal={closeModal}
          userId={selectedUserId}
          roles={roles}
          setIsLoad={setIsLoad} 
        />
      )}
      
        </tbody>
      </table>
    </div>
  )
}

export default DisplayUser
