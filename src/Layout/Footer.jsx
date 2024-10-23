import { useEffect, useState } from "react";
import { getTimeService } from "../Services/layout";

const Footer = () => {
  const [getDateTime , setDateTime] = useState()
  const [time , setTime] = useState()

  const handlegetTime = async ()=>{
    try {
      const { data } = await getTimeService()
      setDateTime(data)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(()=>{
    handlegetTime()
  },[])


  const [serverTime, setServerTime] = useState(null);
  const [currentTime, setCurrentTime] = useState(null);

  useEffect(() => {
    // const serverTimeString = '2024-06-02T08:06:14.455Z'; // Replace with actual server time
    const parsedServerTime = new Date(getDateTime?.datetime);
    setServerTime(parsedServerTime);
    setCurrentTime(parsedServerTime);
  }, [getDateTime]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newCurrentTime = new Date(currentTime.getTime() + 1000);
      setCurrentTime(newCurrentTime);
    }, 1000);

    return () => clearInterval(interval);
  }, [currentTime]);

  const formattedTime = () => {
    
    if (currentTime) {
      const hours = currentTime.getHours();
      const minutes = currentTime.getMinutes();
      const seconds = currentTime.getSeconds();
      // setTime(`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
  
      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
      
    }
  };

  
  useEffect(()=>{
    setTime(formattedTime())
    
  },[currentTime])



  

    return (
        <footer
        class="d-flex align-items-center justify-content-between py-2 px-4 "
        style={{"background-color" : "#303d4d"}}
      >
        <div class="d-flex gap-3 fw-semibold">
          <span>{time}</span>
          <span>|</span>
          <span>{currentTime?.toLocaleDateString()}</span>
        </div>
  
        <p class="fw-semibold m-0">Copyright © 2024 Abarpardazesh</p>
      </footer>
    );
}

export default Footer;