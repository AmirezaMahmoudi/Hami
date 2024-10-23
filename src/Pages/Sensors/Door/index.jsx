import { useEffect, useState } from "react";
import StatusCard from "../../../Components/StatusCard";
import config from "../../../config";

const DoorSensor = () => {
  const [temp, setTemp] = useState({  });

    useEffect(() => {
      const socket = new WebSocket(config.webSocketURL);
      // Connection opened
      socket.addEventListener("open", () => {
        console.log("WebSocket connected");
        // Send a request every 1 second
        const intervalId = setInterval(() => {
          socket.send("getparameter");
        }, 1000); // 1-second interval
        return () => clearInterval(intervalId);
      });
      // Listen for messages
      socket.addEventListener("message", (event) => {
        console.log("Message from server ", event.data);
        const data = JSON.parse(event.data); // Parse the incoming JSON string
        if (data && data.sensors) {
          setTemp({
            door: data.sensors.fire,
          });
        }
      });
      // Cleanup the WebSocket connection
      return () => socket.close();
    }, []);
  
    const { door } = temp; // Destructure 'water' from state
  

  return (
    <section className="">
      <div className="d-flex flex-column gap-2">
        <div className="d-flex align-items-center gap-2">
          <span className="size-[17px] d-inline-block bg-success"></span>
          <span>Normal</span>
        </div>
        <div className="d-flex align-items-center gap-2">
          <span className="size-[17px] d-inline-block bg-danger"></span>
          <span>Critical</span>
        </div>
      </div>

      <div className="flex-grow-1 text-center gap-2 d-flex justify-content-center align-items-center mt-5">
        <img
          className="size-[27px]"
          src="/Assets/svg/SensorLayout/door.svg"
          alt=""
        />
        <h3 className="text-3xl font-semibold m-0">
          The value of sensors separately
        </h3>
      </div>

      <div className="container text-center mt-4">
        <div className="row align-items-stretch w-full">
        {
             door === 0 ? (
                <StatusCard isNormal={true} title="Door" status="Normal state"/>

              ):(
                <StatusCard isNormal={false} title="Door" status="door was opened In alert status"/>

              )
            }
          {/* <StatusCard title="Door detector" />
          <StatusCard title="Door detector" isNormal={false} /> */}
        </div>
      </div>
    </section>
  );
};

export default DoorSensor;
