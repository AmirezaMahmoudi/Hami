
import { useEffect, useState } from "react";
import GaugeComponent from "react-gauge-component";
import Loading from '../../../Components/Loading'
import config from "../../../config";
import StatusCard from "../../../Components/StatusCard";
import Water from "../../../svg/SensorLayout/drop-water.svg"
import Fire from "../../../svg/SensorLayout/smoke.svg"
import Door from "../../../svg/SensorLayout/door.svg"
const TempHumidity = () => {
  // State to hold WebSocket data
  const [temp, setTemp] = useState({ });
  const [sensors, setSensors] = useState({ });
  const [loading, setLoading] = useState(true); // Track loading state

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
      // Assuming the data contains sensors with temperature and humidity
      if (data && data.sensors) {
        setTemp({
          temperature: data.sensors.temperature,
          humidity: data.sensors.humidity,

        });
        setSensors({
          water: data.sensors.water,
          fire: data.sensors.smoke,
          door: data.sensors.door,

        });
      setLoading(false); // Data loaded, stop showing spinner

      }
    });
    // Cleanup the WebSocket connection
    return () => socket.close();
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
      <h2 className="text-center fs-4 fw-semibold">Sensors</h2>

     
      <section className="d-flex justify-center md:-ml-80  mt-2">
        <div className="d-flex gap-5 justify-center">
          <div className="items-center flex-col md:flex-row justify-center flex gap-4">
          <section className=" self-start justify-start w-72">
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
            <div className="bg-slate-800 p-3 rounded-xl border-2">
              <h1 className="text-center text-xl">Temperature</h1>
              <GaugeComponent
                value={temp.temperature}
                type="radial"
                arc={{
                  subArcs: [
                    {
                      limit: 100,
                      color: `${
                        temp.temperature >= 0 && temp.temperature <= 15
                          ? "#0284c7" // blue
                          : temp.temperature > 15 && temp.temperature <= 30
                          ? "#30D85A" // green
                          : temp.temperature > 30 && temp.temperature <= 40
                          ? "#DF9011" // yellow
                          : "#D83030" // red
                      } `,
                    },
                  ],
                  padding: 0.02,
                  width: 0.3,
                }}
                pointer={{
                  color: "#ffff",
                  elastic: true,
                  length: "0.4",
                  animationDelay: 0,
                }}
                labels={{
                  valueLabel: { formatTextValue: (val) => val + "°C" },
                  tickLabels: { hideMinMax: true },
                }}
                minValue={0}
                maxValue={250}
              />
            </div>
            <div className="bg-slate-800 p-3 rounded-xl border-2">
              <h1 className="text-center text-xl">Humidity</h1>
              <GaugeComponent
                value={temp.humidity}
                type="radial"
                arc={{
                  subArcs: [
                    {
                      limit: 100,
                      color: `${
                        temp.humidity >= 0 && temp.humidity <= 50
                          ? "#30D85A" // green
                          : temp.humidity > 50 && temp.humidity <= 60
                          ? "#DF9011" // yellow
                          : "#D83030" // red
                      } `,
                    },
                  ],
                  padding: 0.02,
                  width: 0.3,
                }}
                pointer={{
                  color: "#ffff",
                  elastic: true,
                  length: "0.4",
                  animationDelay: 0,
                }}
                labels={{
                  valueLabel: { formatTextValue: (val) => val + "%" },
                  tickLabels: { hideMinMax: true },
                }}
                minValue={0}
                maxValue={100}
              />
            </div>
          </div>
        </div>
      </section>

      <hr className="my-3" />

      <section className=" flex flex-col gap-8 md:gap-2 md:flex-row mb-2">
      <StatusCard isNormal={sensors.fire && 0} title="Fire " status="Normal state" icon={Fire}/>
      <StatusCard isNormal={sensors.fire && 0} title="Water " status="Normal state" icon={Water} />
      <StatusCard isNormal={sensors.fire && 0} title="Door " status="Normal state" icon={Door}/>
      </section>
      </>
      )}
    </>
  );
};

export default TempHumidity;
