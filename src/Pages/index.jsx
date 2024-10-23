import ActivePower from "./ActivePower";
import OutletState from "./OutletState";
import ElectricalEnergy from "./ElectricalEnergy";
import TempHumidity from "./Sensors/TempHumidity";
import WaterSensor from "./Sensors/Water";
import SmokeSensor from "./Sensors/Smoke";
import DoorSensor from "./Sensors/Door";

// Configuration
import Outlet from "./Settings/Configuration/Outlet";
import Power from "./Settings/Configuration/Power";
import Sensors from "./Settings/Configuration/Sensors";

// Control
import PowerControl from "./Settings/Control/Power";
import SensorsControl from "./Settings/Control/Sensors";

import Energy from "./Settings/Report/Energy";
import InputCurrent from "./Settings/Report/InputCurrent";
import InputVoltage from "./Settings/Report/InputVoltage";
import OutputOtlet from "./Settings/Report/OutputOtlet";

import General from "./Settings/System/General";
import Maintenance from "./Settings/System/Maintenance";
import Network from "./Settings/System/Network";

import Monitor from "./Settings/Monitor";
import Logs from "./Settings/Logs";
import Logout from "./Logout";

// ===> Tools
import Tools from "./Settings/Tools";
import Ping from "./Settings/Tools/Ping";
import Traceroute from "./Settings/Tools/Traceroute";

// Users
import AddUser from "./Settings/Users/AddUser";
import UserList from "./Settings/Users/UserList";

export {
  ActivePower,
  OutletState,
  ElectricalEnergy,
  TempHumidity,
  DoorSensor,
  WaterSensor,
  SmokeSensor,

  // Settings,
  // Control,
  // Report,
  // Users
  Outlet,
  Power,
  Sensors,
  PowerControl,
  SensorsControl,
  Energy,
  InputCurrent,
  InputVoltage,
  OutputOtlet,
  General,
  Maintenance,
  Network,
  AddUser,
  UserList,
  // 

  Logout,
  Logs,
  Monitor,
  Tools,
  Traceroute,
  Ping,
  // Users,
};
