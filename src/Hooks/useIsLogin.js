import { useEffect, useState } from "react";
import { setUserInfo } from "../Redux/Admin/AdminSlice";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { getUserService } from "../Services/auth";

export const useIsLogin = ()=>{
  const { pathname } = useLocation();
    const [isLogin, setIsLogin] = useState(false);
    const [loading, setLoading] = useState(true);

    const dispatch = useDispatch()
    
    const handleCheckLogin = async ()=>{
      try {
        const {data} = await getUserService()
        
        dispatch(setUserInfo(data));
        setIsLogin(true);
        setLoading(false);
      } catch (error) {
        setIsLogin(false);
        setLoading(false);
      }
    }

    useEffect(() => {
    handleCheckLogin()
    }, [pathname]);

    return [loading, isLogin]
}