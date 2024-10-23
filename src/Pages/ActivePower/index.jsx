import { useSelector } from "react-redux";
import HalfRadicalChart from "../../Components/HalfRadicalChart";
import { useEffect, useState } from "react";
import HalfDoughnutChart from "../../Components/HalfRadicalChart";
import CardActivePower from "./CardActivePower";
import VoltageGauge from "../OutletState/Newoutlet";
import AvgGuage from "./NewCard";
import Loading from '../../Components/Loading'
import config from "../../config";

const ActivePower = () => {
  const s = useSelector((state) => state);
  console.log(s);

  // State to hold WebSocket data
  const [outlets, setOutlets] = useState([]); // Initialize as an array for outlets
  const [volt, setVolt] = useState(0); // State for storing average volt
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
        if (data.avrage) {
          setOutlets(data.avrage); 
          setLoading(false); // Data loaded, stop showing spinner

        }
      }
    });

    return () => {
      if (ws) ws.close();
    };
  }, []);

  // Log the outlets state whenever it updates
  useEffect(() => {
    console.log("Outlets data updated:", outlets);
  }, [outlets]); // This effect runs whenever outlets changes

  // Check if outlets has data before accessing properties
  const outlet = outlets.length > 0 ? outlets[0] : {}; // Assuming outlets[0] holds the necessary data

  return (
    <div className="flex flex-col md:flex-row gap-5 justify-center items-center">
    {loading ? (
        <Loading />
      ) : (
        <>
        <div className="flex flex-col">

      <h1 className='text-center text-2xl font-medium mb-8'>Active Power </h1>
      <AvgGuage
        volt={outlet.volt || 0}
        current={outlet.current || 0}
        energy={outlet.energy || 0}
        power={outlet.power || 0}
        />
        </div>
        </>
      )}
    </div>
  );
};

export default ActivePower;