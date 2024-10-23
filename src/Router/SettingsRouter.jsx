/** @format */

import { Routes, Route, Navigate } from "react-router-dom";
import {
  AddUser,
  Energy,
  General,
  InputCurrent,
  InputVoltage,
  Logout,
  Logs,
  Maintenance,
  Monitor,
  Network,
  Outlet,
  OutputOtlet,
  Ping,
  Power,
  PowerControl,
  Sensors,
  SensorsControl,
  Traceroute,
  UserList,
} from "../Pages";
import SettingsLayout from "../Layout/Settings";
import { AnimatePresence } from "framer-motion";
// import AuthLayout from './AuthLayout';

const SettingsRouter = () => {
  return (
    <AnimatePresence mode="wait">
      <Routes>
        <Route path="/*" element={<SettingsLayout />}>
          {/* Configuration */}
          <Route path="settings/configuration/outlet" element={<Outlet />} />
          <Route path="settings/configuration/power" element={<Power />} />
          <Route path="settings/configuration/sensors" element={<Sensors />} />

          <Route path="" element={<Monitor />} />

          {/* Control */}
          <Route path="settings/control/sensors" element={<SensorsControl />} />
          <Route path="settings/control/power" element={<PowerControl />} />

          {/* System */}
          <Route path="settings/system/general" element={<General />} />
          <Route path="settings/system/network" element={<Network />} />
          <Route path="settings/system/maintenance" element={<Maintenance />} />

          {/* Tools */}
          <Route path="settings/tools/ping" element={<Ping />} />
          <Route path="settings/tools/Traceroute" element={<Traceroute />} />

          {/* Report */}
          <Route
            path="settings/report/inputVoltage"
            element={<InputVoltage />}
          />
          <Route
            path="settings/report/inputCurrent"
            element={<InputCurrent />}
          />
          <Route path="settings/report/outputOtlet" element={<OutputOtlet />} />
          <Route path="settings/report/energy" element={<Energy />} />

          <Route path="settings/logs" element={<Logs />} />

          {/* Users */}
          <Route path="settings/users/addUser" element={<AddUser />} />
          <Route path="settings/users/addUser/:userId" element={<AddUser />} />
          <Route path="settings/users/list" element={<UserList />} />

          <Route path="*" element={<Navigate to="/" />} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
};

export default SettingsRouter;
