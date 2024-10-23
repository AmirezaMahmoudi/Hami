import React, { useState, useEffect } from 'react';
import GaugeComponent from 'react-gauge-component';
import { styled } from '@mui/material/styles';
import Switch, { SwitchProps } from '@mui/material/Switch';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

const AvgGuage = ({ volt, power , current , energy }) => {

 
  return (
    <div className='flex flex-col rounded-2xl w-max '>
        {/* <div>
          <h1>Average Power</h1>
        </div> */}
      <div className='flex flex-col pb-0 p-2'>
        <div className="flex flex-col md:flex-row gap-6 mb-3">
          <div className=' bg-slate-800 border-2 rounded-2xl p-3'>
            <h2 className='text-xl text-center -mb-4'>Voltage</h2>
            <div className='w-64 '>

            <GaugeComponent
              value={volt}
               type="radial"
              arc={{
                subArcs: [
                  { limit: 250 ,
                    color: 
                    `${
                      volt = 0 ? "#525252" 
                      
                        : volt >= 1 && volt <= 180 ? "#D83030" //orange
                        : volt >= 181 && volt < 195 ? "#DF9011" //orange
                      : volt >= 195 && volt <= 235 ? "#30D85A" // green
                      : volt >= 236 && volt <= 245 ? "#DF9011" 
                      : volt >= 246  ? "#D83030" 
                      : "#525252"
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
          <div className=' bg-slate-800 border-2 rounded-2xl p-3'>
            <h2 className='text-xl text-center -mb-4'>Current</h2>
            <div className='w-64 '>

            <GaugeComponent
              value={current}
              type="radial"
              arc={{
                subArcs: [
                  { limit: 30 ,
                    color: 
                    `${
                      current = 0  ? "#525252"  // gray
                      : current >= 1 && current <= 22 ? "#30D85A" //green
                      : current > 22 && current <= 25 ? "#facc15" // yellow
                      : current >= 26  ? "#D83030" // yellow
                      :  "#525252" 
                      
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
                valueLabel: { formatTextValue: (val) => val + 'A' },
                tickLabels: { hideMinMax: true }
              }}
              minValue={0}
              maxValue={30}
              /> 
              </div>
          </div>
          <div className=' bg-slate-800 border-2 rounded-2xl p-3'>
            <h2 className='text-xl text-center -mb-4'>Power</h2>
            <div className='w-64 '>

            <GaugeComponent
              value={power}
               type="radial"
               arc={{
                 subArcs: [
                  { limit: 700 ,
                    color: 
                    `${
                      power = 0  ? "#525252"  // gray
                      : power >= 1 && power <= 4000 ? "#30D85A" //green
                      : power > 4001 && power <= 5500 ? "#facc15" // yellow
                      : power >= 5501  ? "#D83030" //red
                      :  "#525252" //gray
                     
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
                valueLabel: { formatTextValue: (val) => val + 'W' },
                tickLabels: { hideMinMax: true }
              }}
              minValue={0}
              maxValue={7000}
              /> 
              </div>
          </div>
         
        </div>
      </div>
    </div>
  );
};

export default AvgGuage;