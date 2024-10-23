import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { Alert } from "../../utils/alerts";
import { logoutService } from "../../Services/auth";
import Loading from "../../Components/Loading"
const Logout = () => {
  const [loading, setLoading] = useState(true);
  const handleLogout = async () => {
    try {
      const res = await logoutService();
      setLoading(false);
    } catch (error) {
      setLoading(false);
      Alert("متاسفم...!", "متاسفانه مشکلی از سمت سرور رخ داده");
    }
  };
  useEffect(() => {
    handleLogout();
  }, []);

  return loading ? (
    <Loading/>
  ) : (
    <Navigate to="/auth/login" />
  );
};

export default Logout;
