import { useEffect, useState } from "react";
import VoltageGauge from "./Newoutlet"; 
import VoltageChart from "./VoltageChart"; 
import { Box,  } from "@mui/material"; // Using Material-UI's CircularProgress for the loading spinner
import Loading from '../../Components/Loading'
import config from "../../config";
const OutletState = () => {
  const [outlets, setOutlets] = useState([]); 
  const [volt, setVolt] = useState(0); 
  const [socket, setSocket] = useState(null);
  const [loading, setLoading] = useState(true); // Track loading state

  useEffect(() => {
    const ws = new WebSocket(config.webSocketURL);
    setSocket(ws);

    ws.addEventListener("open", () => {
      console.log("WebSocket connected");

      const intervalId = setInterval(() => {
        ws.send("getparameter");
      }, 1000); 

      return () => {
        clearInterval(intervalId);
        ws.close();
      };
    });

    ws.addEventListener("message", (event) => {
      console.log("Message from server: ", event.data);
      const data = JSON.parse(event.data);

      if (data) {
        if (data.avrage && data.avrage[0]) {
          setVolt(data.avrage[0].volt);
        }
        if (data.outlets) {
          setOutlets(data.outlets);
          setLoading(false); // Data loaded, stop showing spinner
        }
      }
    });

    return () => {
      if (ws) ws.close();
    };
  }, []);

  return (
    <Box className="justify-center items-center flex flex-col justify-items-center">
      {/* Show the loading spinner while loading is true */}
      {loading ? (
        <Loading />
      ) : (
        <>
            <h1 className='text-center text-2xl font-medium mb-1'>Outlet State</h1>

        <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 grid-rows-2 gap-y-2 gap-x-4 mb-2 justify-center items-end justify-items-end">
          <section className="col-span-2 self-start justify-self-start pl-20">
            <div className="d-flex align-items-center">
              <div className="d-flex flex-column gap-2">
                <div className="d-flex align-items-center gap-2">
                  <span className="size-[17px] d-inline-block bg-success"></span>
                  <span>Normal</span>
                </div>
                <div className="d-flex align-items-center gap-2">
                  <span className="size-[17px] d-inline-block bg-warning"></span>
                  <span>Warning</span>
                </div>
                <div className="d-flex align-items-center gap-2">
                  <span className="size-[17px] d-inline-block bg-danger"></span>
                  <span>Critical</span>
                </div>
              </div>
            </div>
          </section>
          <div className="col-span-2 sm:col-span-2 row-start-2  flex  justify-self-center self-stretch">
            <VoltageChart volt={volt} />
          </div>

          {outlets.map((outlet, index) => (
            <VoltageGauge
            key={index}
            outlet={outlet}
            socket={socket}
            volt={outlet.volt}
            className="col-span-4  flex justify-center items-center justify-items-center"
            />
          ))}
        </div>
          </>
      )}
    </Box>
  );
};

export default OutletState;
