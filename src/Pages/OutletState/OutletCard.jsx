import { useState } from "react";
import HalfRadicalChart from "../../Components/HalfRadicalChart";
import HalfDoughnutChart from "../../Components/HalfRadicalChart";

const OutletCard = ({ id, outlet, socket, state }) => {
  const [enabled, setEnabled] = useState(outlet.status === "1");

  const toggleOutlet = () => {
    const newEnabledState = !enabled;
    setEnabled(newEnabledState);

    // Send a message based on the outlet's current status
    if (socket) {
      if (outlet.status == "0" && newEnabledState) {
        const message = `l${outlet.outlet}on`;
        socket.send(message);
        console.log(`Request sent: ${message}`);
      } else if (outlet.status == "1" && !newEnabledState) {
        const message = `l${outlet.outlet}off`;
        socket.send(message);
        console.log(`Request sent: ${message}`);
      }
    }
  };

  return (
    <div
      style={{ boxShadow: "10px 3px 15px #00000017" }}
      className="d-flex flex-column bg-dark overflow-hidden rounded-tl-3xl"
    >
      <div className={`bg-slate-900  mb-3 d-flex justify-between items-center gap-3`}>
        <div className={`${outlet.status === "1" ? "bg-[#22a553]" : "bg-[#a52222]"} h-full p-3 w-1/2 -skew-x-12 rounded-tl-xl`}>
          <div className="fw-semibold flex gap-1">
            <span className="d-inline-block text-dark px-2 rounded-3" style={{ backgroundColor: "#e9e9e9" }}>
              {outlet.outlet}
            </span>
            <span className="d-inline-block" style={{ color: "#e9e9e9" }}>
              Outlet {outlet.outlet}
            </span>
          </div>
        </div>

        <div>
          <label className="inline-flex relative items-center mr-5 cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={enabled}
              readOnly
            />
            <div
              onClick={toggleOutlet}
              className="w-11 h-6 border-white border-2 bg-red-500 rounded-full peer peer-focus:ring-green-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"
            ></div>
            <span className="ml-2 text-sm font-medium text-white">
              {enabled ? "On" : "Off"}
            </span>
          </label>
        </div>
      </div>

      <div className="d-flex justify-around">
      <HalfDoughnutChart name="volt" value={outlet.volt} maxValue={100} unit="V" width={"10rem"} height={"5rem"} />
      <HalfDoughnutChart name="Current" value={outlet.current} maxValue={100} unit="A" width={"10rem"} height={"5rem"} />
      </div>
    </div>
  );
};

export default OutletCard;
