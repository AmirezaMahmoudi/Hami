/** @format */

import { Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "../Layout/Home";
import {
  ActivePower,
  DoorSensor,
  ElectricalEnergy,
  Logout,
  OutletState,
  SmokeSensor,
  TempHumidity,
  WaterSensor,
} from "../Pages";
// import AuthLayout from './AuthLayout';

const AdminRouter = () => {
  return (
    <Routes>
      <Route path="/*" element={<MainLayout />}>
        <Route index element={<ActivePower />} />
        <Route path="outletState" element={<OutletState />} />
        <Route path="electricalEnergy" element={<ElectricalEnergy />} />
        <Route path="logout" element={<Logout />} />

        {/* Sensors */}
        <Route path="sensors/temphumidity" element={<TempHumidity />} />
        <Route path="sensors/door" element={<DoorSensor />} />
        <Route path="sensors/smoke" element={<SmokeSensor />} />
        <Route path="sensors/water" element={<WaterSensor />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Route>
    </Routes>
  );
};

export default AdminRouter;
