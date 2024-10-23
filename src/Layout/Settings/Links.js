export const settingsLink = [
  {
    title: "Monitor",
    href: "/settings/monitor",
    img: "/Assets/svg/Configuration/Monitor.svg",
  },
  {
    title: "Control",
    href: "/settings/control/power",
    img: "/Assets/svg/Configuration/Control.svg",
    host : "/control",
    subMenu : [
      {
        title: "Sensors",
        href: "/settings/control/sensors",
      },
      {
        title: "Power",
        href: "/settings/control/power",
      }
    ]
  },
  {
    title: "Settings",
    href: "/settings/configuration/outlet",
    img: "/Assets/svg/Configuration/Settings.svg",
    host : "/settings/configuration",
    subMenu : [
      {
        title: "Outlet",
        href: "/settings/configuration/outlet",
      },
      {
        title: "Sensors",
        href: "/settings/configuration/sensors",
      },
      {
        title: "Power",
        href: "/settings/configuration/power",
      },
    ]
  },
  {
    title: "System",
    href: "/settings/system/general",
    img: "/Assets/svg/Configuration/System.svg",
    host : "/system",
    subMenu : [
      {
        title: "General",
        href: "/settings/system/general",
      },
      {
        title: "Network",
        href: "/settings/system/network",
      },
      {
        title: "Maintenance",
        href: "/settings/system/maintenance",
      },
    ]
  },
  {
    title: "Users",
    href: "/settings/users/list",
    img: "/Assets/svg/Configuration/Users.svg",
    host : "/users",
    subMenu : [
      {
        title: "Add user",
        href: "/settings/users/addUser",
      },
      {
        title: "User list",
        href: "/settings/users/list",
      },
    ]
  },
  {
    title: "Tools",
    href: "/settings/tools/ping",
    img: "/Assets/svg/Configuration/Tools.svg",
    host : "/tools",
    subMenu : [
      {
        title: "Ping",
        href: "/settings/tools/ping",
      },
      {
        title: "Traceroute",
        href: "/settings/tools/Traceroute",
      },
    ]
  },
  {
    title: "Report",
    href: "/settings/report/energy",
    img: "/Assets/svg/Configuration/Report.svg",
    host : "/report",
    subMenu : [
      {
        title: "Input voltage",
        href: "/settings/report/inputVoltage",
      },
      {
        title: "Input current",
        href: "/settings/report/inputCurrent",
      },
      {
        title: "Output otlet",
        href: "/settings/report/outputOtlet",
      },
      {
        title: "Energy",
        href: "/settings/report/energy",
      },
    ]
  },
  {
    title: "Logs",
    href: "/settings/logs",
    host : "/settings/logs",
    img: "/Assets/svg/Configuration/Logs.svg",
  },
  {
    title: "Logout",
    href: "/logout",
    img: "/Assets/svg/Configuration/Logout.svg",
  },
];


