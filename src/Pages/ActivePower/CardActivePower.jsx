import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";

// Register necessary Chart.js components
Chart.register(ArcElement, Tooltip, Legend);

const CardActivePower = ({ name, value, maxValue, unit, width, height }) => {
  const data = {
    labels: [name], // Name of the metric (like Voltage)
    datasets: [
      {
        data: [value, maxValue - value], // Display value and remaining space
        backgroundColor:(context)=>{
          const chart =context.chart;
          const {ctx , chartArea} = chart;
          if(!chartArea){
            return null;
          }
          if(context.dataIndex === 0){
            return getGradient(chart);
          }else{
            return '#ffff'
          }
        }, // Temporary filled color and empty color
        borderWidth: 0, // No border
      },
    ],
  };
function getGradient(chart) {
  const { ctx, chartArea: {top , bottom , left , right} } = chart;
 const gradientSegment = ctx.createLinearGradient(left , 0 , right , 0)
gradientSegment.addColorStop(0 ,"green");
gradientSegment.addColorStop(0.5 ,"orange");
gradientSegment.addColorStop(1 ,"red");
 return gradientSegment;
}
  const options = {
    rotation: -90, // Start angle (from 12 o'clock)
    circumference: 180, // Only render a half-doughnut
    cutout: "70%", // Adjust thickness
    maintainAspectRatio: false, // Custom width/height without aspect ratio
    plugins: {
      legend: { display: false }, // Hide the legend
      tooltip: { enabled: false }, // Disable tooltips
      beforeDraw: (chart) => {
        const { ctx, width, height } = chart;
        ctx.restore();

        // Create a gradient based on the value
        const gradient = ctx.createLinearGradient(0, height, 0, 0);
        const ratio = value / maxValue; // Ratio of current value to max value

        // Set color stops based on the value ratio
        if (ratio <= 0.5) {
          gradient.addColorStop(0, `rgb(0, ${Math.round(255 * (ratio * 2))}, 0)`); // Green to Yellow
          gradient.addColorStop(1, `rgb(255, ${Math.round(255 * (ratio * 2))}, 0)`);
        } else {
          gradient.addColorStop(0, `rgb(${Math.round(255 * ((ratio - 0.5) * 2))}, 255, 0)`); // Yellow to Red
          gradient.addColorStop(1, `rgb(255, 0, 0)`);
        }

        // Draw the filled arc with the gradient
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(width / 2, height, width / 2, Math.PI, 0); // Half circle
        ctx.lineTo(width / 2, height); // Close the path
        ctx.fill();

        // Render the value and unit inside the center
        const fontSize = (height / 140).toFixed(2); // Dynamically adjust font size based on chart height
        ctx.font = `${fontSize}em sans-serif`;
        ctx.textBaseline = "middle";

        const text = `${value} ${unit}`;
        const textX = Math.round((width - ctx.measureText(text).width) / 2); // Center horizontally
        const textY = height / 1.4; // Adjust vertical position to be centered

        ctx.fillStyle = "#000"; // Text color (black)
        ctx.fillText(text, textX, textY); // Render the text
        ctx.save();
      },
    },
  };

  return (
    <div className="bg-slate-500  p-4 rounded-md">
      <h1 className="text-center text-2xl">{name}</h1>
      <div style={{ width: width, height: height, marginTop: "20px" }}> {/* Adjust size */}
        <Doughnut data={data} options={options} />
      <h1 className="text-center text-2xl -mt-8">{value} {unit}</h1>
      </div>
    </div>
  );
};

export default CardActivePower;
