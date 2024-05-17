import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch ,useSelector} from 'react-redux';
import Modal from 'react-modal';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { updateUser,fetchUserData } from '../redux/Slices/UserSlice'; // Ensure this is the correct path to your thunk
import { useState } from 'react';
Modal.setAppElement('#root');
 const EditUserModal = ({ isModalOpen, closeModal, userId, roles,setIsLoad  }) => {
 const dispatch = useDispatch();
 const navigate = useNavigate();
 const { register, handleSubmit, formState: { errors }, reset } = useForm();
 const user = useSelector((state) => state.user.user.data);
 const [isUpdated, setIsUpdated] = useState(false);


  useEffect(() => {
    if (isModalOpen && userId) {
      dispatch(fetchUserData(userId)).then((action) => {
        if (action.payload) {
            console.log("hii",action.payload.data);
          reset(action.payload.data);
        }
      });
    }
  }, [isUpdated,isModalOpen, userId, reset, dispatch]);



  const onSubmit = async (formData) => {
    try {
      const result = await dispatch(updateUser({ userId, userData: formData }));
      if (result.meta.requestStatus === 'fulfilled') {
        toast.success('User updated successfully!');
        navigate('/admin/users');
        closeModal();
        setIsLoad(true);
        setIsUpdated(true);
      } else {
        toast.error('Failed to update user.');
      }
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  return (
    <Modal
      isOpen={isModalOpen}
      onRequestClose={closeModal}
      contentLabel="Edit User"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='form-group'>
          <label htmlFor='name'>Name:</label>
          <input type='text' className='form-control' defaultValue={user?.name} {...register('name', { required: true, minLength: 3, maxLength: 50 })} />
          {errors.name && <span className='text-danger'>Name is required and must be between 3 and 50 characters</span>}
        </div>
        <div className='form-group'>
          <label htmlFor='email'>Email:</label>
          <input type='email' className='form-control' defaultValue={user?.email} {...register('email', { required: true, pattern: /^\S+@\S+\.\S+$/i })} />
          {errors.email && <span className='text-danger'>Email is required</span>}
        </div>
        <div className='form-group'>
          <label htmlFor='gender'>Gender:</label>
          <select className='form-control' defaultValue={user?.gender} {...register('gender')}>
          console.log(user?.gender);
            <option value='Male'>Male</option>
            <option value='Female'>Female</option>
          </select>
        </div>
        <div className='form-group'>
          <label htmlFor='status'>Status:</label>
          <select className='form-control' defaultValue={user?.status} {...register('status')}>
            <option value='Active'>Active</option>
            <option value='De-active'>De-active</option>
          </select>
        </div>
        <div className='form-group'>
          <label htmlFor='age'>Age:</label>
          <input type='number' className='form-control' defaultValue={user?.age} {...register('age', { required: true, min: 18, max: 100 })} />
          {errors.age && <span className='text-danger'>Age is required and must be between 18 and 100</span>}
        </div>
        <div className='form-group'>
          <label htmlFor='roleId'>Role:</label>
          <select className='form-control' defaultValue={user?.roleName} {...register('roleName', { required: true })}>
            <option value=''>Select Role</option>
            {roles.map((role) => (
              <option key={role.roleId} value={role.roleName}>
                {role.roleName}
              </option>
            ))}
          </select>
        </div>
        <button type='submit' className='btn btn-primary'>Update User</button>
      </form>

      <button onClick={closeModal}>Close</button>
    </Modal>
  );
};

export default EditUserModal;
