import React, { useEffect, useRef, useState } from "react";
import Chart, { Tooltip } from "chart.js/auto";
import { callback } from "chart.js/helpers";
import "./PatientByHealthBarrier.css";

const PatientByHealthBarrier = ({ data }) => {
  const chartContainer = useRef(null);
  const chartInstance = useRef(null);
  const [pieData,setPieData] = useState([]);
  const [colors,setColors] = useState([]);
  const [labels,setLabels] = useState([]);

const randomColor = ()=>Math.floor(Math.random() * 256);

  useEffect(() => {
    setPieData([])
    setColors([])
    setLabels([])
    if (chartContainer && chartContainer.current) {
      

      for(let item in data){
        setPieData((prev)=>[...prev,data[item]]);
        setColors((prev)=>[...prev,"rgb(" + randomColor() + "," + randomColor() + "," + randomColor() + ")"])
        setLabels((prev)=>[...prev,item])
       
      }
      const ctx = chartContainer.current.getContext("2d");
      if (ctx) {
        chartInstance.current = new Chart(ctx, {
          type: "pie",
          data: {
            datasets: [
              {
                data: pieData,
                backgroundColor:colors, // Assign colors to points
                borderColor: "#fff",
                borderWidth: 1,
              },
            ],
          },
          plugins:{
            Tooltip:{
              callbacks:{
                label:(context)=>{
                  let label = context.label
                  return label
                }
              }
            }
          },
          options: {
            // Customize Chart.js options as needed
          },
        });
      }
    }

    return () => {
      // Cleanup
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [data]);

  return (
    <div className="patient-by-health-barrier">
      <h3 className="component-title">Patient By Health Barrier</h3>
      <div className="content-container">
        <div className="chart-container">
          <canvas ref={chartContainer} />
        </div>
        <div className="labels-container">
          {labels.map((label, index) => (
            <div key={index} className="label-item">
              <span
                className="point"
                style={{ backgroundColor: colors[index] }}
              ></span>
              <span className="label-text">{label}: </span>
              <span className="point-value">{data[label]}%</span>
            </div>
          ))}
        </div>
      </div>
      <div className="info-container">
        {/* Render information about each part of the pie chart here */}
      </div>
    </div>
  );
};

export default PatientByHealthBarrier;
