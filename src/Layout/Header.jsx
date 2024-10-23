import { Link, useLocation } from "react-router-dom";
import Timer from "../Components/Timer";
import { useEffect, useState } from "react";
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Badge, Button, IconButton, styled } from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
import alarmSound from '../audio/alarm.mp3'; // Replace with your sound file path
import { useSelector } from "react-redux";
import config from "../config";
import Swal from 'sweetalert2';

const Header = () => {
  const { pathname } = useLocation();
  const [outlets, setOutlets] = useState({});
  const [animate, setAnimate] = useState(false);
  const [alarmAudio] = useState(new Audio(alarmSound)); // Initialize the alarm sound
  const permission = useSelector((state) => state.Admin.permission); // Ensure you're accessing the right path

  const handleLogout = async () => {
    const result = await Swal.fire({
       title: 'Logout',
      text: 'You about to logout are you sure?',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#b91c1c',
      confirmButtonText: 'Confirm',
      cancelButtonText: 'Cancel'
    });

    if (result.isConfirmed) {
      window.location.href = '/logout'; 
    }
  };

  useEffect(() => {
    const socket = new WebSocket(config.webSocketURL);

    socket.addEventListener("open", () => {
      console.log("WebSocket connected");
    });

    socket.addEventListener("message", (event) => {
      console.log("Message from server", event.data);
      const data = JSON.parse(event.data);

      if (data && typeof data === 'object') {
        setOutlets(data);

        if (data.alarm) {
          setAnimate(true); // Trigger animation
        }
      }
    });

    return () => socket.close();
  }, []);

  useEffect(() => {
    if (animate) {
      alarmAudio.loop = true; // Loop the alarm sound
      alarmAudio.play().catch(error => {
        console.log("Audio playback failed:", error);
        alert("Audio playback blocked by the browser. Please interact with the page to enable sound.");
      });
    } else {
      alarmAudio.loop = false;
      alarmAudio.pause();
      alarmAudio.currentTime = 0;
    }
  }, [animate, alarmAudio]);

  const StyledBadge = styled(Badge)(({ theme, animate }) => ({
    '& .MuiBadge-badge': {
      width: '15px',
      height: '15px',
      borderRadius: '50%',
      backgroundColor: 'red',
      color: 'black',
      position: 'relative',
      transform: 'translateX(-5px)',
      display: animate ? 'inline-flex' : 'none',
      animation: animate ? 'ping 5s infinite ease-in-out' : 'none',
      boxShadow: animate
        ? `0 0 0 0 rgba(255, 0, 0, 0.75)`
        : 'none',
      '@keyframes ping': {
        '0%': {
          transform: 'scale(1) translateX(-5px)',
          boxShadow: `0 0 0 0 rgba(255, 0, 0, 0.75)`,
        },
        '70%': {
          transform: 'scale(1.1) translateX(-5px)',
          boxShadow: `0 0 0 10px rgba(255, 0, 0, 0)`,
        },
        '100%': {
          transform: 'scale(1) translateX(-5px)',
          boxShadow: `0 0 0 0 rgba(255, 0, 0, 0)`,
        },
      },
    },
  }));

  const handleNotificationClick = () => {
    setAnimate(false); // Stop the animation and the alarm
  };

  return (
    <header style={{ backgroundColor: "#273241" }} className="d-flex align-items-center justify-content-between px-4 py-2">
      <div className="d-flex gap-2 align-items-center">
        <h1 style={{ fontSize: "20px" }} className="fw-normal mb-0">Hami N-PDU system</h1>
      </div>
      {!pathname.includes("/settings") ? (
        <div className="d-flex gap-2 align-items-center">
          <IconButton aria-label="notifications" onClick={handleNotificationClick}>
            <StyledBadge variant="dot" badgeContent={4} color="secondary" animate={animate}>
              <NotificationsIcon fontSize="large" sx={{ color: "white" }} />
            </StyledBadge>
          </IconButton>
          {permission == '1' && ( 
            <Link to="settings/control/sensors" style={{ all: "unset" }}>
              <Button variant="contained" endIcon={<SettingsIcon />} sx={{ borderRadius: "10px" , textTransform:"capitalize" , letterSpacing:'1px' }}>
                Configuration
              </Button>
            </Link>
          )}
          <Button
            variant="contained"
            color="error"
            endIcon={<LogoutIcon />}
            sx={{ borderRadius: "10px" , textTransform:"capitalize" , letterSpacing:'1px' }}
            onClick={handleLogout}
          >
            Logout
          </Button>
        </div>
      ) : (
        <Timer />
      )}
    </header>
  );
};

export default Header;
