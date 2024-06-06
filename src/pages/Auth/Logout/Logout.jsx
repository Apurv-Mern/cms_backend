import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const useLogout = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('roleName');
    Cookies.remove('token');
    navigate('/');
  };

  return logout;
};

export default useLogout;
