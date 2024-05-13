

import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import './Roles.module.css';

function AddRoles() {

    const [selectedRole, setSelectedRole] = useState('');
  const [roles, setRoles] = useState([]);
  const [error, setError] = useState(null);

  const fetchRoles = async () => {
    try {
      const response = await axios.get('http://localhost:4044/api/roles');
      setRoles(response.data);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  const handleRoleChange = (event) => {
    setSelectedRole(event.target.value);
  };

  const handleCreateRole = async (event) => {
    event.preventDefault();
    try {
      await axios.post('http://localhost:4044/api/roles', { roleName: selectedRole });
      setSelectedRole('');
      fetchRoles();
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <div>
    <h2>Role Management</h2>
    <form onSubmit={handleCreateRole}>
      <label>
        Role Name:
        <select value={selectedRole} onChange={handleRoleChange}>
          <option value="">Select Role</option>
          <option value="admin">Admin</option>
          <option value="common user">Common User</option>
        </select>
      </label>
      <button type="submit">Create Role</button>
    </form>
    <h3>Existing Roles</h3>
      {error && <p>Error: {error}</p>}
      <ul>
        {roles.map((role) => (
          <li key={role.roleId}>{role.roleName}</li>
        ))}
      </ul>
    </div>
  );
}

export default AddRoles;
