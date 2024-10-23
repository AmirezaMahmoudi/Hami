import React, { useState } from 'react';
import GaugeComponent from 'react-gauge-component';
import { styled } from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useSelector } from 'react-redux';

const VoltageGauge = ({ outlet, socket }) => {
  const [enabled, setEnabled] = useState(outlet.status === '1');

  // Access user permission from the Redux admin slice
  const permission = useSelector((state) => state.Admin.permission); // Ensure you're accessing the right path

  const toggleOutlet = () => {
    const newEnabledState = !enabled;
    setEnabled(newEnabledState);

    if (socket) {
      const message = `l${outlet.outlet}${newEnabledState ? 'on' : 'off'}`;
      socket.send(message);
      console.log(`Request sent: ${message}`);
    }
  };

  const AntSwitch = styled(Switch)(({ theme }) => ({
    width: 28,
    height: 16,
    padding: 0,
    display: 'flex',
    '&:active': {
      '& .MuiSwitch-thumb': {
        width: 15,
      },
      '& .MuiSwitch-switchBase.Mui-checked': {
        transform: 'translateX(9px)',
      },
    },
    '& .MuiSwitch-switchBase': {
      padding: 2,
      '&.Mui-checked': {
        transform: 'translateX(12px)',
        color: '#fff',
        '& + .MuiSwitch-track': {
          opacity: 1,
          backgroundColor: '#68d164',
        },
      },
    },
    '& .MuiSwitch-thumb': {
      boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
      width: 12,
      height: 12,
      borderRadius: 6,
      transition: theme.transitions.create(['width'], {
        duration: 200,
      }),
    },
    '& .MuiSwitch-track': {
      borderRadius: 16 / 2,
      opacity: 1,
      backgroundColor: '#d42f2f',
      boxSizing: 'border-box',
    },
  }));

  return (
    <div className='flex flex-col bg-slate-800 rounded-2xl w-max border-[2px]'>
      <div className='flex justify-between'>
      {permission == '1' ? ( 
        <div className={`bg-[#${enabled ? '22a553' : 'a52222'}] h-full w-1/2 rounded-tl-2xl p-3`}>
          <h1>Outlet {outlet.outlet}</h1>
        </div>
           ): (
            <div className={`bg-[#${enabled ? '22a553' : 'a52222'}] h-full w-full rounded-t-2xl p-3`}>
          <h1 className='text-center'>Outlet {outlet.outlet}</h1>
        </div>
           ) }
          {permission == '1'&& ( // Only show if permission is '1'
        <div className='flex items-center p-2 bg-slate-600 rounded-tr-2xl w-1/2'>
            <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
              <Typography>Off</Typography>
              <AntSwitch checked={enabled} onChange={toggleOutlet} />
              <Typography>On</Typography>
            </Stack>
        </div>
          )}
      </div>
      <div className='flex flex-col pb-0 p-1'>
        <div className="flex flex-col mb-2">
          <div className='w-52'>
          </div>
          <div className='w-52 '>
            <h2 className='text-xl text-center -mb-4'>Current</h2>
            <GaugeComponent
              value={outlet.current}
              type="radial"
              arc={{
                subArcs: [
                  {
                    limit: 250,
                    color: `${
                      outlet.current === 0 ? "#525252" // gray
                      : outlet.current >= 1 && outlet.current <= 22 ? "#30D85A" // green
                      : outlet.current > 22 && outlet.current <= 25 ? "#facc15" // yellow
                      : outlet.current >= 26 ? "#D83030" // red
                      : "#525252" 
                    }`
                  }
                ],
                padding: 0.02,
                width: 0.3
              }}
              pointer={{
                color: "#ffff",
                elastic: true,
                length: "0.4",
                animationDelay: 0
              }}
              labels={{
                valueLabel: { formatTextValue: (val) => val + 'A' },
                tickLabels: { hideMinMax: true }
              }}
              minValue={0}
              maxValue={250}
            />
          </div>
          <div className='bg-slate-600 rounded-lg p-2 flex flex-col gap-3'>
            <div className='flex justify-between items-center'>
              <h1>Active Power:</h1>
              <h1>{outlet.power} W</h1>
            </div>
            <div className='flex justify-between items-center'>
              <h1>Energy:</h1>
              <h1>{outlet.energy} kW/h</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoltageGauge;
