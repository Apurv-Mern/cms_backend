import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const useLogout = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    Cookies.remove("user-details");
    navigate("/");
  };

  return logout;
};

export default useLogout;
