import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { logoutService } from "../Services/auth";

const Timer = () => {
  const [seconds, setSeconds] = useState(600); // 10 دقیقه معادل 600 ثانیه
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await logoutService();
      navigate("/auth/login");
      localStorage.removeItem("loginToken", "");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      } else {
        // انجام کاری بعد از رسیدن به صفر
        console.log("تایمر به پایان رسید!");
        handleLogout();
        clearInterval(interval);
      }
    }, 1000); // 1 ثانیه

    return () => clearInterval(interval);
  }, [seconds]); // وابستگی به seconds

  useEffect(() => {
    setSeconds(600);
  }, [pathname]);

  const formattedTime = () => {
    const minutes = Math.floor(seconds / 60);
    const secondsRemaining = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${secondsRemaining
      .toString()
      .padStart(2, "0")}`;
  };

  return (
      <p className="text-xl">{formattedTime()}</p>
  );
};

export default Timer;
