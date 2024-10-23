import { motion } from "framer-motion";

import SettingIcon from "./SettingIcon";
import { lazy, useEffect } from "react";
import { checkDevice } from "../../../../Services/Settings/system";
import { Alert } from "../../../../utils/alerts";
import { useNavigate } from "react-router-dom";

// const Motion = dynamic(() => import('framer-motion'), {
//   loader: () => import('framer-motion'),
//   ssr: false, // غیرفعال کردن رندر سمت سرور
// });



const DisabledPage = ({ setDisabledPage }) => {
  const navigate = useNavigate()
  const handleCheckDevice = async () => {

    try {
      const { data } = await checkDevice();
      setDisabledPage(false)
      navigate("/logout")
    } catch (error) {
      // Alert("Error", error?.response?.data.status);
    }
  };

  useEffect(() => {
    let clear =setInterval(handleCheckDevice, 2000);
    return ()=> clearInterval(clear)
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onContextMenu={(e)=> {e.preventDefault();}}
      className="bg-slate-900/75 fixed inset-0 grid place-items-center z-40 "
    >
      <div className="flex flex-col justify-center items-center">
        <div className="flex relative">
          <SettingIcon size="100px" />
          <SettingIcon className={"relative end-10 top-14 spin-reverse"} />
        </div>

        <h2 className="text-xl flex flex-col text-[#f2f2f2]  text-center mt-5">
          <span>Updating the system</span>
          <span>Please wait ...</span>
        </h2>
      </div>
    </motion.div>
  );
};

export default DisabledPage;


