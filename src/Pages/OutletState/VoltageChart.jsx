import React, { useState } from 'react';
import GaugeComponent from 'react-gauge-component';
import { styled } from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

const VoltageGauge = ({ volt, socket }) => {
 
  return (
    <div className='flex flex-col bg-slate-800 rounded-2xl border-[2px]  '>
        <div className={`bg-slate-600 text-xl h-full text-center rounded-t-2xl p-3`}>
          <h1>Voltage</h1>
        </div>
       
  
      <div className='flex flex-col pb-0 p-2 pt-5 '>
        <div className="flex flex-col ">
          <div className='w-72 '>
          <GaugeComponent
              value={volt}
               type="radial"
              arc={{
                subArcs: [
                  { limit: 250 ,
                    color: 
                    `${
                        volt >= 0 && volt <= 180 ? "#D83030"  // red
                      : volt >= 181 && volt <= 190 ? "#DF9011" //orange
                      : volt >= 191 && volt <= 240 ? "#30D85A" // green
                      : volt >= 241 && volt <= 245 ? "#DF9011" 
                      : volt >= 246 && volt <= 250 ? "#D83030" : "#D83030"
                    } `
                  }],
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
                valueLabel: { formatTextValue: (val) => val + 'V' },
                tickLabels: { hideMinMax: true }
              }}
              minValue={0}
              maxValue={250}
            />  
          </div>
    
          
        </div>
      </div>
    </div>
  );
};

export default VoltageGauge;
