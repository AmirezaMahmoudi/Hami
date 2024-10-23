import React from 'react';
import OutletChart from './Chart';

const ElectricalEnergy = () => {
  const outlets = [
    { energy: 10.5 },
    { energy: 8.2 },
    { energy: 9.7 },
    { energy: 12.3 },
    { energy: 7.8 },
    // Add more outlets as needed
  ];

  return (
    <>
    <h1 className='text-center text-2xl font-medium'>Electrical Energy Consumption</h1>
    <OutletChart outlets={outlets} />
    </>
  );
};

export default ElectricalEnergy;
