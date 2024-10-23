import ErrorIcon from '@mui/icons-material/Error';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useState } from 'react';
const StatusCard = ({
    isNormal ,
    status ,
    title,
    icon
}) => {

  return (
    <div className="//col !w-[300px] mx-auto">
      <div className='mb-3 flex items-center justify-center gap-2'>
        <img src={icon} alt="icon" width="24px" height="24px" />
        <h1 className='text-center font-medium text-2xl'>{title} Sensor</h1>
      </div>
      <div
        style={{ "box-shadow": "10px 3px 15px #00000017" }}
        className="d-flex flex-grow-1 d-flex flex-column bg-dark rounded-3 overflow-hidden ">
        <div className={`  ${isNormal ?  "bg-success" : "bg-danger"} w-100 p-3 d-flex justify-between align-items-center gap-3`}>
         
          <span className="fw-semibold">Status</span>
         {isNormal  ? <CheckCircleIcon/> : <ErrorIcon/>}
        </div>

        <p className=" d-flex fw-semibold fs-5 justify-center flex-column gap-3 p-4 items-center">
        {isNormal  ? "Normal State" :  `${title} was detected`}
        </p>
      </div>
    </div>
  );
};

export default StatusCard;
